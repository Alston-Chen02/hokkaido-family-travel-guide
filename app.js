const itinerary = [
  {day:1,date:'9/19',title:'桃園 → 函館・百萬夜景',sub:'抵達北海道，第一晚泡湯休息',stops:['桃園機場','函館機場','函館山展望台','函館溫泉'],meals:'午｜機上簡餐\n晚｜飯店自助餐或和風套餐',hotel:'函館啄木亭、La’gent 函館北斗、函館國際、大沼王子、平成館或同級',memo:'函館山纜車為單程安排；若因天候或維修停駛，依旅行社規定調整或退費。'},
  {day:2,date:'9/20',title:'大沼公園・海洋公園 → 札幌',sub:'湖光山色、企鵝遊行與童話甜點世界',stops:['大・小沼國立公園','尼克斯海洋公園','白色戀人公園（不入館）','札幌'],meals:'早｜飯店早餐\n午｜壽喜燒鍋物\n晚｜敬請自理',hotel:'札幌 T-MARK、RESOL、PREMIER 中島公園、IBIS、Quintessa 或同級',memo:'這天車程較長，可帶頸枕與薄外套。海洋公園若休園將依原行程安排替代景點。'},
  {day:3,date:'9/21',title:'小樽海景鐵道・運河散策',sub:'復古街景、自由午餐與和牛晚宴',stops:['小樽海景鐵道','小樽運河','蒸汽鐘','北一硝子','音樂盒博物館','狸小路'],meals:'早｜飯店早餐\n午｜敬請自理\n晚｜北國和牛吃到飽＋酒水無限',hotel:'札幌 T-MARK、RESOL、PREMIER 中島公園、IBIS、Quintessa 或同級',memo:'海景鐵道約 20 分鐘；狸小路為自由活動，記得留意領隊集合時間。'},
  {day:4,date:'9/22',title:'購物・支笏湖・洞爺花火',sub:'從蔚藍湖景走進溫泉夜色',stops:['北廣島三井 OUTLET','支笏湖','洞爺湖展望台','洞爺湖花火'],meals:'早｜飯店早餐\n午｜敬請自理\n晚｜飯店自助晚餐',hotel:'洞爺湖畔亭、洞爺萬世閣、洞爺 Sun Palace 或同級',memo:'花火約 20:45～21:05，自行前往觀賞；遇天候可能取消。'},
  {day:5,date:'9/23',title:'五稜郭・金森倉庫 → 桃園',sub:'帶著函館港風景與回憶回家',stops:['五稜郭城跡','小丑幸運漢堡','金森紅磚倉庫','函館機場','桃園機場'],meals:'早｜飯店早餐\n午｜自理＋加贈幸運小丑漢堡\n晚｜機上簡餐',hotel:'甜蜜的家',memo:'返程 JX861 預定 17:45 函館起飛、20:55 抵達桃園；仍以最終行前通知為準。'}
];

const dayList=document.querySelector('#dayList');
let activeDay=0,touchStart=0;
const renderDay=()=>{
  const d=itinerary[activeDay];
  dayList.innerHTML=`<div class="day-tabs" role="tablist" aria-label="選擇旅遊日期">${itinerary.map((item,i)=>`<button role="tab" aria-selected="${i===activeDay}" data-day="${i}" type="button"><small>DAY ${item.day}</small>${item.date}</button>`).join('')}</div><article class="day-slide" role="tabpanel" tabindex="0"><div class="day-slide-head"><span class="day-badge"><small>DAY ${d.day}</small>${d.date}</span><span class="day-head"><h3>${d.title}</h3><p>${d.sub}</p></span></div><div class="stops">${d.stops.map(s=>`<span>${s}</span>`).join('')}</div><div class="info-grid"><div class="info-box"><h4>餐食</h4><p>${d.meals.replaceAll('\n','<br>')}</p></div><div class="info-box"><h4>住宿</h4><p>${d.hotel}</p></div></div><p class="memo">${d.memo}</p><div class="day-controls"><button type="button" data-move="-1" ${activeDay===0?'disabled':''}>← 上一天</button><span>${activeDay+1} / ${itinerary.length}</span><button type="button" data-move="1" ${activeDay===itinerary.length-1?'disabled':''}>下一天 →</button></div><p class="swipe-hint">手機可左右滑動切換每日行程</p></article>`;
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
document.querySelector('#textSize').addEventListener('click',e=>{const on=document.body.classList.toggle('large-text');e.currentTarget.setAttribute('aria-pressed',on);e.currentTarget.textContent=on?'恢復字體':'字體放大'});
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js');
