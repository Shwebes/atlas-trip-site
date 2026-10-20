const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav nav');
if(toggle&&nav) toggle.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(isOpen));});
const newsletter=document.querySelector('#newsletter-form');
if(newsletter) newsletter.addEventListener('submit',e=>{e.preventDefault();const msg=document.querySelector('#newsletter-message');if(msg)msg.textContent='Спасибо! Демонстрационная форма работает локально; подключение рассылки можно добавить позже.';newsletter.reset();});
const footer=document.querySelector('.footer');
if(footer&&!document.querySelector('#top100_widget')){const widget=document.createElement('div');widget.id='top100_widget';widget.className='top100-widget';widget.setAttribute('aria-label','Виджет Top100');footer.append(widget);}
if(document.querySelector('#top100_widget')){
 const drawTop100Widget=()=>window.top100Counter?.drawLogoTo('top100_widget');
 if(window.top100Counter)drawTop100Widget();
 else{window._top100q=window._top100q||[];window._top100q.push(drawTop100Widget);}
}
const footerLinks=document.querySelector('.footer div');
if(footerLinks&&!footerLinks.querySelector('a[href="photo-credits.html"]')){const link=document.createElement('a');link.href='photo-credits.html';link.textContent='Авторы фото';footerLinks.append(link);}
// Удобные метки для учебной веб-аналитики: события можно связать со счётчиком после его установки.
document.querySelectorAll('a[href]').forEach(link=>link.addEventListener('click',()=>{const label=link.textContent.trim().replace(/\s+/g,' ').slice(0,80);window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'atlas_link_click',link_text:label,link_url:link.getAttribute('href')});}));
const countries={
 japan:{name:'Япония',flag:'🇯🇵',subtitle:'Традиции в ритме будущего',description:'От тихих садов Киото до неоновых улиц Токио — страна, где каждая деталь становится открытием.',season:'Март — май',style:'Культура · Гастрономия',href:'destinations.html#japan'},
 italy:{name:'Италия',flag:'🇮🇹',subtitle:'Искусство жить красиво',description:'Архитектура, маленькие площади, выразительная кухня и побережья, где хочется задержаться подольше.',season:'Апрель — июнь',style:'Искусство · Еда',href:'destinations.html#italy'},
 iceland:{name:'Исландия',flag:'🇮🇸',subtitle:'На краю привычного мира',description:'Водопады, чёрные пляжи и вулканические пейзажи — большое приключение среди суровой северной природы.',season:'Июнь — август',style:'Природа · Дороги',href:'destinations.html#iceland'},
 peru:{name:'Перу',flag:'🇵🇪',subtitle:'Истории древних цивилизаций',description:'Высокогорные тропы, наследие инков и яркая гастрономия для путешествия с любопытством к истории.',season:'Май — сентябрь',style:'История · Горы',href:'destinations.html#peru'},
 morocco:{name:'Марокко',flag:'🇲🇦',subtitle:'Цвет, аромат и контраст',description:'Медины, мозаики, Атласские горы и пустынные горизонты складываются в путешествие для всех чувств.',season:'Март — май',style:'Культура · Пейзажи',href:'destinations.html#morocco'},
 norway:{name:'Норвегия',flag:'🇳🇴',subtitle:'Фьорды и северные тропы',description:'Фьорды, горные панорамы и маршруты для прогулок среди суровой северной природы.',season:'Июнь — сентябрь',style:'Хайкинг · Природа',href:'destinations.html#norway',region:'ЕВРОПА',image:'norway',stops:'Берген, Флом, Гейрангер'},
 thailand:{name:'Таиланд',flag:'🇹🇭',subtitle:'Вкусы и островные истории',description:'Уличная еда, древние храмы и тропические острова — яркое путешествие с разным ритмом.',season:'Ноябрь — февраль',style:'Гастрономия · Культура',href:'destinations.html#thailand',region:'АЗИЯ',image:'thailand',stops:'Бангкок, Чиангмай, Краби'},
 greece:{name:'Греция',flag:'🇬🇷',subtitle:'Мифы, море и античность',description:'Античные памятники, островные деревни и средиземноморская кухня на перекрёстке историй.',season:'Апрель — июнь',style:'История · Культура',href:'destinations.html#greece',region:'ЕВРОПА',image:'greece',stops:'Афины, Дельфы, Наксос'},
 nepal:{name:'Непал',flag:'🇳🇵',subtitle:'Тропы среди вершин',description:'Горные деревни, панорамы Гималаев и многодневные пешие маршруты для подготовленных путешественников.',season:'Март — май, октябрь — ноябрь',style:'Хайкинг · Горы',href:'destinations.html#nepal',region:'ЮЖНАЯ АЗИЯ',image:'nepal',stops:'Покхара, Аннапурна, Катманду'},
 newzealand:{name:'Новая Зеландия',flag:'🇳🇿',subtitle:'Большое путешествие на природе',description:'Озёра, фьорды и тропы через разнообразные ландшафты — место для долгих поездок и прогулок.',season:'Ноябрь — апрель',style:'Хайкинг · Природа',href:'destinations.html#newzealand',region:'ОКЕАНИЯ',image:'newzealand',stops:'Квинстаун, Милфорд-Саунд, Роторуа'},
 france:{name:'Франция',flag:'🇫🇷',subtitle:'Искусство, города и кухня',description:'Музеи и исторические улицы, рынки, региональная кухня и маленькие города за пределами столицы.',season:'Апрель — июнь, сентябрь',style:'Гастрономия · История',href:'destinations.html#france',region:'ЕВРОПА',image:'france',stops:'Париж, Лион, Прованс'},
 tanzania:{name:'Танзания',flag:'🇹🇿',subtitle:'Сафари и горизонт саванны',description:'Национальные парки, просторы саванны и побережье Индийского океана — маршрут для знакомства с природой.',season:'Июнь — октябрь',style:'Природа · Сафари',href:'destinations.html#tanzania',region:'ВОСТОЧНАЯ АФРИКА',image:'tanzania',stops:'Серенгети, Нгоронгоро, Занзибар'}
};
function selectCountry(id){const c=countries[id];if(!c)return;const put=(selector,value)=>{const el=document.querySelector(selector);if(el)el.textContent=value;};put('#country-flag',c.flag);put('#country-name',c.name);put('#country-subtitle',c.subtitle);put('#country-description',c.description);put('#country-season',c.season);put('#country-style',c.style);put('#country-index',String(Object.keys(countries).indexOf(id)+1).padStart(2,'0')+' / '+String(Object.keys(countries).length).padStart(2,'0'));const link=document.querySelector('#country-link');if(link)link.href=c.href;document.querySelectorAll('.picker').forEach(b=>b.classList.toggle('selected',b.dataset.country===id));}
document.querySelectorAll('.picker').forEach(button=>button.addEventListener('click',()=>selectCountry(button.dataset.country)));
const countryPickers=document.querySelector('#country-pickers');
if(countryPickers){
 Object.entries(countries).forEach(([id,country])=>{if(countryPickers.querySelector(`[data-country="${id}"]`))return;const button=document.createElement('button');button.className='picker';button.dataset.country=id;button.textContent=country.name;button.addEventListener('click',()=>selectCountry(id));countryPickers.append(button);});
 const countryIndex=document.querySelector('#country-index');if(countryIndex)countryIndex.textContent='01 / '+String(Object.keys(countries).length).padStart(2,'0');
}
const countryList=document.querySelector('.country-list');
if(countryList){
 const newCountries=Object.entries(countries).filter(([,country])=>country.region);
 const countryIntro=document.querySelector('.page-hero .lead');
 if(countryIntro)countryIntro.textContent=`${Object.keys(countries).length} направлений — от городских прогулок и гастрономии до горных троп. Выбери место, которое откликается тебе сейчас.`;
 newCountries.forEach(([id,country],index)=>{const article=document.createElement('article');article.className='country-row';article.id=id;article.innerHTML=`<div class="country-image image-${country.image}"></div><div class="country-copy"><p class="eyebrow">${String(index+6).padStart(2,'0')} / ${country.region} · ${country.flag}</p><h2>${country.name}</h2><p>${country.description}</p><p><b>Лучшее время:</b> ${country.season}.<br><b>Не пропусти:</b> ${country.stops}.</p><a class="button button-dark" href="routes.html">Идеи маршрутов <span>↗</span></a></div>`;countryList.append(article);});
}
const routeGrid=document.querySelector('.route-grid');
if(routeGrid){
 const routeNote=document.querySelector('.analytics-note');
 if(routeNote)routeNote.innerHTML='<b>Учебный проект:</b> маршруты носят ознакомительный характер и не являются услугой бронирования. Фильтры помогают подобрать идею по интересам — хайкинг, гастрономия, история, природа или культура.';
 const filters=[['all','Все поездки'],['hiking','Хайкинг'],['food','Гастрономия'],['history','История'],['nature','Природа'],['culture','Культура и города']];
 const routeTypes=[
  ['Япония: от города к тишине',['history','culture','food']],
  ['Италия: города и побережье',['history','culture','food']],
  ['Исландия: дорога стихий',['hiking','nature']],
  ['Перу: следы древнего мира',['hiking','history','culture']],
 ];
 routeGrid.querySelectorAll('.route-card').forEach(card=>{const title=card.querySelector('h2')?.textContent;const route=routeTypes.find(([name])=>name===title);if(route)card.dataset.travelTypes=route[1].join(' ');});
 const extraRoutes=[
  {title:'Непал: тропа к Аннапурне',description:'Покхара → горные деревни → смотровые площадки Аннапурны. Выбирай маршрут по силам, закладывай дни на акклиматизацию и проверяй местные условия.',image:'nepal',region:'ГИМАЛАИ / 05',types:['hiking','nature','culture'],meta:['10–14 дней','Пеший маршрут','Горы']},
  {title:'Таиланд: Бангкок на вкус',description:'Бангкок → Чиангмай → ночные рынки. Знакомься с региональной кухней, выбирай небольшие локальные заведения и оставляй время на храмы и прогулки.',image:'thailand',region:'АЗИЯ / 06',types:['food','culture'],meta:['7–10 дней','3 остановки','Кухня']},
  {title:'Греция: следы античного мира',description:'Афины → Дельфы → остров. Археологические памятники, музеи и морские пейзажи — без попытки уместить всё в одну поездку.',image:'greece',region:'ЕВРОПА / 07',types:['history','culture'],meta:['7–9 дней','3 остановки','Античность']},
  {title:'Франция: рынки и региональная кухня',description:'Лион → Прованс → небольшие города. Рынки, сезонные продукты и местная кухня — маршрут для неспешного знакомства с регионами.',image:'france',region:'ЕВРОПА / 08',types:['food','culture'],meta:['6–9 дней','3 остановки','Гастрономия']},
 ];
 extraRoutes.forEach(route=>{const card=document.createElement('article');card.className='route-card';card.dataset.travelTypes=route.types.join(' ');card.innerHTML=`<div class="route-cover image-${route.image}"><span>${route.region}</span></div><div class="route-info"><h2>${route.title}</h2><p>${route.description}</p><div class="route-meta"><span>◷ ${route.meta[0]}</span><span>⌖ ${route.meta[1]}</span><span>✳ ${route.meta[2]}</span></div></div>`;routeGrid.append(card);});
 const filterBar=document.createElement('div');filterBar.className='travel-filters';filterBar.setAttribute('aria-label','Фильтр маршрутов по интересам');
 const filterLabel=document.createElement('span');filterLabel.className='travel-filters-label';filterLabel.textContent='МНЕ ИНТЕРЕСНО';filterBar.append(filterLabel);
 const filterButtons=filters.map(([type,label])=>{const button=document.createElement('button');button.type='button';button.className='travel-filter'+(type==='all'?' active':'');button.dataset.type=type;button.textContent=label;button.setAttribute('aria-pressed',String(type==='all'));filterBar.append(button);return button;});
 routeGrid.parentNode.insertBefore(filterBar,routeGrid);
 const filterStatus=document.createElement('p');filterStatus.className='travel-filter-status';filterStatus.setAttribute('aria-live','polite');filterBar.after(filterStatus);
 const updateFilter=type=>{let visible=0;routeGrid.querySelectorAll('.route-card').forEach(card=>{const matches=type==='all'||(card.dataset.travelTypes||'').split(' ').includes(type);card.hidden=!matches;if(matches)visible++;});filterButtons.forEach(button=>{const active=button.dataset.type===type;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});filterStatus.textContent=`Найдено маршрутов: ${visible}`;};
 filterButtons.forEach(button=>button.addEventListener('click',()=>updateFilter(button.dataset.type)));
 const requestedType=new URLSearchParams(window.location.search).get('type');
 updateFilter(filters.some(([type])=>type===requestedType)?requestedType:'all');
}
if('IntersectionObserver' in window){
 document.documentElement.classList.add('js');
 const revealTargets=document.querySelectorAll('.hero-copy,.hero-art,.stats-strip>div,.stats-strip>p,.section-heading,.destination-card,.country-row,.route-card,.journal-card,.value-card,.page-intro,.newsletter>div,.newsletter-form,.analytics-note');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
 revealTargets.forEach((element,index)=>{element.classList.add('reveal');element.style.setProperty('--reveal-delay',`${index%4*70}ms`);observer.observe(element);});
}
window.top100d=window.top100d||function(){(window.top100d.a=window.top100d.a||[]).push(arguments);};
if(window.location.pathname.endsWith('/routes.html'))window.top100d(7753152,'reachGoal','view_route',{page:window.location.pathname});
if(window.location.pathname.endsWith('/destinations.html'))window.top100d(7753152,'reachGoal','view_destination',{page:window.location.pathname});
