const itinerary = [
  {day:1,date:'9/19',title:'桃園 → 函館・百萬夜景',sub:'抵達北海道，第一晚泡湯休息',stops:['桃園機場','函館機場','函館山展望台','函館溫泉'],meals:'午｜機上簡餐\n晚｜飯店自助餐或和風套餐',hotel:'函館啄木亭、La’gent 函館北斗、函館國際、大沼王子、平成館或同級',memo:'函館山纜車為單程安排；若因天候或維修停駛，依旅行社規定調整或退費。'},
  {day:2,date:'9/20',title:'大沼公園・海洋公園 → 札幌',sub:'湖光山色、企鵝遊行與童話甜點世界',stops:['大・小沼國立公園','尼克斯海洋公園','白色戀人公園（不入館）','札幌'],meals:'早｜飯店早餐\n午｜壽喜燒鍋物\n晚｜敬請自理',hotel:'札幌 T-MARK、RESOL、PREMIER 中島公園、IBIS、Quintessa 或同級',memo:'這天車程較長，可帶頸枕與薄外套。海洋公園若休園將依原行程安排替代景點。'},
  {day:3,date:'9/21',title:'小樽海景鐵道・運河散策',sub:'復古街景、自由午餐與和牛晚宴',stops:['小樽海景鐵道','小樽運河','蒸汽鐘','北一硝子','音樂盒博物館','狸小路'],meals:'早｜飯店早餐\n午｜敬請自理\n晚｜北國和牛吃到飽＋酒水無限',hotel:'札幌 T-MARK、RESOL、PREMIER 中島公園、IBIS、Quintessa 或同級',memo:'海景鐵道約 20 分鐘；狸小路為自由活動，記得留意領隊集合時間。'},
  {day:4,date:'9/22',title:'購物・支笏湖・洞爺花火',sub:'從蔚藍湖景走進溫泉夜色',stops:['北廣島三井 OUTLET','支笏湖','洞爺湖展望台','洞爺湖花火'],meals:'早｜飯店早餐\n午｜敬請自理\n晚｜飯店自助晚餐',hotel:'洞爺湖畔亭、洞爺萬世閣、洞爺 Sun Palace 或同級',memo:'花火約 20:45～21:05，自行前往觀賞；遇天候可能取消。'},
  {day:5,date:'9/23',title:'五稜郭・金森倉庫 → 桃園',sub:'帶著函館港風景與回憶回家',stops:['五稜郭城跡','小丑幸運漢堡','金森紅磚倉庫','函館機場','桃園機場'],meals:'早｜飯店早餐\n午｜自理＋加贈幸運小丑漢堡\n晚｜機上簡餐',hotel:'甜蜜的家',memo:'返程 JX861 預定 17:45 函館起飛、20:55 抵達桃園；仍以最終行前通知為準。'}
];

const dayList=document.querySelector('#dayList');
let activeDay=0,touchStart=0;
const dayGuides={
  1:{intro:'抵達日以保暖、跟團與安全為優先，不另外塞行程。',items:[
    ['函館機場','入境後先上洗手間、確認護照與行李，再跟隨領隊集合；不要自行離開團體找 SIM 卡或換匯。'],
    ['函館山夜景','纜車單程約 3 分鐘；9 月山頂比市區冷且風大，薄羽絨或防風外套要隨身。夜景通常在日落後約 30 分鐘較完整，拍照後提早往下層出口移動可避開回程人潮。'],
    ['第一晚溫泉','先洗淨身體再入池，毛巾不放入池內；有心血管疾病、飲酒後或身體不適者不要勉強泡湯，每次約 10～15 分鐘並補充水分。']
  ],links:[['函館山官方交通與壅塞資訊','https://www.hakodate.travel/en/information/mt-hakodate/']]},
  2:{intro:'景點分散、車程較長，隨身帶水、薄外套與頸枕。',items:[
    ['大・小沼國定公園','以湖畔、島嶼與駒岳景觀為主；跟團停留有限時，優先走平緩的湖畔短線並在橋上拍照，不要離隊挑戰長路線。雨後木棧與落葉可能濕滑。'],
    ['尼克斯海洋公園','進場先拍當日表演時刻表，再以企鵝遊行、海豚秀與沙丁魚表演排序；活動可能因天候或動物狀況調整。企鵝路線兩側人多，避免跨越圍線或使用閃光燈。'],
    ['白色戀人公園（不入館）','本團為外觀與免費區參觀，重點是英式庭園、鐘樓與限定伴手禮；整點約有機械鐘表演。先拍照再購物，避免錯過集合。'],
    ['札幌晚間','若晚餐自理，先確認飯店位置及最晚集合時間；兩人以上同行，回程保留飯店地址截圖，晚間不要單獨前往陌生巷弄。']
  ],links:[['大沼公園官方指南','https://onumakouen.com/en/'],['尼克斯官方表演資訊','https://nixe-aqua.com/en/'],['白色戀人公園官方資訊','https://www.shiroikoibitopark.jp/en/']]},
  3:{intro:'白天小樽慢走、晚上狸小路自由活動；先約好集合點與時間。',items:[
    ['小樽海景鐵道','沿海路段座位有限，依領隊安排上下車；上車前先完成洗手間需求。拍照時關閉閃光燈並避免把手機伸出窗外。'],
    ['小樽運河','石造倉庫與煤氣燈是主要看點；淺草橋一帶適合團體照。河畔石板可能高低不平，父母可走靠建築側較平坦的人行道。'],
    ['堺町散策順序','建議依「北一硝子 → 甜點／午餐 → 音樂盒堂 → 蒸汽鐘」前進，減少折返。北一硝子三號館及音樂盒堂通常營業至 18:00，仍以當日公告為準。'],
    ['蒸汽鐘・音樂盒堂','蒸汽鐘每 15 分鐘鳴笛一次；音樂盒堂本館免費入場、樓層多且易走散，約定在一樓出口集合。玻璃與音樂盒易碎，請確認店家包裝後再放入手提行李。'],
    ['午餐自理','想吃小樽特色可選壽司、海鮮丼或蕎麥麵；排隊太長時不要硬等，優先選堺町通有座位、可刷卡且洗手間方便的店。'],
    ['自由夜訪狸小路','狸小路是約 1 公里、有近 200 店的有頂棚商店街。時間有限建議逛 3～5 丁目：先藥妝／伴手禮，再吃晚餐；以領隊指定路口為中心往返，不一路走到底。購物後立即把退稅單據與護照收回貼身包，至少提前 15 分鐘回集合點。']
  ],links:[['小樽官方旅遊指南','https://www.visit-hokkaido.jp/en/spot/detail_10040.html'],['狸小路官方指南','https://www.sapporo.travel/en/spot/facility/tanukikoji_shopping_arcade/']]},
  4:{intro:'上午購物、下午湖區、晚間花火，鞋子與外套都要兼顧。',items:[
    ['北廣島三井 OUTLET','先拍集合點與遊覽車位置；依「必買品牌 → 午餐 → 藥妝／伴手禮」順序，最後 20 分鐘專心結帳與退稅。詳細購物及午餐清單見下方。'],
    ['支笏湖','以「支笏湖藍」、湖畔與山景為主；遊客中心可免費了解火山與生態。湖邊風強、紫外線明顯，請戴帽並避免走近濕滑岸邊。'],
    ['洞爺湖展望台','先拍全景，再依體力逛賣店；上下車注意階梯。若雲霧遮住湖景，以團體集合時間為優先，不等待天候變化。'],
    ['洞爺湖花火','2026 年活動預定 4/28～10/31，每晚 20:45～21:05，風雨過大可能取消。從湖畔即可觀賞；提早穿外套、帶房卡，不需追著施放船移動。']
  ],links:[['支笏湖官方指南','https://www.visit-hokkaido.jp/en/spot/detail_10145.html'],['洞爺湖花火官方資訊','https://www.laketoya.com/en/event/fireworks/']]},
  5:{intro:'返程日行程緊湊，購物與拍照都要預留機場時間。',items:[
    ['五稜郭','先從五稜郭塔看星形全貌，再依時間決定是否下樓散步。塔內有座椅、置物櫃與洗手間；公園範圍大，不建議父母繞行整圈。'],
    ['幸運小丑漢堡','招牌是中華炸雞漢堡，醬汁偏甜、份量較大；可兩人分食並準備濕紙巾。團體贈送品項與取餐方式以領隊說明為準。'],
    ['金森紅磚倉庫','由四個倉庫設施組成，適合買函館伴手禮與拍港景；先確認集合倉庫名稱，因建築外觀相似。店內可詢問輪椅、置物櫃、免費 Wi‑Fi 與單店免稅。'],
    ['函館機場返程','液體、剪刀與大型伴手禮先整理進托運行李；護照、登機證、藥品與行動電源隨身。安檢後再次確認 JX861 登機門及時間。']
  ],links:[['五稜郭塔官方資訊','https://www.goryokaku-tower.co.jp/en/'],['金森紅磚倉庫官方資訊','https://hakodate-kanemori.com/tw'],['幸運小丑官方菜單','https://luckypierrot.jp/en/menu/']]}
};
const outletGuide=`<details class="outlet-guide" open><summary>北廣島 OUTLET 購物・午餐指南</summary><div class="outlet-guide-grid"><section><h4>先買什麼</h4><ul><li><strong>北海道伴手禮：</strong>北海道四季彩館，集中挑選甜點、酒類與地方名產。</li><li><strong>服飾戶外：</strong>先看當日折扣，再比台灣售價；試穿後確認退換貨規定。</li><li><strong>省時動線：</strong>先拍集合地點，設定鬧鐘；大型物品最後再買。</li></ul></section><section><h4>午餐自理推薦</h4><ul><li><strong>豚丼のぶたはげ：</strong>帶廣風炭烤豬肉丼，北海道特色首選。</li><li><strong>ごまそば処 八雲：</strong>芝麻蕎麥麵，口味清爽、適合長輩。</li><li><strong>弟子屈ラーメン：</strong>北海道魚介醬油與味噌拉麵。</li></ul><p>以上皆在 Clover Mall 2F 美食區；美食區通常 10:30 開始營業。</p></section><section class="drugstore-tip"><h4>有藥妝店 ✓</h4><p><strong>松本清 OUTLET</strong><br>Clover Mall 2F，販售藥妝、美妝與健康用品，並提供免稅服務。結帳前出示護照，藥品請依自身用藥狀況詢問藥師。</p></section></div><div class="outlet-links"><a href="https://mitsui-shopping-park.com/mop/sapporo/english/" target="_blank" rel="noopener">OUTLET 官方指南 ↗</a><a href="https://mitsui-shopping-park.com/mop/sapporo/shop/800055.html" target="_blank" rel="noopener">松本清店舖資訊 ↗</a></div><p class="guide-note">商店、餐廳與優惠可能調整，請以到訪當日館內及官方公告為準。</p></details>`;
const renderGuide=d=>{const guide=dayGuides[d.day];return `<details class="spot-guide" open><summary>DAY ${d.day} 景點安心指南</summary><p class="guide-intro">${guide.intro}</p><div class="spot-guide-list">${guide.items.map(([title,body],i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><div><h4>${title}</h4><p>${body}</p></div></article>`).join('')}</div><div class="guide-links">${guide.links.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`).join('')}</div><p class="guide-note">實際開放、表演、交通與集合安排可能變動，當天以領隊及現場公告為準。</p></details>`};
const renderDay=()=>{
  const d=itinerary[activeDay];
  dayList.innerHTML=`<div class="day-tabs" role="tablist" aria-label="選擇旅遊日期">${itinerary.map((item,i)=>`<button role="tab" aria-selected="${i===activeDay}" data-day="${i}" type="button"><small>DAY ${item.day}</small>${item.date}</button>`).join('')}</div><article class="day-slide" role="tabpanel" tabindex="0"><div class="day-slide-head"><span class="day-badge"><small>DAY ${d.day}</small>${d.date}</span><span class="day-head"><h3>${d.title}</h3><p>${d.sub}</p></span></div><div class="stops">${d.stops.map(s=>`<span>${s}</span>`).join('')}</div><div class="info-grid"><div class="info-box"><h4>餐食</h4><p>${d.meals.replaceAll('\n','<br>')}</p></div><div class="info-box"><h4>住宿</h4><p>${d.hotel}</p></div></div><p class="memo">${d.memo}</p>${renderGuide(d)}${d.day===4?outletGuide:''}<div class="day-controls"><button type="button" data-move="-1" ${activeDay===0?'disabled':''}>← 上一天</button><span>${activeDay+1} / ${itinerary.length}</span><button type="button" data-move="1" ${activeDay===itinerary.length-1?'disabled':''}>下一天 →</button></div><p class="swipe-hint">手機可左右滑動切換每日行程</p></article>`;
  dayList.querySelectorAll('[data-day]').forEach(btn=>btn.addEventListener('click',()=>{activeDay=Number(btn.dataset.day);renderDay()}));
  dayList.querySelectorAll('[data-move]').forEach(btn=>btn.addEventListener('click',()=>{activeDay+=Number(btn.dataset.move);renderDay()}));
};
dayList.addEventListener('touchstart',e=>touchStart=e.changedTouches[0].clientX,{passive:true});
dayList.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>55){activeDay=Math.max(0,Math.min(itinerary.length-1,activeDay+(delta<0?1:-1)));renderDay()}},{passive:true});
dayList.addEventListener('keydown',e=>{if(e.key==='ArrowRight'&&activeDay<itinerary.length-1){activeDay++;renderDay()}if(e.key==='ArrowLeft'&&activeDay>0){activeDay--;renderDay()}});
renderDay();

const weatherPlaces=[{name:'函館',lat:41.7687,lon:140.7288},{name:'札幌・小樽',lat:43.0618,lon:141.3545},{name:'洞爺湖',lat:42.6039,lon:140.8516}];
const weatherGrid=document.querySelector('#weatherGrid'),weatherStatus=document.querySelector('#weatherStatus');
const weatherText=code=>({0:'晴朗',1:'大致晴朗',2:'局部多雲',3:'陰天',45:'有霧',48:'霧淞',51:'毛毛雨',53:'毛毛雨',55:'較強毛毛雨',61:'小雨',63:'中雨',65:'大雨',71:'小雪',73:'中雪',75:'大雪',77:'雪粒',80:'陣雨',81:'陣雨',82:'強陣雨',85:'陣雪',86:'強陣雪',95:'雷雨',96:'雷雨伴冰雹',99:'強雷雨伴冰雹'}[code]||'天氣變化');
const weatherIcon=code=>code===0?'☀️':code<=3?'⛅':code<=48?'🌫️':code<=67?'🌧️':code<=77?'🌨️':code<=86?'🌦️':'⛈️';
const renderWeather=(items,time,cached=false)=>{weatherGrid.innerHTML=items.map(item=>`<article class="weather-card"><div><span class="weather-icon" aria-hidden="true">${weatherIcon(item.code)}</span><h3>${item.name}</h3><p>${weatherText(item.code)}</p></div><strong>${Math.round(item.temp)}°</strong><dl><div><dt>體感</dt><dd>${Math.round(item.feels)}°C</dd></div><div><dt>濕度</dt><dd>${item.humidity}%</dd></div><div><dt>風速</dt><dd>${Math.round(item.wind)} km/h</dd></div></dl></article>`).join('');weatherStatus.textContent=`${cached?'離線資料・':'已更新・'}${new Date(time).toLocaleString('zh-TW',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}`};
const updateWeather=async()=>{weatherStatus.textContent='正在取得最新天氣…';document.querySelector('#refreshWeather').disabled=true;try{const query=`latitude=${weatherPlaces.map(p=>p.lat).join(',')}&longitude=${weatherPlaces.map(p=>p.lon).join(',')}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FTokyo`;const response=await fetch(`https://api.open-meteo.com/v1/forecast?${query}`);if(!response.ok)throw new Error('weather');const raw=await response.json(),rows=(Array.isArray(raw)?raw:[raw]).map((r,i)=>({name:weatherPlaces[i].name,temp:r.current.temperature_2m,feels:r.current.apparent_temperature,humidity:r.current.relative_humidity_2m,wind:r.current.wind_speed_10m,code:r.current.weather_code}));const saved={items:rows,time:Date.now()};localStorage.setItem('hokkaido-weather',JSON.stringify(saved));renderWeather(saved.items,saved.time)}catch(error){const saved=JSON.parse(localStorage.getItem('hokkaido-weather')||'null');if(saved)renderWeather(saved.items,saved.time,true);else{weatherGrid.innerHTML='<p class="weather-error">目前無法取得天氣，請確認網路後再試一次。</p>';weatherStatus.textContent='天氣更新失敗'}}finally{document.querySelector('#refreshWeather').disabled=false}};
document.querySelector('#refreshWeather').addEventListener('click',updateWeather);updateWeather();

const rate=document.querySelector('#rate'),jpy=document.querySelector('#jpy'),twd=document.querySelector('#twd');
let direction='jpy';
const number=v=>Number(String(v).replace(/[^0-9.]/g,''))||0;
const format=v=>Math.round(v).toLocaleString('zh-TW');
const convert=()=>{const r=Number(rate.value)||0;if(direction==='jpy')twd.value=format(number(jpy.value)*r);else jpy.value=format(number(twd.value)/r);localStorage.setItem('hokkaido-rate',rate.value)};
rate.value=localStorage.getItem('hokkaido-rate')||'0.22';convert();
jpy.addEventListener('input',()=>{direction='jpy';convert()});
twd.addEventListener('input',()=>{direction='twd';convert()});
rate.addEventListener('input',convert);
[jpy,twd].forEach(el=>el.addEventListener('blur',()=>el.value=format(number(el.value))));
document.querySelectorAll('[data-yen]').forEach(btn=>btn.addEventListener('click',()=>{direction='jpy';jpy.value=format(btn.dataset.yen);convert()}));
document.querySelector('#swap').addEventListener('click',()=>{direction=direction==='jpy'?'twd':'jpy';(direction==='jpy'?jpy:twd).focus()});
const toolsModal=document.querySelector('#toolsModal');
const openTools=()=>{toolsModal.showModal();document.body.classList.add('modal-open')};
const closeTools=()=>{toolsModal.close();document.body.classList.remove('modal-open')};
document.querySelector('#toolsOpen').addEventListener('click',openTools);
document.querySelector('#toolsClose').addEventListener('click',closeTools);
toolsModal.addEventListener('close',()=>document.body.classList.remove('modal-open'));
toolsModal.addEventListener('click',event=>{if(event.target===toolsModal)closeTools()});
document.querySelectorAll('[data-tool]').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('[data-tool]').forEach(item=>item.setAttribute('aria-selected',item===tab));
  document.querySelectorAll('[data-panel]').forEach(panel=>panel.hidden=panel.dataset.panel!==tab.dataset.tool);
}));
document.querySelectorAll('[data-phrase]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#translateText').value=button.dataset.phrase}));
document.querySelector('#translateOpen').addEventListener('click',()=>{const text=document.querySelector('#translateText').value.trim()||'請問這個可以退稅嗎？';window.open(`https://translate.google.com/?sl=zh-TW&tl=ja&text=${encodeURIComponent(text)}&op=translate`,'_blank','noopener')});
document.querySelector('#textSize').addEventListener('click',e=>{const on=document.body.classList.toggle('large-text');e.currentTarget.setAttribute('aria-pressed',on);e.currentTarget.textContent=on?'恢復字體':'字體放大'});
const navLinks=[...document.querySelectorAll('.bottom-nav a')];
const navSections=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
const navObserver=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;navLinks.forEach(link=>link.toggleAttribute('aria-current',link.getAttribute('href')===`#${visible.target.id}`))},{rootMargin:'-30% 0px -55%',threshold:[0,.1,.5]});
[document.querySelector('#top'),document.querySelector('#overview'),...navSections].forEach(section=>navObserver.observe(section));
const hero=document.querySelector('#top');
const heroNavObserver=new IntersectionObserver(([entry])=>document.body.classList.toggle('at-hero',entry.isIntersecting&&entry.intersectionRatio>.35),{threshold:[0,.35]});
heroNavObserver.observe(hero);
if('serviceWorker' in navigator){
  let refreshing=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(refreshing)return;refreshing=true;if(!sessionStorage.getItem('pwa-v12-reloaded')){sessionStorage.setItem('pwa-v12-reloaded','1');location.reload()}});
  navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(registration=>{registration.update();document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')registration.update()})});
}
