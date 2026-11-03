function weekRecipeCanFit(recipe,s,p,key,quick=false){
 if(quick&&!hasQuickVariant(recipe))return false;const r=quick?quickRecipe(recipe):recipe;
 // An explicit manual choice can use an unmarked recipe without changing its hearts.
 const chosen={...r,preference:r.preference==='dislike'?'normal':r.preference};
 return fitsSlot(chosen,{...s,settings:{...s.settings,useQuick:false}},key,p.meal,true,p.date);
}
function weekRecipeDestinations(s,recipe,quick=false){return s.plan.flatMap((p,index)=>{
 const keys=new Set(activeKeys(s,p));if(recipe.roles.includes('accompaniment'))keys.add('accompaniment');if(recipe.roles.includes('sauce')){keys.add('sauce');if(activeKeys(s,p).includes('second'))keys.add('secondSauce')}
 return [...keys].filter(key=>weekRecipeCanFit(recipe,s,p,key,quick)).map(key=>({index,key,date:p.date,meal:p.meal,oldId:p[key]||''}));
}).sort((a,b)=>a.date.localeCompare(b.date)||(a.meal===b.meal?0:a.meal==='Comida'?-1:1))}
function replaceWeekRecipe(s,id,target,quick){
 const recipe=s.recipes.find(r=>r.id===id),p=s.plan.find(p=>p.date===target.date&&p.meal===target.meal);if(!recipe||!p)throw Error('El menú ha cambiado. Vuelve a elegir un día.');
 if((p[target.key]||'')!==target.oldId)throw Error('Ese plato ha cambiado. Revisa de nuevo la sustitución.');
 if(!weekRecipeDestinations(s,recipe,quick).some(x=>x.date===target.date&&x.meal===target.meal&&x.key===target.key))throw Error('La receta no es compatible con ese hueco y tus ajustes.');
 p[target.key]=id;p.quick??={};p.quick[target.key]=!!(quick&&hasQuickVariant(recipe));
 const sauce=sauceFieldForCourse(target.key);if(sauce){p[sauce]='';p.quick[sauce]=false}
 if(target.key==='accompaniment')p.accompanimentChosen=true;
 s.checked={};
}
function addRecipeToWeek(id){
 const recipe=state.recipes.find(r=>r.id===id);if(!recipe)return;
 const dialog=$('#dialog');
 if(!state.plan.length){dialog.innerHTML='<button class="close" data-close aria-label="Cerrar">✕</button><h2>Añadir a mi semana</h2><p>Genera primero un menú para poder elegir el día y el plato que quieres sustituir.</p><button id="week-go-menu" class="primary">Ir a mi menú</button>';dialog.showModal();bindDialog();$('#week-go-menu').onclick=()=>{dialog.close();navigate('menu')};return}
 const versions=hasQuickVariant(recipe);
 dialog.innerHTML=`<button class="close" data-close aria-label="Cerrar">✕</button><h2>Añadir a mi semana</h2><p>${esc(recipe.name)}</p><form id="add-week-form">${versions?`<label>Versión<select id="week-version"><option value="original" ${state.settings.useQuick?'':'selected'}>Original · ${recipe.minutes} min</option><option value="quick" ${state.settings.useQuick?'selected':''}>⚡ Rápida · ${recipe.quickVariant.minutes} min</option></select></label>`:''}<label>Día y plato<select id="week-destination" required></select></label><p id="week-replacement-warning" class="note" role="status"></p><p id="week-repeat-warning" class="muted"></p>${recipe.preference==='dislike'?'<p class="muted">La añades manualmente a este día. Sus corazones no cambian; seguirá fuera de la generación automática.</p>':''}<p id="week-add-error" class="danger" role="alert"></p><div class="actions"><button class="primary" id="week-add-confirm" type="submit">Sustituir plato</button><button type="button" data-close>Cancelar</button></div></form>`;
 dialog.showModal();bindDialog();const select=$('#week-destination'),version=$('#week-version'),confirmButton=$('#week-add-confirm');let targets=[];
 const useQuick=()=>version?.value==='quick';
 function warn(){const target=targets[Number(select.value)];if(!target){$('#week-replacement-warning').textContent='No hay huecos compatibles con el tipo de plato, comida/cena, dieta y tiempo. Revisa tus ajustes o elige otra versión.';$('#week-repeat-warning').textContent='';confirmButton.disabled=true;return}
  const old=state.recipes.find(r=>r.id===target.oldId),date=new Date(target.date+'T12:00:00').toLocaleDateString('es',{weekday:'long',day:'numeric',month:'short'});
  $('#week-replacement-warning').textContent=old?`Se sustituirá «${old.name}» del ${date}, ${target.meal.toLowerCase()} (${COURSES[target.key].toLowerCase()}).`:`Se añadirá al hueco vacío del ${date}, ${target.meal.toLowerCase()} (${COURSES[target.key].toLowerCase()}).`;
  confirmButton.textContent=old?'Sustituir plato':'Añadir receta';confirmButton.disabled=false;
  const conflict=foodConflict(state,state.plan,target.date,target.key,recipe,target.index);$('#week-repeat-warning').textContent=conflict?conflict+' Puedes añadirla igualmente.':'';
 }
 function refresh(){const previous=targets[Number(select.value)];targets=weekRecipeDestinations(state,recipe,useQuick());select.innerHTML=targets.map((t,i)=>`<option value="${i}">${esc(new Date(t.date+'T12:00:00').toLocaleDateString('es',{weekday:'long',day:'numeric',month:'short'})+' · '+t.meal+' · '+COURSES[t.key])}</option>`).join('');const keep=targets.findIndex(t=>previous&&t.date===previous.date&&t.meal===previous.meal&&t.key===previous.key);select.value=String(keep>=0?keep:0);warn()}
 select.onchange=warn;if(version)version.onchange=refresh;refresh();
 $('#add-week-form').onsubmit=async e=>{e.preventDefault();const target=targets[Number(select.value)];if(!target||confirmButton.disabled)return;confirmButton.disabled=true;const chosenQuick=useQuick();
  try{await commit(s=>replaceWeekRecipe(s,id,target,chosenQuick),'Receta añadida a tu semana');dialog.close()}catch(error){$('#week-add-error').textContent=error.message;confirmButton.disabled=false}
 };
}
function bindAddToWeek(){document.querySelectorAll('[data-add-week]').forEach(b=>b.onclick=()=>addRecipeToWeek(b.dataset.addWeek))}
