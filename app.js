const itinerary = [
  {day:1,title:'桃園 → 函館・百萬夜景',sub:'抵達北海道，第一晚泡湯休息',stops:['桃園機場','函館機場','函館山展望台','函館溫泉'],meals:'午｜機上簡餐\n晚｜飯店自助餐或和風套餐',hotel:'函館啄木亭、La’gent 函館北斗、函館國際、大沼王子、平成館或同級',memo:'函館山纜車為單程安排；若因天候或維修停駛，依旅行社規定調整或退費。'},
  {day:2,title:'大沼公園・海洋公園 → 札幌',sub:'湖光山色、企鵝遊行與童話甜點世界',stops:['大・小沼國立公園','尼克斯海洋公園','白色戀人公園（不入館）','札幌'],meals:'早｜飯店早餐\n午｜壽喜燒鍋物\n晚｜敬請自理',hotel:'札幌 T-MARK、RESOL、PREMIER 中島公園、IBIS、Quintessa 或同級',memo:'這天車程較長，可帶頸枕與薄外套。海洋公園若休園將依原行程安排替代景點。'},
  {day:3,title:'小樽海景鐵道・運河散策',sub:'復古街景、自由午餐與和牛晚宴',stops:['小樽海景鐵道','小樽運河','蒸汽鐘','北一硝子','音樂盒博物館','狸小路'],meals:'早｜飯店早餐\n午｜敬請自理\n晚｜北國和牛吃到飽＋酒水無限',hotel:'札幌 T-MARK、RESOL、PREMIER 中島公園、IBIS、Quintessa 或同級',memo:'海景鐵道約 20 分鐘；狸小路為自由活動，記得留意領隊集合時間。'},
  {day:4,title:'購物・支笏湖・洞爺花火',sub:'從蔚藍湖景走進溫泉夜色',stops:['北廣島三井 OUTLET','支笏湖','洞爺湖展望台','洞爺湖花火'],meals:'早｜飯店早餐\n午｜敬請自理\n晚｜飯店自助晚餐',hotel:'洞爺湖畔亭、洞爺萬世閣、洞爺 Sun Palace 或同級',memo:'花火約 20:45～21:05，自行前往觀賞；遇天候可能取消。'},
  {day:5,title:'五稜郭・金森倉庫 → 桃園',sub:'帶著函館港風景與回憶回家',stops:['五稜郭城跡','小丑幸運漢堡','金森紅磚倉庫','函館機場','桃園機場'],meals:'早｜飯店早餐\n午｜自理＋加贈幸運小丑漢堡\n晚｜機上簡餐',hotel:'甜蜜的家',memo:'航班時間、機場集合方式與最終行李規定，請以出發前行前說明會資料為準。'}
];

const dayList=document.querySelector('#dayList');
let activeDay=0,touchStart=0;
const renderDay=()=>{
  const d=itinerary[activeDay];
  dayList.innerHTML=`<div class="day-tabs" role="tablist" aria-label="選擇旅遊日期">${itinerary.map((item,i)=>`<button role="tab" aria-selected="${i===activeDay}" data-day="${i}" type="button"><small>DAY</small>${item.day}</button>`).join('')}</div><article class="day-slide" role="tabpanel" tabindex="0"><div class="day-slide-head"><span class="day-badge"><small>DAY</small>${d.day}</span><span class="day-head"><h3>${d.title}</h3><p>${d.sub}</p></span></div><div class="stops">${d.stops.map(s=>`<span>${s}</span>`).join('')}</div><div class="info-grid"><div class="info-box"><h4>餐食</h4><p>${d.meals.replaceAll('\n','<br>')}</p></div><div class="info-box"><h4>住宿</h4><p>${d.hotel}</p></div></div><p class="memo">${d.memo}</p><div class="day-controls"><button type="button" data-move="-1" ${activeDay===0?'disabled':''}>← 上一天</button><span>${activeDay+1} / ${itinerary.length}</span><button type="button" data-move="1" ${activeDay===itinerary.length-1?'disabled':''}>下一天 →</button></div><p class="swipe-hint">手機可左右滑動切換每日行程</p></article>`;
  dayList.querySelectorAll('[data-day]').forEach(btn=>btn.addEventListener('click',()=>{activeDay=Number(btn.dataset.day);renderDay()}));
  dayList.querySelectorAll('[data-move]').forEach(btn=>btn.addEventListener('click',()=>{activeDay+=Number(btn.dataset.move);renderDay()}));
};
dayList.addEventListener('touchstart',e=>touchStart=e.changedTouches[0].clientX,{passive:true});
dayList.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>55){activeDay=Math.max(0,Math.min(itinerary.length-1,activeDay+(delta<0?1:-1)));renderDay()}},{passive:true});
dayList.addEventListener('keydown',e=>{if(e.key==='ArrowRight'&&activeDay<itinerary.length-1){activeDay++;renderDay()}if(e.key==='ArrowLeft'&&activeDay>0){activeDay--;renderDay()}});
renderDay();

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
