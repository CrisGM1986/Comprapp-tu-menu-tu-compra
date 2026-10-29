const LEGACY_PHOTO_PATHS={'assets/FOTOS/albondigas-meruluza-patatas-taco.jpeg':'assets/FOTOS/albondigas-merluza-patatas-taco.jpeg'};
function currentPhotoPath(path){return LEGACY_PHOTO_PATHS[path]||path}
function repairBasePhotoPaths(draft){
 const current=Object.fromEntries(officialCatalog().map(r=>[r.id,r.photo||'']));let changed=0;
 for(const r of draft.recipes){const old=r.photo,path=currentPhotoPath(old);if(path!==old){r.photo=path;changed++}else if(draft.publishedPhotos&&draft.publishedPhotos[r.id]===old&&!(old===''&&r.seasonalPhotos&&Object.keys(r.seasonalPhotos).length===0)&&current[r.id]&&current[r.id]!==old){r.photo=current[r.id];changed++}}
 for(const [old,path]of Object.entries(LEGACY_PHOTO_PATHS))if(draft.assets?.[old]&&!draft.assets[path]){draft.assets[path]=draft.assets[old];changed++}
 draft.publishedPhotos=current;return changed;
}
async function catalogAsset(path){path=currentPhotoPath(path);if(baseDraft.assets?.[path])return dataURLBytes(baseDraft.assets[path]);try{if('caches'in window){const cached=await caches.match(new URL(path,location.href).href);if(cached?.ok)return new Uint8Array(await cached.arrayBuffer())}const response=await fetch(path);if(response.ok)return new Uint8Array(await response.arrayBuffer())}catch{}throw Error(`No se pudo leer ${path}. Tu borrador está guardado. Pulsa «Vincular carpeta de fotos» y selecciona la carpeta de Comprapp; después vuelve a exportar.`)}
function bindPhotoFolder(){if(tab!=='base'||!$('#base-export'))return;const toolbar=$('#base-export').parentElement;if(!$('#base-folder'))toolbar.insertAdjacentHTML('beforeend','<label class="button">Vincular carpeta de fotos<input id="base-folder" type="file" webkitdirectory multiple hidden></label>');$('#base-folder').onchange=async e=>{try{const needed=new Set(baseDraft.recipes.flatMap(r=>[r.photo&&!r.photo.startsWith('data:')?r.photo:'',r.capture?'assets/'+CAPTURES[r.capture][0]:'',...Object.values(r.seasonalPhotos||{}).filter(path=>path&&!path.startsWith('data:'))]).filter(Boolean));const assets={...baseDraft.assets};let count=0;for(const path of needed){const matches=[...e.target.files].filter(f=>f.webkitRelativePath.toLowerCase().endsWith('/'+path.toLowerCase())||f.webkitRelativePath.toLowerCase().endsWith('/'+path.split('/').slice(1).join('/').toLowerCase()));const exact=matches.length===1?matches[0]:null;if(exact){if(exact.size>15*1024*1024)throw Error('Una foto supera 15 MB.');assets[path]=bytesDataURL(new Uint8Array(await exact.arrayBuffer()),path);count++}}const next={...baseDraft,assets};await basePut(next);baseDraft=next;$('#base-status').textContent=`${count} fotos vinculadas. Ya puedes volver a exportar. Los cambios del borrador se conservan.`}catch(err){$('#base-status').textContent=err.message}}}
function canonicalIngredient(name){const n=norm(name).replace(/\b(sobrante|sobrantes|sobrado|sobrada|sobrados|sobradas|sobras|resto|restos|cocido|cocida|asado|asada)\b/g,' ').replace(/\s+/g,' ').trim();if(/\bpoll?o\b/.test(n))return 'pollo';if(/\bpavo\b/.test(n))return 'pavo';if(['harina','harina de trigo'].includes(n))return 'harina de trigo';if(['pimiento','pimientos','pimiento rojo','pimientos rojos','pimiento verde','pimientos verdes'].includes(n))return 'pimientos';return n}
function shopping(s){const map=new Map(),available=pantryPlanUsage(s).totals;for(const p of s.plan)for(const key of shoppingKeys(s,p)){const r=s.recipes.find(x=>x.id===p[key]);if(!r)continue;for(const i of r.ingredients){if(norm(i.name)==='agua')continue;let unit=i.unit,qty=i.qty*s.settings.people/r.servings;if(unit==='kg'){unit='g';qty*=1000}if(unit==='l'){unit='ml';qty*=1000}const name=canonicalIngredient(i.name),key=name+'|'+unit;let entry=map.get(key);if(!entry){entry={...i,name,qty:0,unit,key,parts:{}};map.set(key,entry)}entry.qty+=qty;entry.parts[norm(i.name)]=(entry.parts[norm(i.name)]||0)+qty}}return [...map.values()].map(i=>{const inPantry=available.get(i.key)||0,needed=i.qty;i.qty=Math.max(0,needed-inPantry);const details=i.name==='pimientos'?Object.entries(i.parts).map(([name,q])=>`${name}: ${amount(q,i.unit)}`).join(' · '):'';i.note=[details,inPantry?`Despensa: ${amount(Math.min(needed,inPantry),i.unit)}`:''].filter(Boolean).join(' · ');return i}).filter(i=>i.qty>0&&!(s.hiddenShopping||[]).includes(i.key)).sort((a,b)=>AISLES.indexOf(a.aisle)-AISLES.indexOf(b.aisle)||alpha(a,b))}
function swapDishes(s,from,to){if(from.index===to.index&&from.key===to.key)return [];const a=s.plan[from.index],b=s.plan[to.index],idA=a[from.key],idB=b[to.key];if(!idA)throw Error('Ese hueco está vacío.');if(!idB&&from.key==='recipe')throw Error('El primer plato no puede quedar vacío. Elige un hueco ocupado para intercambiarlos.');const proposal=structuredClone(s.plan);proposal[from.index][from.key]=idB;proposal[to.index][to.key]=idA;const sauceA=sauceFieldForCourse(from.key),sauceB=sauceFieldForCourse(to.key);if(sauceA)proposal[from.index][sauceA]=sauceB?(b[sauceB]||''):'';if(sauceB)proposal[to.index][sauceB]=sauceA?(a[sauceA]||''):'';const warnings=[];for(const slot of [from,to]){const p=proposal[slot.index],r=s.recipes.find(r=>r.id===p[slot.key]);if(!r)continue;if(!fitsSlot(r,s,slot.key,p.meal,true,p.date))throw Error('El plato no está permitido en ese tipo de plato o comida/cena. Puedes cambiar su configuración en Editar receta.');const conflict=foodConflict(s,proposal,p.date,slot.key,r,slot.index);if(conflict)warnings.push(conflict)}s.plan=proposal;s.checked={};return [...new Set(warnings)]}
function requestDishSwap(from,to){
 if(from.index===to.index&&from.key===to.key)return Promise.resolve(false);
 try{const preview={...state},warnings=swapDishes(preview,from,to);if(warnings.length&&!confirm('Hay ingredientes principales repetidos:\n\n'+warnings.join('\n')+'\n\n¿Quieres repetirlos de todos modos?'))return Promise.resolve(false);
 return commit(s=>swapDishes(s,from,to),'Platos intercambiados').then(()=>true).catch(()=>false)
 }catch(err){toast(err.message);return Promise.resolve(false)}
}
function bindReliability(){
 bindPhotoFolder();
 document.querySelectorAll('[data-hide-product]').forEach(b=>b.onclick=()=>{if(confirm('¿Quitar este producto de la lista? Al recalcular o generar el menú volverán a aparecer todos los productos calculados.'))commit(s=>{s.hiddenShopping??=[];s.hiddenShopping.push(b.dataset.hideProduct)},'Producto retirado de esta lista')});
 if($('#restore-products'))$('#restore-products').onclick=()=>commit(s=>s.hiddenShopping=[],'Productos restaurados');
 let dragging=null,selected=null,busy=false;
 const cards=[...document.querySelectorAll('[data-drop-index]')];
 const slot=el=>({index:+el.dataset.dropIndex,key:el.dataset.dropKey});
 function mark(){for(const card of cards){const isSelected=selected&&+card.dataset.dropIndex===selected.index&&card.dataset.dropKey===selected.key;card.classList.toggle('swap-selected',!!isSelected);card.querySelector('.menu-photo')?.setAttribute('aria-pressed',String(!!isSelected))}}
 function clearSelection(){selected=null;mark()}
 function clearDrag(){dragging=null;document.querySelectorAll('.drop-highlight').forEach(el=>el.classList.remove('drop-highlight'))}
 async function select(to){
  if(busy)return;
  if(!selected){if(!state.plan[to.index]?.[to.key])return;selected=to;mark();toast('Toca otra receta para intercambiarlas. Toca la misma para cancelar.');return}
  if(selected.index===to.index&&selected.key===to.key){clearSelection();return}
  busy=true;try{if(await requestDishSwap(selected,to))clearSelection()}finally{busy=false}
 }
 const app=$('#app');if(app)app.onkeydown=e=>{if(e.key==='Escape')clearSelection()};
 for(const card of cards){
  let pointer=null,moved=false;
  // Observe movement without claiming the gesture, so photos keep native scroll.
  card.onpointerdown=e=>{pointer={x:e.clientX,y:e.clientY};moved=false};
  card.onpointermove=e=>{if(pointer&&Math.hypot(e.clientX-pointer.x,e.clientY-pointer.y)>10)moved=true};
  card.onpointercancel=()=>{pointer=null;moved=true};
  card.onclick=e=>{if(e.target.closest('button,a,input,select,textarea,label'))return;if(moved&&e.detail!==0)return;select(slot(card))};
  const photo=card.querySelector('.menu-photo');if(photo)photo.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(slot(card))}};
  card.ondragover=e=>{if(!dragging)return;e.preventDefault();card.classList.add('drop-highlight')};
  card.ondragleave=()=>card.classList.remove('drop-highlight');
  card.ondrop=e=>{e.preventDefault();const from=dragging;clearDrag();clearSelection();if(from)requestDishSwap(from,slot(card))};
  if(photo){photo.querySelectorAll('img').forEach(img=>img.draggable=false);photo.ondragstart=e=>{moved=true;clearSelection();dragging=slot(card);e.dataTransfer.setData('text/plain','comprapp-plato');e.dataTransfer.effectAllowed='move'};photo.ondragend=clearDrag}
 }
}
