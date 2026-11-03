function personalRecipeRecords(s=state){return s.recipes.filter(r=>r.origin==='personal'||r.id.startsWith('user-'))}
function personalRecipePackage(s=state){
 const personal=personalRecipeRecords(s),ids=new Set(personal.map(r=>r.id));
 for(const id of ids){const recipe=s.recipes.find(r=>r.id===id);for(const ref of [...(recipe?.accompaniments||[]),...(recipe?.sauces||[])])if(s.recipes.some(r=>r.id===ref))ids.add(ref)}
 return {format:'comprapp-personal-recipes',version:1,exportedAt:new Date().toISOString(),personalIds:personal.map(r=>r.id),recipes:s.recipes.filter(r=>ids.has(r.id)).map(cleanBase)};
}
function exportPersonalRecipes(){
 if(!personalRecipeRecords().length){toast('No hay recetas añadidas manualmente para exportar.');return}
 download('Comprapp-mis-recetas-'+dateISO(new Date())+'.json',JSON.stringify(personalRecipePackage(),null,2));
}
function validatePersonalRecipePackage(data){
 if(!data||data.format!=='comprapp-personal-recipes'||data.version!==1||!Array.isArray(data.personalIds)||!data.personalIds.length||data.personalIds.length>1000||new Set(data.personalIds).size!==data.personalIds.length||data.personalIds.some(id=>typeof id!=='string'||!/^[-\w]+$/.test(id)))throw Error('No es una exportación de tus recetas de Comprapp.');
 const recipes=validateBase(data.recipes);if(data.personalIds.some(id=>!recipes.some(r=>r.id===id)))throw Error('Faltan recetas en el archivo.');
 return {recipes,personalIds:data.personalIds};
}
function addPersonalRecipes(s,data){
 const ids=new Map(),add=[],personal=new Set(data.personalIds);let count=0;
 for(const recipe of data.recipes){const existing=s.recipes.find(r=>r.id===recipe.id);
  if(existing&&((!personal.has(recipe.id)&&recipe.roles.every(role=>existing.roles.includes(role)))||same(cleanBase(existing),cleanBase(recipe)))){ids.set(recipe.id,existing.id);continue}
  const id=existing?'user-import-'+crypto.randomUUID():recipe.id;ids.set(recipe.id,id);add.push({recipe,id});if(personal.has(recipe.id))count++;
 }
 if(s.recipes.length+add.length>1000)throw Error('El recetario no puede superar 1000 recetas.');
 for(const {recipe,id}of add)s.recipes.push({...structuredClone(recipe),id,origin:'personal',preference:'dislike',accompaniments:(recipe.accompaniments||[]).map(ref=>ids.get(ref)||ref),sauces:(recipe.sauces||[]).map(ref=>ids.get(ref)||ref)});
 cleanSauceReferences(s);validateMenuRules(s);return count;
}
function localDataSettings(){return `<section><h2>Tus recetas</h2><p>Guarda las recetas añadidas manualmente para recuperarlas después, sin restaurar tus preferencias. Incluye ingredientes, elaboración, autoría, fotos propias guardadas en la ficha y sus salsas o acompañamientos vinculados.</p><div class="actions"><button type="button" id="export-personal-recipes" ${personalRecipeRecords().length?'':'disabled'}>Exportar mis recetas (${personalRecipeRecords().length})</button><label class="button">Importar mis recetas<input id="import-personal-recipes" type="file" accept="application/json,.json" hidden></label></div></section><section><h2>Restablecer</h2><p>Vuelve al catálogo y los ajustes iniciales. Se borrarán todas las preferencias individuales y las recetas añadidas manualmente, además del menú, la despensa, la compra, tus cambios en recetas y el borrador del catálogo.</p><button type="button" class="danger" id="reset-preferences">Restablecer mis preferencias</button></section>`}
function replaceLocalData(next,draft){return new Promise((resolve,reject)=>{
 const tx=db.transaction('data','readwrite'),store=tx.objectStore('data');
 try{store.clear();store.put(next,'state');store.put(draft,'baseCatalogDraft');const check=store.get('state');check.onsuccess=()=>{if(!same(check.result,next))tx.abort()}}catch(error){tx.abort();reject(error);return}
 tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||Error('No se pudieron restablecer los datos.'));tx.onabort=()=>reject(tx.error||Error('El restablecimiento se canceló. Se conservan los datos anteriores.'));
})}
function resetLocalPreferences(){
 const pending=Promise.all([saving.catch(()=>{}),baseSaving.catch(()=>{})]);
 const job=pending.then(async()=>{const next=mergeCatalog(upgradePeriod(migrate(initial()))).state;upgradeDessertSchedule(next);const draft=freshBase();await replaceLocalData(next,draft);
  state=next;baseDraft=draft;search='';filter='';occasionFilter='';preferenceFilter='';airFryerFilter='';vegetarianFilter='';recipeAuthorFilter='';recipeFiltersOpen=false;quickRecipeFilter='';selectedDay='';managerSelected.clear();managerScope='personal';managerPage=0;managerQuery='';managerGroup='';managerMeal='';managerDays='';managerAirFryer='';
 });
 saving=job;baseSaving=job.catch(()=>{});return job;
}
function showResetPreferences(){
 const dialog=$('#dialog');dialog.innerHTML=`<button class="close" data-close aria-label="Cerrar">✕</button><h2>Restablecer mis preferencias</h2><p>Se borrarán de este navegador <strong>todas las preferencias individuales y las recetas añadidas manualmente</strong>, además de tus cambios en recetas, menú, despensa, compra, borrador del catálogo y copias locales de recuperación.</p><p>Comprapp volverá al catálogo y los ajustes iniciales. Guarda antes tus recetas o una copia completa si quieres recuperarlas.</p><div class="actions"><button type="button" id="reset-export-recipes" ${personalRecipeRecords().length?'':'disabled'}>Exportar mis recetas</button><button type="button" id="reset-export-all">Descargar copia completa</button></div><p id="reset-data-error" role="alert" class="danger"></p><div class="actions"><button type="button" data-close>Cancelar</button><button type="button" class="danger" id="confirm-reset-preferences">Restablecer y borrar datos</button></div>`;
 dialog.showModal();bindDialog();$('#reset-export-recipes').onclick=exportPersonalRecipes;$('#reset-export-all').onclick=()=>download('Comprapp-copia-'+dateISO(new Date())+'.json',JSON.stringify(state,null,2));
 let busy=false;dialog.oncancel=e=>{if(busy)e.preventDefault()};$('#confirm-reset-preferences').onclick=async()=>{
  if(busy)return;busy=true;dialog.querySelectorAll('button').forEach(b=>b.disabled=true);
  try{await resetLocalPreferences();dialog.oncancel=null;dialog.close();navigate('settings');toast('Datos restablecidos. Puedes importar tus recetas cuando quieras.')}catch(error){$('#reset-data-error').textContent=error.message;dialog.querySelectorAll('button').forEach(b=>b.disabled=false)}finally{busy=false}
 };
}
function bindLocalDataSettings(){
 const reset=$('#reset-preferences');if(reset)reset.onclick=showResetPreferences;
 const exp=$('#export-personal-recipes');if(exp)exp.onclick=exportPersonalRecipes;
 const input=$('#import-personal-recipes');if(input)input.onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>100*1024*1024)throw Error('El archivo supera 100 MB.');const data=validatePersonalRecipePackage(JSON.parse(await file.text()));let count=0;await commit(s=>{count=addPersonalRecipes(s,data)},'Recetas importadas. Marca sus corazones para incluirlas en los menús.');if(!count)toast('Esas recetas ya estaban en tu recetario.')}catch(error){toast('No se pudo importar: '+error.message)}finally{input.value=''}};
}
