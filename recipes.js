/* Recetas caseras ORIENTATIVAS para cuatro personas. Las fotografías aportadas
   no determinan ingredientes o elaboración originales. Mantener IDs estables. */
const GROUPS=['Verdura','Legumbres','Pescado','Carne','Huevos','Pasta','Fruta','Lácteos','Otros','Postres'];
const AISLES=['Fruta y verdura','Carne y pescado','Lácteos y huevos','Pan y cereales','Despensa'];
// Keep IDs stable: never reuse an ID or change it when reordering recipes.
const SEED_RAW=[
 [
  "Guiso de patatas con magro de cerdo",
  "Carne",
  50,
  "🍲",
  "patata|800|g|0;magro de cerdo|600|g|1;zanahoria|200|g|0;cebolla|150|g|0;aceite de oliva|30|ml|4;agua|700|ml|4",
  "Dora el magro con el aceite. Añade cebolla y zanahoria troceadas y sofríe 8 minutos.\nIncorpora las patatas chascadas y el agua. Cocina tapado 30–35 minutos, hasta que carne y patata estén tiernas.",
  "",
  "assets/FOTOS/guiso-patatas-magro.png",
  "r0"
 ],
 [
  "Crema de calabaza",
  "Verdura",
  30,
  "🥣",
  "calabaza|800|g|0;patata|250|g|0;cebolla|150|g|0;aceite de oliva|25|ml|4;agua|700|ml|4",
  "Sofríe la cebolla picada con el aceite durante 5 minutos.\nAñade la calabaza y la patata en dados con el agua; cuece 20 minutos. Tritura y ajusta la textura.",
  "",
  "assets/FOTOS/crema-calabaza.png",
  "r1"
 ],
 [
  "Rollos de cinta de lomo rellenos de jamón y queso",
  "Carne",
  30,
  "🍖",
  "lomo de cerdo|600|g|1;jamón cocido|120|g|1;queso|120|g|2;aceite de oliva|20|ml|4",
  "Aplana los filetes de lomo, rellena con jamón y queso y enrolla; sujeta con palillos.\nDora con aceite y termina tapado a fuego suave 12–15 minutos, hasta cocinar el centro. Retira los palillos.",
  "",
  "assets/FOTOS/rollos-cinta-lomo-jamon-queso.png",
  "r2"
 ],
 [
  "Lomo de cerdo en salsa de naranja",
  "Carne",
  35,
  "🍊",
  "lomo de cerdo|600|g|1;naranja|3|ud|0;cebolla|150|g|0;aceite de oliva|25|ml|4",
  "Dora los filetes de lomo y reserva. Sofríe la cebolla 8 minutos.\nAñade el zumo de las naranjas, devuelve la carne y cocina 12–15 minutos a fuego suave.",
  "",
  "assets/FOTOS/lomo-salsa-naranja.png",
  "r3"
 ],
 [
  "Filetes rusos de salmón",
  "Pescado",
  25,
  "🐟",
  "salmón|600|g|1;huevo|1|ud|2;pan rallado|60|g|3;cebolla|80|g|0;aceite de oliva|20|ml|4",
  "Retira piel y espinas del salmón y pícalo. Mezcla con huevo, cebolla muy picada y pan rallado.\nForma ocho filetes pequeños. Cocina en sartén con aceite 4–5 minutos por cada lado, hasta que el interior esté hecho.",
  "",
  "assets/FOTOS/filetes-rusos-salmon.png",
  "r4"
 ],
 [
  "Coliflor con bechamel",
  "Verdura",
  40,
  "🥦",
  "coliflor|1000|g|0;leche|500|ml|2;harina|40|g|3;mantequilla|40|g|2;queso|80|g|2",
  "Cuece la coliflor en ramilletes 12–15 minutos y escurre.\nFunde la mantequilla, rehoga la harina un minuto y añade la leche poco a poco removiendo. Cocina hasta espesar.\nCubre la coliflor con bechamel y queso. Gratina hasta dorar.",
  "",
  "assets/FOTOS/coliflor-bechamel.png",
  "r5"
 ],
 [
  "Guiso de garbanzos con arroz y patata",
  "Legumbres",
  35,
  "🫘",
  "garbanzos cocidos|600|g|4;arroz|160|g|3;patata|400|g|0;zanahoria|200|g|0;cebolla|150|g|0;aceite de oliva|25|ml|4;agua|1000|ml|4",
  "Sofríe cebolla y zanahoria picadas con el aceite.\nAñade patata en dados y agua. Cuece 10 minutos, incorpora arroz y cocina 18 minutos más.\nAñade los garbanzos escurridos en los últimos 5 minutos.",
  "",
  "assets/FOTOS/guiso-garbanzos-arroz-patatas.png",
  "r6"
 ],
 [
  "Espaguetis con carbonara vegetariana champiñones",
  "Pasta",
  25,
  "🍝",
  "espaguetis|320|g|3;champiñón|300|g|0;huevo|3|ud|2;queso|80|g|2;aceite de oliva|20|ml|4",
  "Cuece los espaguetis y reserva un vaso de agua de cocción. Saltea el champiñón con aceite.\nBate los huevos con queso. Mezcla la pasta y los champiñones con el huevo a fuego suave, removiendo y añadiendo agua de cocción hasta obtener una salsa cremosa y el huevo cocinado.",
  "",
  "assets/FOTOS/espaguetis-carbonara-vegetariana-champiñones.png",
  "r7"
 ],
 [
  "Lasaña boloñesa",
  "Carne",
  60,
  "🍝",
  "placas de lasaña|250|g|3;carne picada|500|g|1;tomate triturado|500|g|4;zanahoria|150|g|0;cebolla|150|g|0;leche|500|ml|2;harina|40|g|3;mantequilla|40|g|2;queso|100|g|2;aceite de oliva|20|ml|4",
  "Sofríe cebolla y zanahoria, añade la carne y dórala. Incorpora tomate y cocina 20 minutos.\nHaz bechamel con mantequilla, harina y leche. Prepara las placas según su envase.\nAlterna capas de pasta, boloñesa y bechamel. Cubre de queso y hornea a 180 °C unos 25–30 minutos.",
  "",
  "assets/FOTOS/lasana-bolonesa.jpeg",
  "r8"
 ],
 [
  "Albóndigas de merluza con patatas",
  "Pescado",
  40,
  "🐟",
  "merluza|600|g|1;patata|600|g|0;huevo|1|ud|2;pan rallado|50|g|3;cebolla|150|g|0;aceite de oliva|25|ml|4;agua|700|ml|4",
  "Pica la merluza sin espinas, mezcla con huevo y pan rallado y forma albóndigas.\nSofríe cebolla, añade patata en dados y agua; cocina 15 minutos.\nIncorpora las albóndigas y cuece suavemente otros 10–12 minutos hasta cocinar su interior.",
  "",
  "assets/FOTOS/albondigas-merluza-patatas-taco.jpeg",
  "r9"
 ],
 [
  "Fajitas de pollo",
  "Carne",
  25,
  "🌮",
  "pollo|600|g|1;pimiento|400|g|0;cebolla|150|g|0;tortillas de trigo|8|ud|3;aceite de oliva|25|ml|4",
  "Corta el pollo y las verduras en tiras. Saltea las verduras con el aceite durante 8 minutos.\nAñade el pollo y cocina hasta que quede completamente hecho. Sirve en las tortillas calientes.",
  "",
  "assets/FOTOS/fajitas-pollo-pimientos.png",
  "r10"
 ],
 [
  "Sándwich de huevo cocido, pavo, lechuga y queso",
  "Huevos",
  20,
  "🥪",
  "pan de molde|8|ud|3;huevo|4|ud|2;pavo cocido|160|g|1;lechuga|120|g|0;queso|100|g|2",
  "Cuece los huevos 10 minutos desde que hierve el agua, enfría, pela y corta.\nLava y seca la lechuga. Monta los sándwiches con huevo, pavo, lechuga y queso.",
  "",
  "assets/FOTOS/sandwich-huevo-cocido-pavo-queso-lechuga.png",
  "r11"
 ],
 [
  "Tortilla francesa rellena",
  "Huevos",
  20,
  "🍳",
  "huevo|8|ud|2;espinaca|200|g|0;queso|100|g|2;aceite de oliva|20|ml|4",
  "Saltea las espinacas con la mitad del aceite.\nPrepara cuatro tortillas de dos huevos, rellena con espinacas y queso y dobla. Termina de cuajar el huevo.",
  "",
  "assets/FOTOS/tortilla-francesa-rellena-pavo-queso.png",
  "r12"
 ],
 [
  "Huevos rotos con patata y pulpo",
  "Pescado",
  40,
  "🐙",
  "huevo|4|ud|2;patata|800|g|0;pulpo cocido|400|g|1;aceite de oliva|40|ml|4",
  "Corta las patatas en rodajas, mezcla con parte del aceite y hornea a 200 °C durante 30–35 minutos.\nCalienta el pulpo en rodajas. Cocina los huevos en sartén con el aceite restante. Sirve todo junto y rompe los huevos.",
  "",
  "assets/FOTOS/huevos-rotos-patata-pulpo.png",
  "r13"
 ],
 [
  "Crema de merluza y zanahoria",
  "Pescado",
  30,
  "🥣",
  "merluza|500|g|1;zanahoria|600|g|0;patata|200|g|0;cebolla|100|g|0;aceite de oliva|20|ml|4;agua|900|ml|4",
  "Sofríe la cebolla con aceite, añade zanahoria y patata troceadas y agua. Cuece 20 minutos.\nAñade la merluza sin espinas y cocina 8 minutos más. Tritura hasta obtener una crema.",
  "",
  "assets/FOTOS/crema-merluza-nanahoria.png",
  "r14"
 ],
 [
  "Bagels de queso y tomate",
  "Huevos",
  15,
  "🥯",
  "bagel|4|ud|3;queso fresco|200|g|2;tomate|300|g|0;huevo|4|ud|2;aceite de oliva|15|ml|4",
  "Abre y tuesta los bagels. Lava y corta el tomate.\nPrepara huevos revueltos con el aceite hasta que cuajen. Rellena los bagels con queso fresco, tomate y huevo.",
  "",
  "assets/FOTOS/bagel-queso-tomate-lechuga.png",
  "r15"
 ],
 [
  "Fingers de merluza",
  "Pescado",
  30,
  "🐟",
  "merluza|600|g|1;huevo|2|ud|2;harina|60|g|3;pan rallado|100|g|3;aceite de oliva|25|ml|4",
  "Corta la merluza sin espinas en tiras. Pasa por harina, huevo batido y pan rallado.\nColoca en una bandeja, pincela con aceite y hornea a 200 °C durante 15–20 minutos, girando a mitad, hasta que el interior esté hecho.",
  "",
  "assets/FOTOS/fingers-merluza.png",
  "r16"
 ],
 [
  "Arroz con langostinos y fumet",
  "Pescado",
  35,
  "🍤",
  "arroz|320|g|3;langostino pelado|400|g|1;fumet|1000|ml|4;tomate triturado|150|g|4;cebolla|100|g|0;aceite de oliva|25|ml|4",
  "Sofríe cebolla y tomate con aceite. Añade el arroz y rehoga un minuto.\nVierte el fumet caliente y cocina 16–18 minutos. Incorpora los langostinos en los últimos 5 minutos y termina la cocción. Deja reposar 3 minutos.",
  "arroz",
  "assets/FOTOS/arroz-langostinos-fumet.png",
  "r17"
 ],
 [
  "Calabacines rellenos",
  "Verdura",
  45,
  "🥒",
  "calabacín|1000|g|0;garbanzos cocidos|400|g|4;tomate triturado|250|g|4;cebolla|150|g|0;queso|100|g|2;aceite de oliva|25|ml|4",
  "Parte los calabacines a lo largo y hornea 20 minutos a 190 °C. Retira parte de la pulpa.\nSofríe cebolla y pulpa con aceite; añade tomate y garbanzos y cocina 10 minutos.\nRellena los calabacines, cubre con queso y gratina.",
  "calabacin",
  "assets/FOTOS/calabacines-rellenos.jpeg",
  "r18"
 ],
 [
  "Sopa de pollo, puerro y zanahorias",
  "Carne",
  40,
  "🥣",
  "pollo|400|g|1;puerro|250|g|0;zanahoria|300|g|0;fideos|100|g|3;agua|1500|ml|4;aceite de oliva|20|ml|4",
  "Sofríe puerro y zanahoria con el aceite. Añade pollo y agua y cuece 25 minutos.\nDesmenuza el pollo cocinado y devuelve a la olla. Incorpora los fideos y cuece el tiempo indicado en su envase.",
  "sopa",
  "assets/FOTOS/sopa-pollo-puerro-zanahorias.png",
  "r19"
 ],
 [
  "Milanesa de lomo con puré de patatas",
  "Carne",
  40,
  "🍖",
  "patata|800|g|0;lomo de cerdo|600|g|1;leche|200|ml|2;mantequilla|25|g|2;huevo|2|ud|2;pan rallado|120|g|3;aceite de oliva|40|ml|4",
  "Cuece las patatas peladas 20 minutos, escurre y machaca con leche y mantequilla.\nPasa el lomo por huevo y pan rallado. Cocina en sartén con aceite por ambos lados hasta que el interior quede hecho. Sirve con el puré.",
  "pure",
  "assets/FOTOS/lomo-milanesa-pure-patatas.png",
  "r20"
 ],
 [
  "Carrilleras al vino con ñoquis",
  "Carne",
  120,
  "🍲",
  "carrillera de cerdo|800|g|1;ñoquis|500|g|3;cebolla|200|g|0;zanahoria|200|g|0;vino tinto|200|ml|4;agua|500|ml|4;aceite de oliva|30|ml|4",
  "Dora las carrilleras con el aceite y reserva. Sofríe cebolla y zanahoria.\nAñade el vino, cocina 5 minutos e incorpora carne y agua. Guisa tapado 90–110 minutos hasta ablandar.\nCuece los ñoquis según el envase y sirve con la salsa. El vino puede sustituirse por caldo; la cocción no garantiza eliminar todo el alcohol.",
  "",
  "assets/FOTOS/carrilleras-vino-noquis.png",
  "r21"
 ],
 [
  "Perritos de carne picada aplastada",
  "Carne",
  25,
  "🌭",
  "pan de perrito|4|ud|3;carne picada|500|g|1;tomate|200|g|0;lechuga|100|g|0;queso|80|g|2;aceite de oliva|15|ml|4",
  "Forma cuatro porciones alargadas de carne y aplánalas sobre la sartén caliente con aceite.\nCocina por ambos lados hasta hacer el centro. Abre los panes y rellena con carne, queso, tomate y lechuga lavada.",
  "perrito",
  "assets/FOTOS/perritos-carne-picada-aplastada.png",
  "r22"
 ],
 [
  "Merluza con patatas paja",
  "Pescado",
  35,
  "🐟",
  "merluza|600|g|1;patata|600|g|0;cebolla|150|g|0;aceite de oliva|40|ml|4",
  "Corta las patatas en tiras finas, sécalas y mézclalas con la mitad del aceite. Hornea a 200 °C 20–25 minutos, vigilando el dorado.\nPocha la cebolla con el aceite restante, añade la merluza sin espinas y cocina tapada 8–10 minutos hasta que esté hecha. Sirve con las patatas.",
  "merluza",
  "assets/FOTOS/merluza-patatas-paja.png",
  "r23"
 ],
 [
  "Pollo empanado con patatas fritas",
  "Carne",
  45,
  "🍗",
  "pechuga de pollo|650|g|1;patata|900|g|0;huevo|2|ud|2;harina|70|g|3;pan rallado|130|g|3;aceite de oliva|350|ml|4",
  "Pela las patatas, córtalas en bastones y sécalas bien. Fríelas en tandas hasta que estén doradas y escurre sobre papel de cocina.\nAplana ligeramente los filetes de pollo. Pásalos por harina, huevo batido y pan rallado.\nFríe el pollo en aceite caliente, por ambos lados, hasta que esté completamente cocinado por dentro. Sirve con las patatas recién hechas.",
  "",
  "assets/FOTOS/pollo-empanado-con-patatas-fritas.jpg",
  "r24"
 ],
 [
  "Arroz con secreto ibérico y champiñones",
  "Carne",
  45,
  "🥘",
  "arroz|340|g|3;secreto ibérico|550|g|1;champiñón|250|g|0;pimiento rojo|150|g|0;pimiento verde|150|g|0;cebolla|120|g|0;tomate triturado|150|g|4;caldo de carne|950|ml|4;aceite de oliva|30|ml|4",
  "Corta el secreto ibérico en trozos y dóralos en una sartén amplia o paellera con el aceite. Retira y reserva.\nSofríe cebolla y pimientos picados. Añade los champiñones laminados y el tomate; cocina unos minutos.\nIncorpora el arroz, rehoga un minuto y agrega el caldo caliente y la carne. Cocina entre 17 y 20 minutos, según el arroz, y deja reposar unos minutos antes de servir.",
  "",
  "assets/FOTOS/arroz-secreto-iberico-champinones.jpg",
  "r25"
 ],
 [
  "Hamburguesa de ternera con queso, lechuga y bacon",
  "Carne",
  25,
  "🍔",
  "carne picada de ternera|600|g|1;pan de hamburguesa|4|ud|3;queso en lonchas|120|g|2;bacon|160|g|1;lechuga|120|g|0;tomate|200|g|0;aceite de oliva|15|ml|4",
  "Forma cuatro hamburguesas con la carne picada. Lava la lechuga y corta el tomate en rodajas.\nDora el bacon en una sartén hasta que quede a tu gusto y reserva. Cocina las hamburguesas por ambos lados hasta que estén completamente hechas; pon el queso encima al final para fundirlo.\nAbre y tuesta ligeramente los panes. Monta las hamburguesas con lechuga, tomate, carne, queso y bacon.",
  "",
  "assets/FOTOS/hamburguesa-ternera-queso-lechuga-bacon.jpg",
  "r26"
 ],
 [
  "Merluza con patatas panadera y pimientos",
  "Pescado",
  45,
  "🐟",
  "merluza|700|g|1;patata|800|g|0;pimiento rojo|200|g|0;pimiento verde|200|g|0;cebolla|200|g|0;aceite de oliva|40|ml|4",
  "Precalienta el horno a 190 °C. Pela y corta las patatas en rodajas finas; corta la cebolla y los pimientos en tiras.\nExtiende las verduras en una fuente, añade aceite y hornea unos 25–30 minutos, hasta que empiecen a estar tiernas.\nColoca la merluza sin espinas sobre las patatas y hornea otros 10–15 minutos, según el grosor, hasta que el pescado esté hecho. Sirve todo junto.",
  "",
  "assets/FOTOS/merluza-patatas-panadera-pimientos.jpg",
  "r27"
 ],
 [
  "Patatas machaconas con panceta",
  "Verdura",
  45,
  "🥔",
  "patata|1000|g|0;panceta de cerdo|300|g|1;ajo|4|ud|0;pimentón dulce|12|g|4;aceite de oliva|35|ml|4",
  "Pela y trocea las patatas. Cuécelas en agua con sal durante unos 20–25 minutos, hasta que estén blandas; escúrrelas y machácalas con un tenedor.\nCorta la panceta en dados y dórala en una sartén hasta que suelte grasa y quede crujiente. Reserva parte para decorar.\nDora ligeramente los ajos en el aceite, retira la sartén del fuego y añade el pimentón para que no se queme. Mezcla este aceite con las patatas, incorpora parte de la panceta y sirve con el resto por encima.",
  "",
  "assets/FOTOS/patatas-machaconas-panceta.jpg",
  "r28"
 ],
 [
  "Rigatoni al forno con chorizo y champiñones",
  "Pasta",
  45,
  "🍝",
  "rigatoni|360|g|3;chorizo|200|g|1;champiñón|300|g|0;tomate triturado|400|g|4;cebolla|150|g|0;queso mozzarella|200|g|2;aceite de oliva|20|ml|4",
  "Cuece los rigatoni en agua con sal uno o dos minutos menos de lo indicado en el paquete y escurre.\nSofríe la cebolla con el aceite; añade el chorizo en rodajas y los champiñones laminados. Incorpora el tomate y cocina unos 10 minutos.\nMezcla la pasta con la salsa, pasa a una fuente de horno y cubre con mozzarella. Hornea a 200 °C durante 10–15 minutos, hasta que el queso se funda y se gratine.",
  "",
  "assets/FOTOS/rigatoni-al-forno-chorizo-champinones.jpg",
  "r29"
 ],
 [
  "Croquetas de pollo",
  "Carne",
  70,
  "🍗",
  "pollo cocido|350|g|1;leche|800|ml|2;harina|110|g|3;mantequilla|70|g|2;cebolla|120|g|0;huevo|2|ud|2;pan rallado|180|g|3;aceite de oliva|400|ml|4",
  "Pica finamente el pollo cocido y la cebolla. Sofríe la cebolla con la mantequilla y añade la harina; remueve unos dos minutos.\nVierte la leche poco a poco sin dejar de remover hasta obtener una bechamel muy espesa. Incorpora el pollo y cocina unos minutos más.\nExtiende la masa en una fuente, cubre a piel y enfría en la nevera al menos 4 horas (este reposo no está incluido en el tiempo estimado).\nForma las croquetas, pásalas por huevo batido y pan rallado y fríelas por tandas en aceite caliente hasta que estén doradas. Escurre antes de servir.",
  "",
  "assets/FOTOS/croquetas-pollo.jpg",
  "r30"
 ],
 [
  "Arroz a banda",
  "Pescado",
  45,
  "🥘",
  "arroz|360|g|3;gamba pelada|300|g|1;calamar|300|g|1;pescado blanco|250|g|1;fumet|1050|ml|4;tomate triturado|150|g|4;ajo|2|ud|0;pimentón dulce|5|g|4;aceite de oliva|30|ml|4",
  "Trocea el calamar y el pescado, comprobando que no queden espinas. Sofríe el ajo picado con el aceite, incorpora el calamar y dóralo ligeramente.\nAñade el tomate; cocina unos minutos. Agrega el pimentón fuera del fuego y después el arroz, removiendo brevemente.\nVierte el fumet caliente y cocina 17–20 minutos, según el tipo de arroz. Añade el pescado y las gambas durante los últimos 5–7 minutos, hasta que estén cocinados. Deja reposar unos minutos antes de servir.",
  "",
  "assets/FOTOS/arroz-a-banda.jpg",
  "r31"
 ],
 [
  "Galletas tipo cookies con chocolate",
  "Postres",
  35,
  "🍪",
  "harina de trigo|250|g|3;mantequilla|125|g|2;azúcar moreno|110|g|4;azúcar|60|g|4;huevo|1|ud|2;chocolate negro|140|g|4;levadura química|5|g|4",
  "Precalienta el horno a 180 °C. Bate la mantequilla a temperatura ambiente con los dos azúcares y añade el huevo.\nIncorpora la harina y la levadura; mezcla hasta lograr una masa uniforme. Añade el chocolate troceado.\nForma bolas pequeñas, aplástalas ligeramente sobre papel de horno dejando espacio entre ellas y hornea 10–13 minutos, hasta que los bordes se doren. Deja enfriar antes de retirar las galletas.",
  "",
  "assets/FOTOS/galletas-cookies.jpeg",
  "r32"
 ],
 [
  "Guisantes con huevo cocido y tomate",
  "Verdura",
  25,
  "🫛",
  "guisantes|600|g|0;huevo|4|ud|2;tomate|350|g|0;cebolla morada|150|g|0;mezcla de lechugas|100|g|0;limón|1|ud|0;aceite de oliva|25|ml|4;laurel|1|ud|4",
  "Cuece los huevos durante 10–11 minutos, enfría y pela. Cocina los guisantes hasta que estén tiernos y escurre.\nCorta el tomate en gajos y la cebolla morada en rodajas finas. Lava y escurre la lechuga.\nSirve los guisantes con lechuga, tomate, cebolla y huevos cortados en cuartos. Aliña con aceite, limón y sal al gusto.",
  "",
  "assets/FOTOS/guisantes-huevo-cocido-tomate.jpeg",
  "r33"
 ],
 [
  "Hornazo salmantino",
  "Otros",
  125,
  "🥟",
  "harina de trigo|500|g|3;agua|190|ml|4;aceite de oliva|75|ml|4;levadura fresca|15|g|3;huevo|2|ud|2;lomo de cerdo|300|g|1;chorizo|180|g|1;jamón serrano|120|g|1",
  "Mezcla harina, agua templada, aceite, levadura fresca y un huevo. Amasa hasta obtener una masa elástica. Deja reposar tapada alrededor de una hora, hasta que aumente de volumen.\nDivide la masa en dos y estira ambas partes. Coloca una como base sobre una bandeja y reparte el lomo previamente cocinado, el chorizo y el jamón sin llegar a los bordes.\nCubre con la otra capa de masa, sella el contorno y pincela con el otro huevo batido. Haz un pequeño orificio para el vapor y hornea a 190 °C unos 35–45 minutos, hasta dorar y cocinar completamente el relleno.",
  "",
  "assets/FOTOS/hornazo.jpeg",
  "r34"
 ],
 [
  "Lomo de cerdo en salsa",
  "Carne",
  40,
  "🍖",
  "lomo de cerdo|650|g|1;cebolla|200|g|0;ajo|3|ud|0;caldo de carne|350|ml|4;vino blanco|100|ml|4;harina de trigo|15|g|3;aceite de oliva|30|ml|4",
  "Corta el lomo en medallones y dóralos brevemente en una sartén con aceite. Retira y reserva.\nPocha la cebolla y el ajo picados en la misma sartén. Añade la harina, remueve y vierte el vino y el caldo poco a poco, hasta obtener una salsa ligada.\nDevuelve el lomo a la sartén y cocina a fuego suave 12–15 minutos o hasta que esté hecho. Puedes triturar la salsa antes de incorporar la carne. Si prefieres evitar el alcohol, sustituye el vino por caldo.",
  "",
  "assets/FOTOS/lomo-salsa.jpeg",
  "r35"
 ],
 [
  "Aguacates rellenos de salmón y queso fresco",
  "Pescado",
  20,
  "🥑",
  "aguacate|2|ud|0;salmón ahumado|180|g|1;queso fresco|180|g|2;tomate|200|g|0;limón|1|ud|0;aceite de oliva|15|ml|4;lechuga|80|g|0",
  "Parte los aguacates, retira el hueso y extrae con cuidado parte de la pulpa, reservando las mitades de piel.\nCorta la pulpa, el salmón ahumado, el queso fresco y el tomate en dados. Mezcla con el zumo de limón y el aceite.\nRellena las mitades de aguacate y sírvelas sobre unas hojas de lechuga lavadas.",
  "",
  "assets/FOTOS/aguacate-relleno-salmon-queso-fresco.jpeg",
  "r36"
 ],
 [
  "Alubias blancas con chorizo",
  "Legumbres",
  40,
  "🫘",
  "alubias blancas cocidas|800|g|4;chorizo|220|g|1;cebolla|150|g|0;ajo|2|ud|0;tomate triturado|150|g|4;pimentón dulce|6|g|4;caldo de verduras|550|ml|4;aceite de oliva|20|ml|4",
  "Sofríe la cebolla y el ajo picados con aceite. Añade el chorizo en rodajas y rehoga un par de minutos.\nIncorpora el tomate y deja reducir 5 minutos. Retira brevemente del fuego y agrega el pimentón para evitar que se queme.\nAñade las alubias escurridas y el caldo. Cocina a fuego suave 15–20 minutos para integrar los sabores. Ajusta de sal y sirve caliente.",
  "",
  "assets/FOTOS/alubias-chorizo.jpeg",
  "r37"
 ],
 [
  "Arroz a la zamorana",
  "Carne",
  60,
  "🥘",
  "arroz|360|g|3;magro de cerdo|300|g|1;panceta de cerdo|180|g|1;chorizo|150|g|1;cebolla|180|g|0;ajo|2|ud|0;tomate triturado|150|g|4;pimentón dulce|7|g|4;caldo de carne|1150|ml|4;aceite de oliva|25|ml|4",
  "Trocea el magro, la panceta y el chorizo. Dora el cerdo en una paellera con el aceite. Añade la cebolla y el ajo picados y sofríe hasta ablandar.\nIncorpora el chorizo y el tomate y cocina unos minutos. Agrega el pimentón fuera del fuego.\nVierte parte del caldo caliente y guisa hasta que el cerdo esté tierno, aproximadamente 20 minutos; completa con caldo caliente hasta la cantidad indicada. Añade el arroz y cuece 17–20 minutos, hasta alcanzar el punto deseado. Deja reposar unos minutos. Es una versión doméstica simplificada del arroz a la zamorana.",
  "",
  "assets/FOTOS/arroz-zamorana.jpeg",
  "r38"
 ],
 [
  "Bizcocho marmolado",
  "Postres",
  65,
  "🍰",
  "harina de trigo|250|g|3;azúcar|180|g|4;huevo|4|ud|2;mantequilla|150|g|2;leche|120|ml|2;cacao puro en polvo|30|g|4;levadura química|12|g|4",
  "Precalienta el horno a 175 °C y engrasa un molde. Bate la mantequilla ablandada con el azúcar; incorpora los huevos uno a uno.\nAñade la harina mezclada con la levadura y la leche. Separa un tercio de la masa e incorpora el cacao.\nVierte ambas masas alternándolas en el molde y remueve suavemente con un palillo para dibujar vetas. Hornea 35–45 minutos, hasta que al pinchar salga limpio. Enfría antes de cortar.",
  "",
  "assets/FOTOS/bizcocho-marmolado.jpeg",
  "r39"
 ],
 [
  "Bizcocho de naranja",
  "Postres",
  60,
  "🍊",
  "naranja|2|ud|0;harina de trigo|250|g|3;azúcar|170|g|4;huevo|3|ud|2;aceite de girasol|100|ml|4;yogur natural|125|g|2;levadura química|12|g|4;azúcar glas|30|g|4",
  "Precalienta el horno a 175 °C y engrasa un molde de corona. Lava una naranja y ralla su piel evitando la parte blanca. Exprime el zumo de las dos.\nBate los huevos con el azúcar; incorpora yogur, aceite, ralladura y 100 ml de zumo. Añade la harina tamizada con la levadura.\nVierte en el molde y hornea 35–45 minutos, hasta que esté cocido. Deja templar, desmolda y espolvorea con azúcar glas.",
  "",
  "assets/FOTOS/bizcocho-naranja.jpeg",
  "r40"
 ],
 [
  "Brazo de gitano de chocolate",
  "Postres",
  65,
  "🍫",
  "huevo|4|ud|2;azúcar|120|g|4;harina de trigo|110|g|3;levadura química|5|g|4;nata para montar|300|ml|2;chocolate negro|180|g|4;azúcar glas|40|g|4",
  "Precalienta el horno a 180 °C. Bate los huevos con el azúcar hasta que espumen y agrega la harina tamizada con la levadura. Extiende la mezcla sobre una bandeja cubierta con papel de horno.\nHornea 10–12 minutos. Al sacarla, enrolla la plancha templada con ayuda del papel y deja enfriar.\nFunde 120 g de chocolate y deja entibiar. Monta la nata y mézclala suavemente con el chocolate. Desenrolla el bizcocho, rellena y vuelve a enrollar. Enfría al menos una hora. Decora con azúcar glas y los 60 g de chocolate restantes fundidos.",
  "",
  "assets/FOTOS/brazo-gitano.jpeg",
  "r41"
 ],
 [
  "Calabacines rellenos de jamón y queso",
  "Verdura",
  50,
  "🥒",
  "calabacín|1000|g|0;jamón serrano|130|g|1;cebolla|150|g|0;queso rallado|150|g|2;leche|300|ml|2;harina de trigo|25|g|3;mantequilla|25|g|2;aceite de oliva|20|ml|4",
  "Corta los calabacines a lo largo, vacía parte de la pulpa y hornea las mitades 15–20 minutos a 190 °C.\nSofríe la cebolla y la pulpa picadas con aceite; incorpora el jamón en trocitos. Prepara una bechamel espesa con mantequilla, harina y leche y mézclala con el sofrito.\nRellena los calabacines, cubre con queso rallado y gratina 10–15 minutos, hasta que el queso se dore y el calabacín quede tierno.",
  "",
  "assets/FOTOS/calabacines-rellenos.jpeg",
  "r42"
 ],
 [
  "Chipirones rellenos",
  "Pescado",
  65,
  "🦑",
  "chipirones limpios|900|g|1;gamba pelada|200|g|1;cebolla|180|g|0;ajo|2|ud|0;pan rallado|60|g|3;tomate triturado|200|g|4;caldo de pescado|300|ml|4;aceite de oliva|30|ml|4",
  "Separa y pica finamente los tentáculos de los chipirones. Sofríe media cebolla y el ajo con parte del aceite; añade los tentáculos y las gambas picadas y cocina hasta que estén hechos. Mezcla con pan rallado para ligar el relleno.\nRellena los cuerpos sin apretar demasiado y ciérralos con palillos. Dóralos brevemente en una cazuela con aceite y reserva.\nSofríe la cebolla restante, incorpora el tomate y el caldo y cocina 5 minutos. Añade los chipirones y guisa tapados a fuego suave 20–25 minutos, hasta que estén tiernos. Retira los palillos antes de servir.",
  "",
  "assets/FOTOS/chipirones-rellenos.jpeg",
  "r43"
 ],
 [
  "Ensalada de huevo, tomate, zanahoria y aceitunas negras",
  "Verdura",
  20,
  "🥗",
  "lechuga|300|g|0;tomate|400|g|0;zanahoria|250|g|0;huevo|4|ud|2;aceitunas negras|100|g|4;maíz dulce|140|g|4;cebolla|100|g|0;aceite de oliva|35|ml|4;vinagre|15|ml|4",
  "Cuece los huevos durante 10–11 minutos, enfría, pela y corta en cuartos. Lava bien la lechuga y los tomates.\nRalla la zanahoria, corta la cebolla en aros y parte los tomates en gajos. Escurre el maíz y las aceitunas.\nColoca todos los ingredientes en una ensaladera y aliña justo antes de servir con aceite, vinagre y sal al gusto.",
  "",
  "assets/FOTOS/ensalada-huevo-tomate-zanahoria-aceitunas-negras.jpeg",
  "r44"
 ],
 [
  "Flan de huevo casero",
  "Postres",
  70,
  "🍮",
  "huevo|4|ud|2;leche|500|ml|2;azúcar|160|g|4;agua|30|ml|4;nata para montar|150|ml|2;fideos de colores|15|g|4",
  "Precalienta el horno a 170 °C. Prepara un caramelo con 70 g de azúcar y el agua; repártelo en el fondo de un molde de flan.\nBate los huevos con el azúcar restante y mezcla con la leche sin incorporar demasiado aire. Vierte en el molde sobre el caramelo.\nCocina al baño María en el horno 45–55 minutos o hasta que el centro esté cuajado. Deja enfriar y refrigera al menos 4 horas antes de desmoldar. Decora opcionalmente con nata montada y fideos de colores.",
  "",
  "assets/FOTOS/flan-huevo.jpeg",
  "r45"
 ],
 [
  "Parrillada de marisco, pulpo y sepia",
  "Pescado",
  40,
  "🦐",
  "langostinos|650|g|1;pulpo cocido|500|g|1;sepia limpia|500|g|1;patata|500|g|0;ajo|4|ud|0;perejil|15|g|0;limón|2|ud|0;aceite de oliva|50|ml|4",
  "Cuece las patatas con piel unos 20 minutos, enfría un poco y corta en rodajas. Limpia y seca la sepia; corta el pulpo cocido en rodajas grandes.\nPrepara un majado con ajo, perejil, aceite y un poco de zumo de limón. Dora la sepia en una plancha caliente, y cocina los langostinos enteros por ambos lados hasta que estén hechos. Marca también el pulpo cocido.\nSirve los mariscos sobre las patatas, riega con el majado y acompaña con limón.",
  "",
  "assets/FOTOS/parillada-marisco.jpeg",
  "r46"
 ],
 [
  "Patatas a la importancia en salsa",
  "Verdura",
  55,
  "🥔",
  "patata|850|g|0;huevo|2|ud|2;harina de trigo|90|g|3;cebolla|170|g|0;ajo|3|ud|0;caldo de verduras|650|ml|4;laurel|2|ud|4;aceite de oliva|150|ml|4;perejil|10|g|0",
  "Pela las patatas y córtalas en rodajas de 1 cm. Sálalas ligeramente, pásalas por harina y luego por huevo batido. Fríelas hasta que se doren por fuera y escúrrelas.\nPocha la cebolla y el ajo picados en una cazuela con un poco del aceite de fritura. Añade el caldo, el laurel y las patatas rebozadas.\nCuece a fuego suave 15–20 minutos, sin remover bruscamente, hasta que las patatas estén tiernas y la salsa ligada. Espolvorea con perejil. La fotografía muestra patatas rebozadas en salsa, más propias de esta preparación que de las patatas a lo pobre tradicionales.",
  "",
  "assets/FOTOS/patatas-pobre.jpeg",
  "r47"
 ],
 [
  "Pizza de bacon, pollo y queso",
  "Otros",
  40,
  "🍕",
  "base de pizza|2|ud|3;pechuga de pollo|250|g|1;bacon|160|g|1;tomate frito|180|g|4;queso mozzarella rallado|230|g|2;orégano|4|g|4;aceite de oliva|15|ml|4",
  "Precalienta el horno a 220 °C. Corta el pollo en tiras y saltéalo con aceite hasta que esté completamente cocinado. Dora ligeramente el bacon y reserva.\nExtiende las bases de pizza, reparte el tomate, el pollo, el bacon y el queso. Espolvorea con orégano.\nHornea 12–18 minutos, según el grosor de la masa, hasta que los bordes estén dorados y el queso se funda.",
  "",
  "assets/FOTOS/pizza-bacon-queso-pollotiras.jpeg",
  "r48"
 ],
 [
  "Pizza de calabacín y tomate con mozzarella",
  "Otros",
  35,
  "🍕",
  "base de pizza|2|ud|3;calabacín|350|g|0;tomate|350|g|0;jamón cocido|130|g|1;queso mozzarella|220|g|2;tomate triturado|150|g|4;aceite de oliva|20|ml|4;orégano|4|g|4",
  "Precalienta el horno a 220 °C. Lava el calabacín y los tomates y córtalos en rodajas finas.\nColoca las bases sobre papel de horno. Extiende una capa fina de tomate triturado y añade jamón cocido, rodajas de calabacín y tomate, y mozzarella. Riega ligeramente con aceite y espolvorea con orégano.\nHornea 12–18 minutos hasta que la masa quede dorada y las verduras cocinadas.",
  "",
  "assets/FOTOS/pizza-calabacin-tomate.jpeg",
  "r49"
 ],
 [
  "Pollo asado con patatas y pimientos",
  "Carne",
  85,
  "🍗",
  "cuartos traseros de pollo|4|ud|1;patata|900|g|0;pimiento verde|350|g|0;cebolla|200|g|0;ajo|4|ud|0;limón|1|ud|0;aceite de oliva|45|ml|4;caldo de pollo|200|ml|4",
  "Precalienta el horno a 190 °C. Corta las patatas en trozos, el pimiento en mitades y la cebolla en gajos. Extiende las verduras en una bandeja con aceite, ajo y parte del caldo.\nColoca los cuartos de pollo salpimentados encima, riega con limón y hornea 60–70 minutos. Da la vuelta al pollo y riega con sus jugos a mitad de la cocción.\nComprueba que el pollo esté bien cocinado en la parte más gruesa (74 °C en el centro), que la piel esté dorada y que las patatas estén tiernas.",
  "",
  "assets/FOTOS/pollo-asado-pimientos-patatas.jpeg",
  "r50"
 ],
 [
  "Crema de limón en vasitos",
  "Postres",
  20,
  "🍋",
  "leche condensada|300|g|2;yogur griego natural|400|g|2;limón|3|ud|0;nata para montar|200|ml|2;azúcar|30|g|4",
  "Lava bien un limón y ralla solo la parte amarilla de la piel. Exprime los tres limones y cuela el zumo.\nMezcla el yogur con la leche condensada y el zumo hasta conseguir una crema uniforme. Monta la nata bien fría con el azúcar y agrégala suavemente a la mezcla.\nReparte en cuatro vasitos, decora con ralladura de limón y enfría al menos 2 horas antes de servir (reposo no incluido en el tiempo).",
  "",
  "assets/FOTOS/postre-limon.jpeg",
  "r51"
 ],
 [
  "Rosquillas caseras fritas",
  "Postres",
  70,
  "🍩",
  "harina de trigo|500|g|3;huevo|3|ud|2;azúcar|150|g|4;leche|110|ml|2;aceite de oliva|50|ml|4;aceite de girasol|600|ml|4;levadura química|15|g|4;limón|1|ud|0",
  "Bate los huevos con el azúcar. Añade la leche, 50 ml de aceite de oliva y la ralladura del limón. Incorpora poco a poco harina y levadura hasta obtener una masa manejable; deja reposar 15 minutos.\nCon las manos ligeramente engrasadas forma pequeñas bolas, abre un agujero central y ensánchalo para dar forma a las rosquillas.\nFríe en tandas en aceite de girasol a temperatura media, girando para dorar de forma homogénea. Escurre sobre papel; deja enfriar antes de servir.",
  "",
  "assets/FOTOS/rosquillas.jpeg",
  "r52"
 ],
 [
  "Salmón al horno con patatas panadera",
  "Pescado",
  50,
  "🐟",
  "salmón fresco|700|g|1;patata|800|g|0;cebolla|220|g|0;limón|1|ud|0;aceite de oliva|35|ml|4;ajo|2|ud|0",
  "Precalienta el horno a 190 °C. Corta las patatas en rodajas finas y la cebolla en juliana. Mezcla con aceite y ajo picado y hornea en una fuente durante 25–30 minutos.\nColoca el salmón sobre las patatas, añade pimienta y un poco de zumo de limón y hornea 10–15 minutos, según el grosor, hasta que el pescado esté hecho.\nSirve el salmón con las patatas y unos gajos de limón.",
  "",
  "assets/FOTOS/salmon-patatas-panadera.jpeg",
  "r53"
 ],
 [
  "Tabla navideña de ibéricos, quesos y huevo hilado",
  "Otros",
  25,
  "🧀",
  "jamón ibérico|180|g|1;lomo embuchado|130|g|1;salchichón|130|g|1;chorizo ibérico|130|g|1;queso curado|220|g|2;huevo hilado|150|g|2;pan tostado|150|g|3",
  "Saca los quesos de la nevera 20–30 minutos antes de servir para que recuperen su aroma.\nCorta los embutidos y los quesos en lonchas finas. Dispón el jamón, el lomo, el salchichón y el chorizo por franjas sobre una bandeja amplia.\nSepara las franjas con huevo hilado, coloca los quesos en un extremo y sirve con pan tostado. No requiere cocción; el tiempo es de preparación y montaje.",
  "",
  "assets/FOTOS/tabla-embutidos-huevo-hilado-navidad.jpeg",
  "r54"
 ],
 [
  "Tabla de embutidos, quesos, uvas y aceitunas",
  "Otros",
  20,
  "🧀",
  "jamón serrano|160|g|1;chorizo|160|g|1;salchichón|150|g|1;pavo cocido|130|g|1;queso semicurado|200|g|2;queso curado|180|g|2;uvas|300|g|0;aceitunas verdes|150|g|4;pan tostado|180|g|3",
  "Corta los quesos en triángulos y los embutidos en lonchas. Lava las uvas y retíralas de los racimos para facilitar el servicio.\nDistribuye el jamón, el chorizo, el salchichón y el pavo en grupos sobre una tabla. Coloca los quesos, las uvas, las aceitunas y las tostadas entre ellos.\nSirve a temperatura fresca. El tiempo indicado corresponde al montaje, no a la elaboración de los productos.",
  "",
  "assets/FOTOS/tabla-embutidos-quesos.jpeg",
  "r55"
 ],
 [
  "Tarta fría de moras y queso",
  "Postres",
  35,
  "🫐",
  "moras|400|g|0;queso crema|400|g|2;galletas tipo digestive|190|g|3;mantequilla|80|g|2;nata para montar|200|ml|2;azúcar|120|g|4;gelatina neutra|10|g|4;agua|70|ml|4",
  "Tritura las galletas, mézclalas con la mantequilla derretida y presiona en la base de un molde desmontable. Refrigera.\nTritura la mitad de las moras y cuela si prefieres eliminar las semillas. Mezcla el queso crema con la nata montada, 80 g de azúcar y el puré de moras. Disuelve 6 g de gelatina previamente hidratada siguiendo las instrucciones del envase e incorpórala. Vierte sobre la base.\nCalienta las moras restantes con 40 g de azúcar y agua, incorpora los 4 g de gelatina restantes hidratados y deja entibiar. Extiende la cobertura y refrigera al menos 4 horas antes de servir.",
  "",
  "assets/FOTOS/tarta-moras.jpeg",
  "r56"
 ],
 [
  "Macedonia de frutas variadas con frutos rojos",
  "Fruta",
  20,
  "🍉",
  "sandía|500|g|0;melón|400|g|0;papaya|250|g|0;uvas|180|g|0;moras|100|g|0;cerezas|120|g|0;menta fresca|8|g|0;limón|1|ud|0",
  "Lava bien las frutas que vayas a consumir con piel. Retira las pepitas de las cerezas y corta sandía, melón y papaya en dados de tamaño parecido.\nMezcla con las uvas y las moras en una ensaladera. Añade un poco de zumo de limón y unas hojas de menta.\nSirve fría en cuencos individuales.",
  "",
  "assets/FOTOS/macedonia-frutas.jpeg",
  "r57"
 ],
 [
  "Macedonia de melón y melocotón con nata",
  "Fruta",
  25,
  "🍈",
  "melón|1|ud|0;melocotón|4|ud|0;naranja|2|ud|0;nata para montar|220|ml|2;azúcar|25|g|4;menta fresca|6|g|0",
  "Parte el melón por la mitad y vacía las semillas. Con una cuchara sacabolas extrae bolitas de su pulpa; reserva las mitades de la corteza como recipientes.\nPela los melocotones, córtalos en trozos o bolas y mézclalos con el melón y unos gajos de naranja. Monta la nata fría con el azúcar.\nRellena las mitades del melón con la fruta, corona con nata montada y decora con menta. Sirve inmediatamente.",
  "",
  "assets/FOTOS/macedonia-melon-melocoton.jpeg",
  "r58"
 ],
 [
  "Macedonia de plátano, kiwi y granada",
  "Fruta",
  15,
  "🥝",
  "plátano|3|ud|0;kiwi|5|ud|0;granada|2|ud|0;manzana|2|ud|0;naranja|2|ud|0;limón|1|ud|0",
  "Pela y trocea los plátanos, los kiwis y las manzanas. Extrae los granos de las granadas y exprime una de las naranjas.\nMezcla la fruta troceada en una ensaladera, añade el zumo de naranja y unas gotas de limón para reducir la oxidación.\nReparte los granos de granada por encima y sirve bien fresca.",
  "",
  "assets/FOTOS/macedonia-platano-kiwi-granada.jpeg",
  "r59"
 ],
 [
  "Mejillones con salsa de tomate casera",
  "Pescado",
  35,
  "🦪",
  "mejillones frescos|1500|g|1;tomate triturado|550|g|4;cebolla|170|g|0;ajo|3|ud|0;aceite de oliva|30|ml|4;vino blanco|100|ml|4;laurel|1|ud|4",
  "Limpia los mejillones y desecha los que tengan la concha rota o permanezcan abiertos tras darles un golpe suave. Cuécelos tapados en una cazuela con poca agua hasta que se abran; desecha los que no se abran.\nSofríe cebolla y ajo picados con aceite. Añade el tomate, el laurel y el vino o la misma cantidad de caldo y cocina 15–20 minutos, hasta espesar. Tritura la salsa si la prefieres fina.\nDispón los mejillones en una fuente y cúbrelos con la salsa caliente.",
  "",
  "assets/FOTOS/mejillones-salsa-tomate.jpeg",
  "r60"
 ],
 [
  "Mousse de limón con coulis de frutos rojos",
  "Postres",
  25,
  "🍋",
  "nata para montar|350|ml|2;leche condensada|230|g|2;limón|3|ud|0;gelatina neutra|5|g|4;frutos rojos|120|g|0;azúcar|30|g|4",
  "Hidrata la gelatina según indique su envase y disuélvela en una pequeña parte del zumo de limón ligeramente templado. Mezcla el resto del zumo con la leche condensada.\nMonta la nata bien fría y combínala suavemente con la mezcla de limón y la gelatina. Reparte en cuatro copas y refrigera al menos 3 horas.\nCuece brevemente los frutos rojos con el azúcar, deja enfriar y vierte un hilo de salsa sobre cada mousse antes de servir.",
  "",
  "assets/FOTOS/mousse-limon.jpeg",
  "r61"
 ],
 [
  "Copa de barquillo con natillas de vainilla y chocolate",
  "Postres",
  45,
  "🍮",
  "barquillos en forma de copa|4|ud|3;leche|500|ml|2;yema de huevo|4|ud|2;azúcar|95|g|4;maicena|35|g|3;chocolate negro|130|g|4;extracto de vainilla|5|ml|4",
  "Calienta la leche con la vainilla sin que llegue a hervir. Bate las yemas con el azúcar y la maicena e incorpora la leche caliente poco a poco.\nDevuelve la mezcla al cazo y cocina removiendo a fuego medio hasta que espese, sin que hierva bruscamente. Enfría la crema cubierta a piel.\nFunde el chocolate y pincela el interior de las copas de barquillo para impermeabilizarlas. Deja solidificar, rellena con la crema fría y decora con virutas de chocolate. Rellena poco antes de servir para conservar el crujiente.",
  "",
  "assets/FOTOS/natillas-copa-barquillo.jpeg",
  "r62"
 ],
 [
  "Paella mixta de pollo y marisco",
  "Pescado",
  55,
  "🥘",
  "arroz|380|g|3;pollo deshuesado|350|g|1;langostinos|350|g|1;calamar|250|g|1;almejas|250|g|1;pimiento rojo|170|g|0;tomate triturado|150|g|4;caldo de pescado|1100|ml|4;aceite de oliva|35|ml|4;azafrán|1|g|4",
  "Lava las almejas en agua fría con sal para facilitar que suelten arena y desecha las dañadas. Trocea el pollo y el calamar. Calienta el aceite en una paellera y dora el pollo hasta que esté bien cocinado. Añade el calamar y el pimiento.\nIncorpora el tomate, sofríe unos minutos y agrega el arroz. Vierte el caldo caliente con azafrán y cocina 15–20 minutos, según la variedad de arroz.\nAñade los langostinos y almejas durante la parte final de la cocción, hasta que estén hechos y las almejas se abran; descarta las que no se abran. Deja reposar 5 minutos antes de servir.",
  "",
  "assets/FOTOS/paella-mixta.jpeg",
  "r63"
 ],
 [
  "Pan casero de hogaza",
  "Otros",
  200,
  "🍞",
  "harina de fuerza|500|g|3;agua|330|ml|4;levadura fresca|10|g|3;sal|10|g|4;aceite de oliva|15|ml|4",
  "Disuelve la levadura en el agua templada. Mezcla con la harina, la sal y el aceite. Amasa 10–15 minutos hasta obtener una masa elástica.\nDeja fermentar tapada en un bol aceitado 60–90 minutos hasta que aumente de volumen. Desgasifica ligeramente, forma una hogaza y deja reposar de nuevo 30–45 minutos.\nCalienta el horno a 230 °C con una bandeja resistente para generar vapor. Haz unos cortes sobre la hogaza, hornea 15 minutos a 230 °C y después 25–30 minutos a 200 °C, hasta dorar. Deja enfriar sobre rejilla antes de cortar.",
  "",
  "assets/FOTOS/pan.jpeg",
  "r64"
 ],
[
  "Batido de fresas",
  "Fruta",
  10,
  "🍓",
  "fresa|600|g|0;leche|500|ml|2;yogur natural|125|g|2",
  "Lava las fresas y retira las hojas. Tritura con la leche y el yogur. Sirve bien frío.",
  "",
  "assets/FOTOS/batido-fresas.jpeg",
  "r65",
  {
    "course": "postre",
    "mealTypes": [
      "comida",
      "cena"
    ],
    "canBeAccompaniment": false,
    "mainFoods": [
      "fresa",
      "leche"
    ],
    "foodGroups": [
      "Fruta",
      "Lácteos"
    ]
  }
],
[
  "Ensalada de boquerones, queso fresco y aceitunas",
  "Verdura",
  15,
  "🥗",
  "boquerones en vinagre|180|g|1;lechuga|250|g|0;tomate|350|g|0;cebolla|130|g|0;zanahoria|150|g|0;queso fresco|180|g|2;maíz dulce|120|g|4;aceitunas verdes|80|g|4;aceitunas negras|80|g|4;aceite de oliva|30|ml|4",
  "Lava y corta la lechuga, el tomate, la cebolla y la zanahoria. Añade el maíz, las aceitunas, el queso fresco y los boquerones en vinagre. Aliña con aceite de oliva.",
  "",
  "assets/FOTOS/ensalada-boquerones.jpeg",
  "r66",
  {
    "course": "primero",
    "mealTypes": [
      "comida",
      "cena"
    ],
    "canBeAccompaniment": false,
    "mainFoods": [
      "boquerones",
      "lechuga",
      "queso fresco"
    ],
    "foodGroups": [
      "Verdura",
      "Pescado",
      "Lácteos"
    ]
  }
],
[
  "Merluza a la plancha con espinacas y tomate",
  "Pescado",
  25,
  "🐟",
  "merluza|700|g|1;espinaca|600|g|0;tomate|400|g|0;ajo|2|ud|0;aceite de oliva|35|ml|4",
  "Saltea las espinacas con el ajo y un poco de aceite. Cocina la merluza a la plancha y sirve con las espinacas y el tomate cortado.",
  "",
  "assets/FOTOS/merluza-espinacas-ensalada-tomate.jpeg",
  "r67",
  {
    "course": "segundo",
    "mealTypes": [
      "comida",
      "cena"
    ],
    "canBeAccompaniment": false,
    "mainFoods": [
      "merluza",
      "espinaca",
      "tomate"
    ],
    "foodGroups": [
      "Pescado",
      "Verdura"
    ]
  }
],
[
  "Natillas caseras",
  "Postres",
  20,
  "🍮",
  "leche|650|ml|2;yema de huevo|4|ud|2;azúcar|100|g|4;maicena|35|g|3;limón|1|ud|0",
  "Calienta la leche con piel de limón. Mezcla las yemas con el azúcar y la maicena. Incorpora la leche y cocina removiendo hasta espesar. Reparte en copas y enfría.",
  "",
  "assets/FOTOS/natillas.jpeg",
  "r68",
  {
    "course": "postre",
    "mealTypes": [
      "comida",
      "cena"
    ],
    "canBeAccompaniment": false,
    "mainFoods": [
      "leche",
      "yema de huevo"
    ],
    "foodGroups": [
      "Lácteos",
      "Huevos"
    ]
  }
],
[
  "Albóndigas de ternera con patatas y ensalada",
  "Carne",
  45,
  "🍲",
  "carne picada de ternera|650|g|1;huevo|1|ud|2;pan rallado|70|g|3;patata|750|g|0;cebolla|150|g|0;caldo de carne|300|ml|4;lechuga|150|g|0;pepino|200|g|0;tomate|250|g|0;aceite de oliva|40|ml|4",
  "Mezcla la carne picada con el huevo y el pan rallado, y forma las albóndigas. Dóralas y guísalas con cebolla y un poco de caldo. Prepara las patatas y sirve con una ensalada de lechuga, pepino y tomate.",
  "",
  "assets/FOTOS/albondigas-ternera-patatas-ensalada.jpeg",
  "r69",
  {
    "course": "segundo",
    "mealTypes": [
      "comida",
      "cena"
    ],
    "canBeAccompaniment": false,
    "mainFoods": [
      "ternera",
      "patata",
      "lechuga"
    ],
    "foodGroups": [
      "Carne",
      "Verdura"
    ]
  }
],
[
  "Arroz con costillas de cerdo",
  "Carne",
  50,
  "🥘",
  "arroz|360|g|3;costilla de cerdo|800|g|1;cebolla|180|g|0;zanahoria|180|g|0;tomate triturado|200|g|4;carne de pimiento choricero|35|g|4;caldo de carne|1100|ml|4;aceite de oliva|35|ml|4",
  "Fríe las costillas en un poco de aceite y reserva. Sofríe en el mismo aceite la cebolla y la zanahoria. Añade el tomate triturado y la carne de pimiento choricero. Incorpora el arroz, las costillas y el caldo de carne y cocina hasta que el arroz esté en su punto.",
  "",
  "assets/FOTOS/arroz-costilla.jpeg",
  "r70",
  {
    "course": "primero",
    "mealTypes": [
      "comida"
    ],
    "canBeAccompaniment": false,
    "mainFoods": [
      "arroz",
      "costilla de cerdo",
      "pimiento choricero"
    ],
    "foodGroups": [
      "Cereales",
      "Carne"
    ]
  }
]
];
const SEED=SEED_RAW.map((r,i)=>({id:r[8],name:r[0],group:r[1],minutes:r[2],emoji:r[3],servings:4,ingredients:r[4].split(';').map(x=>{const [name,qty,unit,aisle]=x.split('|');return {name,qty:+qty,unit,aisle:AISLES[+aisle]}}),steps:r[5].replace(/\\n/g,'\n'),capture:r[6]||'',photo:r[7]||'',source:r[7]?'Fotografía aportada. Elaboración casera orientativa.':i>=17?'Nombre tomado de las capturas. Elaboración casera propuesta.':'Plato del listado. Elaboración casera propuesta.',...(r[9]||{})}));
const CAPTURES={arroz:['captura-arroz.png',351,220,58,107,85,89],calabacin:['captura-platos.png',387,619,76,32,85,57],sopa:['captura-platos.png',387,619,76,196,84,88],pure:['captura-platos.png',387,619,75,470,85,90],perrito:['captura-cenas.png',340,605,59,115,84,126],merluza:['captura-cenas.png',340,605,58,424,84,106]};
