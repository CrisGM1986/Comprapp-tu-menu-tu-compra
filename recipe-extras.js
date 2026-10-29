if(!GROUPS.includes('Salsas'))GROUPS.push('Salsas');
const VEGETARIAN_CHOICES={auto:'Detectar por ingredientes',yes:'Sí, apta para vegetarianos',no:'No apta para vegetarianos'};
function isVegetarian(recipe){
 if(recipe.vegetarianUse==='yes')return true;if(recipe.vegetarianUse==='no')return false;
 const ingredients=norm((recipe.ingredients||[]).map(i=>i.name).join(' · '));
 if(!ingredients)return false;
 return !/\b(carne|pollo|pavo|ternera|cerdo|cordero|conejo|pato|buey|jamon|bacon|beicon|panceta|chorizo|chistorra|butifarra|longaniza|embutido\w*|salchich\w*|sobrasada|morcilla|fuet|salchichon|lomo|costilla\w*|solomillo|secreto iberico|pescado|atun|bonito|salmon|merluza|bacalao|sardina\w*|anchoa\w*|boqueron\w*|caballa|dorada|lubina|rape|trucha|lenguado|marisco|gamba\w*|langostino\w*|camaron\w*|mejillon\w*|almeja\w*|berberecho\w*|calamar\w*|sepia|pulpo|chipiron\w*|surimi|cangrejo|ostra\w*|vieira\w*|gelatina|manteca|grasa animal|worcestershire|salsa perrins|salsa de pescado|salsa de ostras|caldo de carne|caldo de pollo|caldo de pescado)\b/.test(ingredients)&&!['Carne','Pescado'].includes(recipe.group);
}
function normalizeRecipeExtras(s){
 for(const r of s.recipes){r.author??='Tere';r.vegetarianUse??='auto';r.sauces??=(r.group==='Carne'||/albondiga/.test(norm(r.name)))?['sauce-tomato','sauce-mushroom','sauce-pepper'].filter(id=>s.recipes.some(x=>x.id===id&&x.roles?.includes('sauce'))):[]}
 for(const p of s.plan||[]){p.sauce??='';p.secondSauce??=''}
 if(s.settings)s.settings.vegetarian??=false;
 return s;
}
function validateRecipeExtras(s){
 if(s.settings?.vegetarian!==undefined&&typeof s.settings.vegetarian!=='boolean')throw Error('Opción vegetariana inválida.');
 for(const r of s.recipes||[]){if(typeof r.author!=='string'||r.author.length>120)throw Error('Autoría inválida.');if(!Object.hasOwn(VEGETARIAN_CHOICES,r.vegetarianUse))throw Error('Clasificación vegetariana inválida.');if(!Array.isArray(r.sauces)||r.sauces.some(id=>typeof id!=='string'||!s.recipes.some(x=>x.id===id&&x.roles?.includes('sauce'))))throw Error('Revisa las salsas sugeridas de la receta.')}
 for(const p of s.plan||[])for(const field of ['sauce','secondSauce'])if(p[field]&&!s.recipes.some(r=>r.id===p[field]&&r.roles?.includes('sauce')))throw Error('La salsa del menú no es válida.');
}
function clearNonVegetarianPlan(s,plan=s.plan){
 if(!s.settings.vegetarian)return false;let changed=false;
 for(const p of plan)for(const key of shoppingKeys(s,p)){const r=s.recipes.find(r=>r.id===p[key]);if(r&&!isVegetarian(r)){p[key]='';const sauceField=sauceFieldForCourse(key);if(sauceField)p[sauceField]='';if(key==='accompaniment')p.accompanimentChosen=false;changed=true}}
 return changed;
}
function recipeExtraFields(r,recipes){return `<label>Autor/a<input name="author" maxlength="120" value="${esc(r.author||'')}" placeholder="Nombre de quien aporta la receta"></label><label>Receta vegetariana<select name="vegetarianUse">${Object.entries(VEGETARIAN_CHOICES).map(([key,label])=>`<option value="${key}" ${(r.vegetarianUse||'auto')===key?'selected':''}>${label}</option>`).join('')}</select><small>Incluye huevos y lácteos. Puedes corregir la detección.</small></label><fieldset class="full"><legend>Salsas sugeridas</legend><p class="muted">Opcionales: se comprará solo la salsa elegida en el menú.</p>${recipes.filter(x=>x.id!==r.id&&x.roles.includes('sauce')).map(x=>`<label><input type="checkbox" name="suggestedSauce" value="${x.id}" ${(r.sauces||[]).includes(x.id)?'checked':''}> ${esc(x.name)}</label>`).join('')||'<p>Añade una receta de tipo Salsa para poder sugerirla.</p>'}</fieldset>`}
function recipeExtraDetails(r){return `<p class="muted">Autor/a: ${esc(r.author||'Sin indicar')} · ${isVegetarian(r)?'Apta para vegetarianos':'No apta para vegetarianos'}${r.vegetarianUse==='auto'?' (según ingredientes)':''}</p>${r.sauces?.length?'<h3>Salsas sugeridas</h3><ul>'+r.sauces.map(id=>state.recipes.find(x=>x.id===id)).filter(Boolean).map(x=>'<li>'+esc(x.name)+'</li>').join('')+'</ul>':''}`}
function sauceFieldForCourse(key){return key==='recipe'?'sauce':key==='second'?'secondSauce':null}
function optionalSauceCard(p,index,r,usage,key='recipe'){
 const field=sauceFieldForCourse(key),sauce=state.recipes.find(x=>x.id===p[field]);
 if(sauce)return `<div class="optional-side"><span>Salsa: ${esc(sauce.name)}</span>${pantrySlotBadge(state,index,field,usage)}<button class="icon-action options-action" data-options="${field}" data-index="${index}" aria-label="Cambiar salsa">${icon('more')}</button></div>`;
 return '';
}
function chooseSauce(index,key='recipe'){
 const field=sauceFieldForCourse(key),p=state.plan[index],main=state.recipes.find(r=>r.id===p[key]),choices=state.recipes.filter(r=>r.roles.includes('sauce')&&eligible(r,state.settings,true));
 choices.sort((a,b)=>Number((main?.sauces||[]).includes(b.id))-Number((main?.sauces||[]).includes(a.id))||alpha(a,b));
 $('#dialog').innerHTML=`<button class="close" data-close aria-label="Cerrar">✕</button><h2>Elegir salsa</h2><p>Se añadirá a la compra con las raciones de tu menú.</p><form id="sauce-form"><label>Salsa<select id="sauce-choice"><option value="">Sin salsa</option>${choices.map(r=>`<option value="${r.id}" ${p[field]===r.id?'selected':''}>${esc(r.name)}${(main?.sauces||[]).includes(r.id)?' · Sugerida':''}</option>`).join('')}</select></label>${choices.length?'':'<p>Marca con un corazón alguna salsa compatible en el recetario.</p>'}<button class="primary">Guardar salsa</button></form>`;
 $('#dialog').showModal();bindDialog();$('#sauce-form').onsubmit=async e=>{e.preventDefault();const id=$('#sauce-choice').value;if(id&&!choices.some(r=>r.id===id))return;await commit(s=>{s.plan[index][field]=id;s.checked={}},'Salsa actualizada');$('#dialog').close()};
}
function bindSauces(){document.querySelectorAll('[data-add-sauce]').forEach(b=>b.onclick=()=>chooseSauce(+b.dataset.addSauce));document.querySelectorAll('[data-options="sauce"],[data-options="secondSauce"]').forEach(b=>b.onclick=()=>chooseSauce(+b.dataset.index,b.dataset.options==='secondSauce'?'second':'recipe'))}
function basicSauces(){
 const ingredient=(name,qty,unit,aisle=4)=>({name,qty,unit,aisle:AISLES[aisle]});
 return [
 {id:'sauce-tomato',name:'Salsa de tomate',minutes:25,ingredients:[ingredient('tomate triturado',500,'g',0),ingredient('cebolla',100,'g',0),ingredient('aceite de oliva',20,'ml'),ingredient('ajo',1,'ud',0)],steps:'Pica la cebolla y el ajo. Rehógalos con el aceite a fuego suave.\nAñade el tomate y cocina 20 minutos, removiendo. Tritura si quieres una textura fina.'},
 {id:'sauce-bechamel',name:'Salsa bechamel',minutes:15,ingredients:[ingredient('leche',500,'ml',2),ingredient('mantequilla',40,'g',2),ingredient('harina de trigo',40,'g',3),ingredient('nuez moscada',1,'g')],steps:'Derrite la mantequilla y cocina la harina durante dos minutos removiendo.\nAñade la leche poco a poco sin dejar de batir. Cocina hasta espesar y termina con la nuez moscada.'},
 {id:'sauce-yogurt',name:'Salsa de yogur',minutes:5,ingredients:[ingredient('yogur natural',250,'g',2),ingredient('zumo de limón',15,'ml',0),ingredient('aceite de oliva',10,'ml'),ingredient('ajo',1,'ud',0)],steps:'Mezcla el yogur con el limón y el aceite.\nAñade el ajo rallado y remueve. Guarda en frío hasta servir.'},
 {id:'sauce-mushroom',name:'Salsa de champiñones',minutes:20,ingredients:[ingredient('champiñones',250,'g',0),ingredient('cebolla',100,'g',0),ingredient('nata para cocinar',200,'ml',2),ingredient('aceite de oliva',15,'ml')],steps:'Pica la cebolla y rehógala con el aceite.\nAñade los champiñones laminados y cocina hasta evaporar el líquido. Incorpora la nata y cocina cinco minutos. Tritura si lo prefieres.'},
 {id:'sauce-pepper',name:'Salsa a la pimienta',minutes:10,ingredients:[ingredient('nata para cocinar',200,'ml',2),ingredient('caldo de verduras',100,'ml'),ingredient('pimienta negra',2,'g'),ingredient('mantequilla',15,'g',2)],steps:'Derrite la mantequilla y calienta brevemente la pimienta.\nAñade el caldo de verduras y la nata. Cocina a fuego suave, removiendo, hasta que espese.'}
 ].map(r=>({...r,group:'Salsas',roles:['sauce'],servings:4,photo:'',capture:'',emoji:'🥣',author:'Comprapp',vegetarianUse:'auto',sauces:[],accompaniments:[],special:'',source:'Propuesta básica editable de Comprapp; no transcrita del vídeo.',occasions:[],specialOnly:false,meals:['Comida','Cena'],mainFoods:['other'],dayPreference:'any',menuRulesVersion:1}));
}

let vegetarianFilter='';
function recipeExtraFilters(){return '<select id="vegetarian-filter" aria-label="Filtrar recetas vegetarianas"><option value="">Todas las dietas</option><option value="yes" '+(vegetarianFilter==='yes'?'selected':'')+'>Aptas para vegetarianos</option><option value="no" '+(vegetarianFilter==='no'?'selected':'')+'>No vegetarianas</option></select>'}
function matchesVegetarianFilter(r){return !vegetarianFilter||isVegetarian(r)===(vegetarianFilter==='yes')}
function bindRecipeExtraFilters(){const filter=$('#vegetarian-filter');if(filter)filter.onchange=e=>{vegetarianFilter=e.target.value;render()}}

function cleanSauceReferences(s){
 const valid=new Set(s.recipes.filter(r=>r.roles?.includes('sauce')).map(r=>r.id));
 for(const r of s.recipes)r.sauces=(r.sauces||[]).filter(id=>valid.has(id));
 for(const p of s.plan||[])for(const field of ['sauce','secondSauce'])if(p[field]&&!valid.has(p[field]))p[field]='';
}
