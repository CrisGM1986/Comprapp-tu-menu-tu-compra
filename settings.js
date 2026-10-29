function settingsScreen(){
 const s=state.settings;
 return hero('A TU RITMO','Ajustes de tu menú.','Elige cuántos sois, qué días planificar y cuánto tiempo quieres cocinar.')+`<div class="settings settings-page"><form id="settingsForm"><div class="fields">
 <label>Comensales<input name="people" type="number" min="1" max="30" value="${s.people}" required></label>
 ${durationFields(s)}
 <label>Tiempo máximo entre semana (min)<input name="minutes" type="number" min="10" max="300" value="${s.maxMinutes}" required></label>
 <label id="weekend-time-field" ${s.includeWeekends?'':'hidden'}>Tiempo máximo en fin de semana (min)<input name="weekendMinutes" type="number" min="10" max="300" value="${s.weekendMinutes||s.maxMinutes}" required></label>
 <label class="full">Ingredientes que quieres evitar<input name="exclude" value="${esc(s.exclude)}" placeholder="Por ejemplo: pulpo, champiñón"></label>
 </div><details class="settings-disclosure"><summary>Platos de comida y cena</summary>${layoutFields(s)}</details>
 <p class="muted">Al ampliar el calendario se mantienen tus platos y se completan los días nuevos. Las preferencias de las recetas se aplican al generar o sustituir platos.</p>
 <button class="primary">Guardar ajustes</button></form>
 <section class="settings-shortcut"><h2>Organiza tus recetas</h2><p>Cambia comida/cena, tiempos y días recomendados en una tabla, también en grupo.</p><button id="manage-recipes-settings">Gestionar mis recetas</button></section>
 <details class="settings-disclosure advanced-settings"><summary>Ajustes avanzados</summary>
 <section><h2>Generación</h2><label><input name="optimize" form="settingsForm" type="checkbox" ${s.optimize?'checked':''}> Aprovechar ingredientes compartidos para simplificar la compra</label><p class="muted">Revisa siempre los ingredientes si hay alergias o intolerancias.</p><button type="submit" form="settingsForm">Guardar ajustes</button></section>
 <section><h2>Copia de seguridad</h2><p>Guarda recetas, fotos, menú, despensa y compra para recuperarlos o llevarlos a otro dispositivo.</p><div class="actions"><button type="button" id="export">Descargar copia</button><label class="button">Restaurar copia<input id="import" type="file" accept="application/json,.json" hidden></label></div><p class="muted">Restaurar sustituye los datos actuales tras confirmarlo. Los datos están guardados en este navegador.</p></section>
 ${catalogSettings()}
 <section><h2>Actualización</h2><p>Comprapp v18 · <span id="screen-info"></span></p><button type="button" id="refresh-app">Comprobar actualización</button><p class="muted">Los cambios de la aplicación conservan tu cocina si mantienes la misma dirección y navegador.</p></section>
 <details><summary>Sobre el recetario</summary><p class="muted">${SEED.length} recetas del catálogo y propuestas editables de acompañamientos y postres. Las elaboraciones son orientativas y puedes adaptarlas en el recetario.</p></details>
 </details></div>`;
}
function saveMenuSettings(form){
 const f=new FormData(form);
 return commit(s=>{
  const previous=structuredClone(s.settings),weeks=Number(f.get('weeks')),includeWeekends=f.get('calendarDays')==='7';
  Object.assign(s.settings,{people:Number(f.get('people')),maxMinutes:Number(f.get('minutes')),weekendMinutes:Number(f.get('weekendMinutes')),exclude:String(f.get('exclude')||''),optimize:f.has('optimize')});
  if(!Number.isInteger(s.settings.people)||s.settings.people<1||s.settings.people>30||![s.settings.maxMinutes,s.settings.weekendMinutes].every(n=>Number.isFinite(n)&&n>=10&&n<=300))throw Error('Revisa comensales y tiempos de cocina.');
  let addedCourse=false;
  for(const meal of ['Comida','Cena'])for(const key of ['second','dessert','accompaniment']){const enabled=f.has(meal+'-'+key);if(enabled&&!previous.layout[meal][key]){addedCourse=true;if(key==='dessert')for(const p of s.plan.filter(p=>p.meal===meal&&!isWeekendDate(p.date))){const recipe=s.recipes.find(r=>r.id===p.dessert);if(recipe&&!isEverydayDessert(recipe))p.dessert=''}}s.settings.layout[meal][key]=enabled}
  if(weeks!==previous.weeks||includeWeekends!==previous.includeWeekends)resizePlan(s,weeks,includeWeekends);
  else if(addedCourse&&s.plan.length)s.plan=makePlan(s,{existingPlan:s.plan});
  s.checked={};
 },'Ajustes guardados');
}
function bindSettingsExtras(){
 const daysControl=document.querySelector('[name=calendarDays]');if(daysControl)daysControl.onchange=()=>{$('#weekend-time-field').hidden=daysControl.value!=='7'};
 const manager=$('#manage-recipes-settings');if(manager)manager.onclick=()=>openRecipeManager('personal');
}
