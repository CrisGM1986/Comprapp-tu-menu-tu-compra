const SHOP_SECTIONS=[...AISLES,'Hogar e higiene','Otros productos'];
const alpha=(a,b)=>a.name.localeCompare(b.name,'es',{sensitivity:'base',numeric:true});
// Referencias de productos vendidos en Mercadona, consultadas a 31/10/2026.
// Precios ORIENTATIVOS (no conexión a Mercadona, sin disponibilidad ni compra automática).
// Los nuevos enlaces suministrados por el usuario apuntan directamente a tienda.mercadona.es.
// mode:'weight' => precio por peso solicitado, sin redondear a paquetes.
// Para los demás productos se compran envases completos (Math.ceil).
// No asignar precio a equivalencias dudosas: p. ej. 'ajo|ud' no especifica si es diente o cabeza.
const MERCADONA_PRICE_DATE='01/11/2026';
const MERCADONA_SAMPLE={
 // Productos ya existentes en la selección original: conservar sus referencias.
 'huevo|ud':{name:'Huevos medianos M · docena',size:12,unit:'ud',cents:285,url:'https://tienda.mercadona.es/product/31505/huevos-medianos-m-paquete'},
 'arroz|g':{name:'Arroz redondo Hacendado · 1 kg',size:1000,unit:'g',cents:115,url:'https://tienda.mercadona.es/product/5044/arroz-redondo-hacendado-paquete'},
 'leche|ml':{name:'Leche entera Hacendado · 1 l',size:1000,unit:'ml',cents:96,url:'https://tienda.mercadona.es/product/10380/leche-entera-hacendado-brick'},
 'garbanzos cocidos|g':{name:'Garbanzo cocido Hacendado · 400 g escurridos',size:400,unit:'g',cents:80,url:'https://tienda.mercadona.es/product/26029/garbanzo-cocido-hacendado-tarro'},
 'garbanzos secos|g':{name:'Garbanzo Hacendado · 1 kg',size:1000,unit:'g',cents:215,url:'https://tienda.mercadona.es/product/5214/garbanzo-hacendado-categoria-extra-paquete'},
 'tomate triturado|g':{name:'Tomate triturado Hacendado · 800 g',size:800,unit:'g',cents:100,url:'https://tienda.mercadona.es/product/16043/tomate-triturado-hacendado-freir-bote'},
 'azúcar|g':{name:'Azúcar blanco Hacendado · 1 kg',size:1000,unit:'g',cents:90,url:'https://tienda.mercadona.es/product/19897/azucar-blanco-hacendado-paquete'},
 'harina de trigo|g':{name:'Harina de trigo Hacendado · 1 kg',size:1000,unit:'g',cents:72,url:'https://tienda.mercadona.es/product/29100/harina-trigo-hacendado-paquete'},
 'aceite de oliva|ml':{name:'Aceite de oliva virgen extra Hacendado · 1 l',size:1000,unit:'ml',cents:435,url:'https://tienda.mercadona.es/product/4740/aceite-oliva-virgen-extra-hacendado-botella'},
 'pan rallado|g':{name:'Pan rallado Hacendado · 750 g',size:750,unit:'g',cents:85,url:'https://tienda.mercadona.es/product/82219/pan-rallado-hacendado-paquete'},
 'espaguetis|g':{name:'Spaghetti Hacendado · 500 g',size:500,unit:'g',cents:85,url:'https://tienda.mercadona.es/product/6331/spaghetti-hacendado-paquete'},
 'sal|g':{name:'Sal fina Hacendado · 1 kg',size:1000,unit:'g',cents:40,url:'https://tienda.mercadona.es/product/19731/sal-fina-hacendado-paquete'},

 // Productos añadidos, seleccionados según la frecuencia real en recipes.js.
 'cebolla|g':{name:'Cebollas · malla 1 kg',size:1000,unit:'g',cents:150,url:'https://tienda.mercadona.es/product/69089/cebollas-malla'},
 'patata|g':{name:'Patatas · malla 5 kg',size:5000,unit:'g',cents:500,url:'https://tienda.mercadona.es/product/69099/patatas-malla'},
 'zanahoria|g':{name:'Zanahorias · paquete 1 kg',size:1000,unit:'g',cents:120,url:'https://tienda.mercadona.es/product/69586/zanahorias-paquete'},
 'tomate|g':{name:'Tomate ensalada · precio por kg',size:1000,unit:'g',cents:270,mode:'weight',url:'https://cestabaja.es/es/product/tomate-ensalada-60369/'},
 'mantequilla|g':{name:'Mantequilla sin sal Hacendado · 250 g',size:250,unit:'g',cents:205,url:'https://cestabaja.es/es/product/mantequilla-sin-sal-anadida-hacendado-20716/'},
 'nata para montar|ml':{name:'Nata para montar Hacendado · 500 ml',size:500,unit:'ml',cents:195,url:'https://cestabaja.es/es/product/nata-para-montar-hacendado-10276/'},
 'lechuga|g':{name:'Lechuga iceberg cortada y lavada · 250 g',size:250,unit:'g',cents:95,url:'https://cestabaja.es/es/product/lechuga-iceberg-cortada-y-lavada-69670/'},
 'chorizo|g':{name:'Chorizo dulce extra Hacendado · pieza 280 g',size:280,unit:'g',cents:249,url:'https://tienda.mercadona.es/product/54209/chorizo-dulce-extra-hacendado-pieza'},
 'lomo de cerdo|g':{name:'Filetes de lomo de cerdo familiar · bandeja (peso variable)',size:1000,unit:'g',cents:630,mode:'weight',url:'https://tienda.mercadona.es/product/3395/filetes-lomo-cerdo-familiar-bandeja'},
 'pimiento rojo|g':{name:'Pimiento rojo · precio por kg',size:1000,unit:'g',cents:290,mode:'weight',url:'https://cestabaja.es/es/product/pimiento-rojo-69310/'},
 'pimiento verde|g':{name:'Pimiento verde para freír · precio por kg',size:1000,unit:'g',cents:250,mode:'weight',url:'https://cestabaja.es/es/product/pimiento-verde-freir-69320/'},
 'calabacín|g':{name:'Calabacín verde · pieza aprox. 420 g',size:420,unit:'g',cents:190,mode:'piece-weight',note:'Precio/kg y peso medio orientativos: se compra por piezas',url:'https://tienda.mercadona.es/product/69338/calabacin-verde-pieza'},
 'jamón serrano|g':{name:'Jamón serrano Incarlopsa lonchas · 240 g',size:240,unit:'g',cents:395,url:'https://cestabaja.es/es/product/jamon-serrano-incarlopsa-lonchas-59124/'},
 'queso fresco|g':{name:'Queso fresco de vaca Hacendado · 250 g',size:250,unit:'g',cents:160,url:'https://tienda.mercadona.es/product/51191/queso-fresco-vaca-hacendado-tarrina'},
 'chocolate negro|g':{name:'Chocolate negro para fundir Hacendado · 200 g',size:200,unit:'g',cents:225,url:'https://cestabaja.es/es/product/chocolate-negro-fundir-hacendado-12531/'},
 'aceite de girasol|ml':{name:'Aceite de girasol refinado Hacendado · 1 l',size:1000,unit:'ml',cents:185,url:'https://cestabaja.es/es/product/aceite-de-girasol-refinado-0-2o-hacendado-4040/'},
 'queso rallado|g':{name:'Queso rallado 4 quesos Hacendado · 200 g',size:200,unit:'g',cents:175,url:'https://tienda.mercadona.es/product/21581/queso-rallado-4-quesos-hacendado-paquete'},
 'pechuga de pollo|g':{name:'Pechugas enteras familiar de pollo · bandeja (peso variable)',size:1000,unit:'g',cents:620,mode:'weight',url:'https://tienda.mercadona.es/product/3682/pechugas-enteras-pollo-bandeja'},
 'levadura química|g':{name:'Impulsor gasificante repostería Hacendado · 90 g',size:90,unit:'g',cents:70,url:'https://cestabaja.es/es/product/impulsor-gasificante-reposteria-hacendado-para-uso-alimentario-80293/'},
 'levadura fresca|g':{name:'Levadura fresca Levital · 50 g',size:50,unit:'g',cents:50,url:'https://cestabaja.es/es/product/levadura-fresca-levital-87811/'},
 'pimentón dulce|g':{name:'Pimentón dulce Hacendado · 75 g',size:75,unit:'g',cents:130,url:'https://cestabaja.es/es/product/pimenton-dulce-hacendado-60573/'},
 'champiñón|g':{name:'Champiñones blancos · bandeja 300 g',size:300,unit:'g',cents:156,url:'https://cestabaja.es/es/product/champinones-blancos-26951/'},
 'perejil|g':{name:'Perejil fresco troceado · paquete 40 g',size:40,unit:'g',cents:95,url:'https://cestabaja.es/es/product/perejil-troceado-lavado-69701/'},
 'bacon|g':{name:'Bacón Hacendado en cintas · 260 g',size:260,unit:'g',cents:195,url:'https://cestabaja.es/es/product/bacon-hacendado-cintas-16252/'},

 // Productos elegidos por el usuario en la tienda oficial de Mercadona (01/11/2026).
 'aguacate|ud':{name:'Aguacate · pieza (peso variable)',size:1,unit:'ud',cents:101,estimate:true,note:'Precio estimado por pieza: depende del peso real',url:'https://tienda.mercadona.es/product/3830/aguacate-pieza'},
 'calabaza|g':{name:'Calabaza cacahuete cortada · bandeja aprox. 520 g',size:520,unit:'g',cents:182,mode:'approx-pack',note:'Bandeja de peso variable; aproximación para estimar envases',url:'https://tienda.mercadona.es/product/3527/calabaza-cacahuete-cortada-trozos-bandeja'},
 'espinaca|g':{name:'Espinacas cortadas y lavadas · 300 g',size:300,unit:'g',cents:130,url:'https://tienda.mercadona.es/product/69730/espinacas-cortadas-paquete'},
 'guisantes|g':{name:'Guisante fino Hacendado ultracongelado · 1 kg',size:1000,unit:'g',cents:155,url:'https://tienda.mercadona.es/product/61215/guisante-fino-hacendado-ultracongelado-paquete'},
 'carne picada de ternera|g':{name:'Preparado de carne picada de vacuno · bandeja (peso variable)',size:1000,unit:'g',cents:null,mode:'weight',note:'Preparado de vacuno, no necesariamente carne picada 100 %',url:'https://tienda.mercadona.es/product/3454/preparado-carne-picada-vacuno-bandeja'},
 'costilla de cerdo|g':{name:'Costillas de cerdo carnosas a tacos · bandeja (peso variable)',size:1000,unit:'g',cents:800,mode:'weight',url:'https://tienda.mercadona.es/product/2811/costillas-cerdo-carnosas-tacos-bandeja'},
 'queso en lonchas|g':{name:'Queso Gouda en lonchas Hacendado · 300 g',size:300,unit:'g',cents:195,url:'https://tienda.mercadona.es/product/50654/queso-lonchas-gouda-vaca-hacendado-paquete'},
 'queso crema|g':{name:'Queso de untar suave de vaca Hacendado · 300 g',size:300,unit:'g',cents:140,url:'https://tienda.mercadona.es/product/51203/queso-untar-suave-vaca-hacendado-tarrina'},
 'bagel|ud':{name:'Pan Bagel Hacendado · paquete de 4 ud',size:4,unit:'ud',cents:142,url:'https://tienda.mercadona.es/product/23843/pan-bagel-hacendado-paquete'},
 'tortillas de trigo|ud':{name:'Tortillas de trigo Hacendado · paquete de 10 ud',size:10,unit:'ud',cents:115,url:'https://tienda.mercadona.es/product/80859/tortillas-trigo-hacendado-paquete'},
 'pan cristal|ud':{name:'Panes cristal redondos cortados 100 % natural · 4 ud',size:4,unit:'ud',cents:null,note:'Producto disponible como referencia; ninguna receta actual solicita pan cristal',url:'https://tienda.mercadona.es/product/5850/4-panes-cristal-redondos-cortados-100-natural-pack-4'}
};
// Alias de ingrediente usado en algunas recetas: misma harina de trigo.
MERCADONA_SAMPLE['harina|g']=MERCADONA_SAMPLE['harina de trigo|g'];
const mercadonaEuros=cents=>(cents/100).toLocaleString('es-ES',{style:'currency',currency:'EUR'});
function mercadonaItemCost(item){
 const product=MERCADONA_SAMPLE[item.key];
 if(!product||item.unit!==product.unit||!Number.isFinite(item.qty)||item.qty<=0||
    !Number.isFinite(product.cents)||!Number.isFinite(product.size)||product.size<=0)return null;
 const byWeight=product.mode==='weight';
 const byPieceWeight=product.mode==='piece-weight';
 const packs=byWeight?null:Math.ceil(item.qty/product.size);
 // Las piezas de peso variable se facturan por su peso real; este es un cálculo aproximado.
 const cents=byWeight?Math.round(item.qty*product.cents/product.size):
             byPieceWeight?Math.round(packs*product.size*product.cents/1000):
             packs*product.cents;
 return {item,product,packs,byWeight,byPieceWeight,cents};
}
function mercadonaCostLabel(cost){
 if(cost.byWeight)return 'Precio por peso';
 if(cost.byPieceWeight)return `${cost.packs} ${cost.packs===1?'pieza':'piezas'} aprox.`;
 return `${cost.packs} ${cost.packs===1?'envase':'envases'}${cost.product.mode==='approx-pack'?' aprox.':''}`;
}
function mercadonaPriceCell(item){
 const cost=mercadonaItemCost(item);
 if(!cost){const product=MERCADONA_SAMPLE[item.key];return product?`<span class="shop-price"><a href="${product.url}" target="_blank" rel="noopener noreferrer">Consultar</a><small>Precio pendiente</small></span>`:'<span class="shop-price"><b>—</b><small>Sin precio</small></span>'}
 return `<span class="shop-price" title="${esc(cost.product.name)}: ${mercadonaCostLabel(cost)}"><b>${mercadonaEuros(cost.cents)}</b><small>${mercadonaCostLabel(cost)}</small></span>`;
}
function mercadonaBasket(items,extra,checked){
 const lines=[],unpriced=[];
 for(const item of items){
  if(checked[item.key])continue;
  const cost=mercadonaItemCost(item);
  if(!cost){unpriced.push(item);continue}
  lines.push(cost);
 }
 for(const item of extra)if(!item.checked)unpriced.push(item);
 return {lines,unpriced,cents:lines.reduce((sum,line)=>sum+line.cents,0)};
}
function mercadonaEstimateView(items,extra){
 if(!items.length&&!extra.length)return '';
 const basket=mercadonaBasket(items,extra,state.checked);
 const lines=basket.lines.map(cost=>{
  const {item,product,cents,byWeight,byPieceWeight,packs}=cost;
  const description=byWeight?`a peso · ${mercadonaEuros(product.cents)} / kg`:
    byPieceWeight?`${packs} ${packs===1?'pieza':'piezas'} aprox. · ${mercadonaEuros(product.cents)} / kg`:
    `${packs} ${packs===1?'envase':'envases'} × ${mercadonaEuros(product.cents)}${product.mode==='approx-pack'?' (aprox.)':''}`;
  return `<li><span><b>${esc(item.name)}</b> · ${amount(item.qty,item.unit)} necesarios<br><a href="${product.url}" target="_blank" rel="noopener noreferrer">${esc(product.name)}</a> · ${description}</span><strong>${mercadonaEuros(cents)}</strong></li>`;
 }).join('');
 const unpricedLines=basket.unpriced.map(item=>{
   const product=item.key?MERCADONA_SAMPLE[item.key]:null;
   return `<li>${esc(item.name)}${product?` · <a href="${product.url}" target="_blank" rel="noopener noreferrer">${esc(product.name)} (consultar precio)</a>`:''}</li>`;
 }).join('');
 return `<section class="mercadona-estimate"><p class="mercadona-price-note">Catálogo actualizado el ${MERCADONA_PRICE_DATE}. Los precios son referencias orientativas de distintas fechas; no son precios actuales confirmados ni añaden productos al carro de Mercadona.</p><details><summary>Cesta estimada de Mercadona <strong>${mercadonaEuros(basket.cents)} · subtotal parcial</strong></summary><div class="mercadona-estimate-body">${lines?`<ul>${lines}</ul>`:'<p>No hay productos de la selección con precio pendientes de comprar.</p>'}<p>${basket.unpriced.length} ${basket.unpriced.length===1?'producto pendiente':'productos pendientes'} sin precio de referencia. El subtotal no incluye esos productos ni el reparto.</p>${unpricedLines?`<ul>${unpricedLines}</ul>`:''}<p>Los productos envasados se redondean a envases completos; los frescos se estiman por peso o piezas aproximadas. Comprueba el precio, el peso y la disponibilidad en Mercadona antes de comprar.</p></div></details></section>`;
}
function mobileCalendar(dates,usage=pantryPlanUsage(state)){return `<div class="mobile-calendar"><div class="calendar-paging"><span>Desliza para ver más días</span><button id="days-prev" aria-label="Días anteriores">‹</button><button id="days-next" aria-label="Días siguientes">›</button></div><div class="mobile-grid-scroll" tabindex="0" role="region" aria-label="Calendario desplazable de varios días"><table class="mobile-grid"><thead><tr>${dates.map(d=>`<th scope="col">${d.toLocaleDateString('es',{weekday:'short'})}<strong>${d.toLocaleDateString('es',{day:'numeric',month:'short'})}</strong></th>`).join('')}</tr></thead>${['Comida','Cena'].map(meal=>`<tbody><tr class="mobile-meal-band"><th colspan="${dates.length}"><span>${meal}</span></th></tr>${activeKeys(state,{meal}).map(key=>`<tr>${dates.map(d=>{const index=state.plan.findIndex(p=>p.date===dateISO(d)&&p.meal===meal);return `<td>${index>=0?courseCard(state.plan[index],index,key,true,usage):''}</td>`}).join('')}</tr>`).join('')}</tbody>`).join('')}</table></div></div>`}
function dishOptions(index,key){const p=state.plan[index],r=state.recipes.find(r=>r.id===p[key]);$('#dialog').innerHTML=`<button class="close" data-close aria-label="Cerrar">✕</button><h2>${esc(r?.name||'Elegir plato')}</h2><p>${COURSES[key]} · ${p.meal}</p><div class="dish-option-list">${r?`<button id="option-view">${icon('eye')} Ver receta</button><button id="option-auto">${icon('refresh')} Sustituir automáticamente</button>`:''}${['recipe','second'].includes(key)?'<button id="option-sauce">Elegir salsa opcional</button>':''}<button id="option-manual">${icon('more')} Elegir otra receta</button></div>`;$('#dialog').showModal();bindDialog();if(r){$('#option-view').onclick=()=>{$('#dialog').close();showRecipe(r.id,{index,key})};$('#option-auto').onclick=async()=>{try{await commit(s=>regenerate(s,index,key),'Receta sustituida');$('#dialog').close()}catch{}}}if($('#option-sauce'))$('#option-sauce').onclick=()=>{$('#dialog').close();chooseSauce(index,key)};$('#option-manual').onclick=()=>{$('#dialog').close();chooseDish(index,key)}}
function shoppingView(){const items=shopping(state),extra=state.extraShopping||[],checked=items.filter(i=>state.checked[i.key]).length+extra.filter(i=>i.checked).length;return hero('TODO EN UNA LISTA','Tu compra, al completo.',`Ingredientes para ${state.settings.people} personas y los productos que añadas.`,`<div class="stat"><b>${checked}/${items.length+extra.length}</b>productos resueltos</div>`)+`<div class="toolbar"><button id="add-product" class="primary">＋ Añadir producto</button><button id="print">Imprimir lista</button><button id="shopDownload">Descargar lista</button><button id="check-all" ${checked===items.length+extra.length?'disabled':''}>Marcar todo como comprado</button><button id="uncheck">Desmarcar todo</button><button id="restore-products">Restaurar productos calculados</button></div>${mercadonaEstimateView(items,extra)}<div class="shopping">${SHOP_SECTIONS.map(group=>{const rows=items.filter(i=>i.aisle===group),own=extra.filter(i=>i.aisle===group).sort(alpha);return rows.length||own.length?`<h2>${group}</h2>${rows.map(i=>`<div class="shoprow calculated-product"><label><input type="checkbox" data-check="${esc(i.key)}" ${state.checked[i.key]?'checked':''}><span>${esc(i.name)}${i.note?'<small>'+esc(i.note)+'</small>':''}</span></label><b class="shop-amount">${amount(i.qty,i.unit)}</b>${mercadonaPriceCell(i)}<button data-hide-product="${esc(i.key)}" aria-label="Eliminar ${esc(i.name)} de esta lista">×</button></div>`).join('')}${own.map(i=>`<div class="shoprow own-product"><label><input type="checkbox" data-own-check="${i.id}" ${i.checked?'checked':''}><span>${esc(i.name)}<small>Añadido por ti</small></span></label><b class="shop-amount">${esc(i.quantity)}</b><span class="shop-price"><b>—</b><small>Sin precio</small></span><button data-product-edit="${i.id}" aria-label="Editar ${esc(i.name)}">✎</button><button data-product-delete="${i.id}" aria-label="Eliminar ${esc(i.name)}">×</button></div>`).join('')}`:''}).join('')}${items.length+extra.length?'':'<p>Añade productos o genera un menú para empezar.</p>'}</div><p class="muted">Los ingredientes eliminados reaparecen al recalcular el menú. Tus productos propios y sus marcas se conservan al cambiar el menú. Se muestran por separado de los ingredientes calculados para que puedas distinguir las cantidades.</p>`}
function editProduct(id){const item=state.extraShopping?.find(i=>i.id===id)||{name:'',quantity:'1 ud',aisle:'Otros productos'};$('#dialog').innerHTML=`<button class="close" data-close aria-label="Cerrar">✕</button><h2>${id?'Editar producto':'Añadir a mi compra'}</h2><form id="product-form"><div class="fields"><label class="full">Producto<input name="productName" maxlength="120" required value="${esc(item.name)}" placeholder="Papel de cocina, café…"></label><label>Cantidad<input name="quantity" maxlength="60" required value="${esc(item.quantity)}" placeholder="2 paquetes"></label><label>Sección<select name="aisle">${SHOP_SECTIONS.map(g=>`<option ${g===item.aisle?'selected':''}>${g}</option>`).join('')}</select></label></div><button class="primary">Guardar producto</button></form>`;$('#dialog').showModal();bindDialog();$('#product-form').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target),name=String(f.get('productName')).trim(),quantity=String(f.get('quantity')).trim();if(!name||!quantity)return;await commit(s=>{s.extraShopping??=[];const old=s.extraShopping.find(x=>x.id===id);const updated={id:id||crypto.randomUUID(),name,quantity,aisle:f.get('aisle'),checked:old?.checked||false};if(old)Object.assign(old,updated);else s.extraShopping.push(updated)},'Producto guardado');$('#dialog').close()}}
function shoppingText(){return `COMPRAPP · Compra para ${state.settings.people} personas\n\n`+SHOP_SECTIONS.map(g=>g+'\n'+[...shopping(state).filter(i=>i.aisle===g).map(i=>`${state.checked[i.key]?'[x]':'[ ]'} ${i.name}: ${amount(i.qty,i.unit)}${i.note?' — '+i.note:''}`),...(state.extraShopping||[]).filter(i=>i.aisle===g).map(i=>`${i.checked?'[x]':'[ ]'} ${i.name}: ${i.quantity} (añadido por ti)`)].join('\n')).join('\n\n')}
function bindListAndMenu(){document.querySelectorAll('[data-options]').forEach(b=>b.onclick=()=>dishOptions(+b.dataset.index,b.dataset.options));for(const [id,direction]of [['days-prev',-1],['days-next',1]]){const b=document.getElementById(id);if(b)b.onclick=()=>{const box=$('.mobile-grid-scroll');box.scrollBy({left:direction*box.clientWidth,behavior:'smooth'})}}if($('#add-product'))$('#add-product').onclick=()=>editProduct();document.querySelectorAll('[data-product-edit]').forEach(b=>b.onclick=()=>editProduct(b.dataset.productEdit));document.querySelectorAll('[data-product-delete]').forEach(b=>b.onclick=()=>{if(confirm('¿Eliminar este producto de la lista?'))commit(s=>{s.extraShopping=s.extraShopping.filter(i=>i.id!==b.dataset.productDelete)},'Producto eliminado')});document.querySelectorAll('[data-own-check]').forEach(b=>b.onchange=()=>commit(s=>{s.extraShopping.find(i=>i.id===b.dataset.ownCheck).checked=b.checked}));if($('#shopDownload'))$('#shopDownload').onclick=()=>download('Comprapp-compra.txt',shoppingText(),'text/plain;charset=utf-8');if($('#check-all'))$('#check-all').onclick=()=>commit(s=>setAllShoppingChecked(s,true),'Toda la compra marcada como comprada');if($('#uncheck'))$('#uncheck').onclick=()=>commit(s=>{setAllShoppingChecked(s,false)},'Lista desmarcada')}
function validateExtraShopping(s){if(s.extraShopping===undefined)return;const ids=new Set();if(!Array.isArray(s.extraShopping)||s.extraShopping.length>2000)throw Error('Lista de productos inválida.');for(const i of s.extraShopping){if(!i||typeof i.id!=='string'||!/^[-\w]+$/.test(i.id)||ids.has(i.id)||typeof i.name!=='string'||!i.name.trim()||i.name.length>120||typeof i.quantity!=='string'||!i.quantity.trim()||i.quantity.length>60||!SHOP_SECTIONS.includes(i.aisle)||typeof i.checked!=='boolean')throw Error('Producto de compra inválido.');ids.add(i.id)}}

function setAllShoppingChecked(s,checked){if(checked){s.checked??={};for(const item of shopping(s))s.checked[item.key]=true}else s.checked={};s.extraShopping?.forEach(item=>item.checked=checked)}
