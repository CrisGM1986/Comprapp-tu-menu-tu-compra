/* Additive, field-aware catalog updates. Existing user records are authoritative. */
const CATALOG_FIELDS=['name','group','minutes','emoji','servings','ingredients','steps','capture','photo','seasonalPhotos','source','roles','special','accompaniments','occasions','specialOnly','meals','mainFoods','dayPreference','airFryerUse','menuRulesVersion'];
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function catalogRecipe(r){return {...occasionDefaults(structuredClone(r)),roles:r.roles||['first','second'],special:r.special||'',accompaniments:r.accompaniments||[r.group==='Verdura'?'extra-bread':'extra-salad']}}
function officialCatalog(){const fallback=typeof BASE_CATALOG_COMPLETE!=='undefined'&&BASE_CATALOG_COMPLETE?[]:extras().map(occasionDefaults);const records=[...new Map([...fallback,...SEED.map(catalogRecipe)].map(r=>[r.id,r])).values()];const ready=normalizeMenuRules({recipes:records}).recipes;applyDefaultDessertIllustrations(ready);return ready}
function catalogRevision(records){const text=JSON.stringify(records);let hash=2166136261;for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);return 'catalog-1-'+(hash>>>0).toString(16)}
function mergeCatalog(input,incoming=officialCatalog()){
 const s=structuredClone(input),officialIds=new Set(incoming.map(r=>r.id));
 if(officialIds.size!==incoming.length||incoming.some(r=>typeof r.id!=='string'||!/^[-\w]+$/.test(r.id)))throw Error('Cada receta oficial debe tener un identificador único y estable.');
 const hadMetadata=!!s.catalog,legacy=[...LEGACY_CATALOG.map(catalogRecipe),...extras()];
 const previous=s.catalog?.baseline||Object.fromEntries(legacy.map(r=>[r.id,r]));
 const removed=new Set(s.catalog?.deleted||[]);
 // Original installs always included these records: absence means deliberate deletion.
 if(!hadMetadata)for(const r of legacy)if(!s.recipes.some(x=>x.id===r.id))removed.add(r.id);
 const baseline={...previous},changes={added:0,updated:0};
 for(const official of incoming){
   const saved=s.recipes.find(r=>r.id===official.id);
   if(removed.has(official.id)){baseline[official.id]=structuredClone(official);continue}
   if(!saved){s.recipes.push({...structuredClone(official),origin:'official',editedFields:[]});changes.added++}
   else if(saved.origin!=='personal'){
     const previousRecipe=previous[official.id];const old=previousRecipe?normalizeMenuRules({recipes:[structuredClone(previousRecipe)]}).recipes[0]:undefined;let changed=false;
     for(const key of CATALOG_FIELDS){
       // With no known baseline, preserve populated fields conservatively.
       if(saved[key]===undefined||(old&&same(saved[key],old[key]))){if(!same(saved[key],official[key]))changed=true;saved[key]=structuredClone(official[key])}
     }
     saved.origin='official';saved.editedFields=CATALOG_FIELDS.filter(k=>!same(saved[k],official[k]));if(changed)changes.updated++;
   }
   baseline[official.id]=structuredClone(official);
 }
 for(const r of s.recipes)if(!r.origin)r.origin=officialIds.has(r.id)?'official':'personal';
 // Do not recreate links to deliberately deleted side recipes.
 for(const r of s.recipes)r.accompaniments=(r.accompaniments||[]).filter(id=>s.recipes.some(x=>x.id===id&&x.roles.includes('accompaniment')));
 for(const r of s.recipes)r.photo=currentPhotoPath(r.photo);
 const revision=catalogRevision(incoming),history=s.catalog?.migrations||[];
 s.catalog={schema:1,revision,baseline,deleted:[...removed],migrations:history.includes(revision)?history:[...history,revision]};
 return {state:normalizeMenuRules(normalizePreferences(s)),changes};
}
async function writeVerified(next,previous){
 return new Promise((resolve,reject)=>{
  const tx=db.transaction('data','readwrite'),store=tx.objectStore('data');
  try{
   if(previous)store.put({savedAt:new Date().toISOString(),state:previous},'preMigration');
   store.put(next,'state');const read=store.get('state');
   read.onsuccess=()=>{if(!same(read.result,next))tx.abort()};
  }catch(error){tx.abort();reject(error);return}
  tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||Error('No se pudo guardar la actualización.'));tx.onabort=()=>reject(tx.error||Error('La actualización se ha cancelado; tus datos anteriores se conservan.'));
 });
}
function readRecovery(){return new Promise((resolve,reject)=>{const r=db.transaction('data').objectStore('data').get('preMigration');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function catalogSettings(){return `<h2>Catálogo para publicar</h2><p>Prepara recetas y fotos para distribuirlas. Puedes editar en grupo y aplicar una selección a tu recetario. La exportación incluye solo el catálogo.</p><button id="edit-base-catalog">Gestionar catálogo para publicar</button><h2>Actualizaciones del recetario</h2><p>Las recetas oficiales nuevas se incorporan automáticamente. Se conservan tus cambios, tus recetas personales y las eliminaciones.</p><p class="muted">${state.recipes.filter(r=>r.origin==='official').length} oficiales · ${state.recipes.filter(r=>r.origin==='personal').length} personales</p><button id="export-recovery" type="button">Descargar copia anterior a la actualización</button>`}
function bindCatalog(){const button=document.querySelector('#export-recovery');if(button)button.onclick=async()=>{try{const backup=await readRecovery();if(!backup){toast('Todavía no hay una actualización anterior que recuperar.');return}download('Comprapp-antes-de-actualizar.json',JSON.stringify(backup.state,null,2))}catch(e){toast('No se pudo leer la copia de recuperación.')}}}
function validPhoto(value){if(typeof value!=='string')return false;if(value===''||/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(value))return true;if(!value.startsWith('assets/')||! /\.(jpg|jpeg|png|webp)$/i.test(value))return false;return value.split('/').every(part=>part&&part!=='.'&&part!=='..'&&/^[\p{L}\p{M}\p{N}_ .-]+$/u.test(part))}
function validateCatalogMetadata(s){if(s.catalog===undefined)return;if(!s.catalog||s.catalog.schema!==1||typeof s.catalog.revision!=='string'||!Array.isArray(s.catalog.deleted)||s.catalog.deleted.some(id=>typeof id!=='string'||!/^[-\w]+$/.test(id))||!Array.isArray(s.catalog.migrations)||s.catalog.migrations.some(x=>typeof x!=='string')||!s.catalog.baseline||typeof s.catalog.baseline!=='object'||Array.isArray(s.catalog.baseline))throw Error('Metadatos del catálogo inválidos.');for(const r of Object.values(s.catalog.baseline))if(!r||typeof r.id!=='string'||!validPhoto(r.photo))throw Error('Referencia del catálogo inválida.')}
