function isBasicDessert(recipe){const name=norm(recipe.name||'');return Number.isFinite(recipe.minutes)&&recipe.minutes<=5&&/^(fruta(?: fresca| de temporada)?|pieza de fruta|yogur(?:t)?(?: natural| griego| sin azucar)?)$/.test(name)}
function isEverydayDessert(recipe){return isBasicDessert(recipe)||(Number.isFinite(recipe.minutes)&&recipe.minutes<5)}
function isWeekendDate(date){return !!date&&[0,6].includes(new Date(date+'T12:00:00').getDay())}
function dessertAllowedForDay(recipe,key,date,manual=false){return manual||key!=='dessert'||!date||isWeekendDate(date)||isEverydayDessert(recipe)}
function dessertPreferenceScore(recipe,p,key){
 if(key!=='dessert')return 0;
 if(isWeekendDate(p.date))return isEverydayDessert(recipe)?0:-16;
 const friday=new Date(p.date+'T12:00:00').getDay()===5;
 return isBasicDessert(recipe)?(friday?0:-15):(friday?-10:0);
}
function upgradeDessertSchedule(s){
 if(s.settings.dessertScheduleVersion===1)return {changed:0,missing:0};let changed=0,missing=0;
 s.plan.forEach((p,index)=>{if(isWeekendDate(p.date)||!s.settings.layout[p.meal].dessert)return;const current=s.recipes.find(r=>r.id===p.dessert);if(current&&isEverydayDessert(current))return;const options=ruleCandidates(s,'dessert',p,s.plan,index);if(!options.length){missing++;return}const best=Math.min(...options.map(r=>dayPreferenceScore(r,p,s)+dessertPreferenceScore(r,p,'dessert'))),chosen=weightedRecipe(options.filter(r=>dayPreferenceScore(r,p,s)+dessertPreferenceScore(r,p,'dessert')===best));p.dessert=chosen.id;changed++});
 s.settings.dessertScheduleVersion=1;if(changed){s.checked={};s.hiddenShopping=[]}return {changed,missing};
}
