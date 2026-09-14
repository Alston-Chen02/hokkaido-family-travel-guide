const volcanoes=[
  {name:'十勝岳',id:'108',nearTrip:false,place:'富良野・美瑛一帶'},
  {name:'樽前山',id:'109',nearTrip:true,place:'支笏湖附近'},
  {name:'有珠山',id:'112',nearTrip:true,place:'洞爺湖附近'},
  {name:'北海道駒岳',sourceName:'北海道駒ヶ岳',id:'113',nearTrip:true,place:'大沼附近'}
];
const impactBox=document.querySelector('#travelImpact');
const checkedLabel=document.querySelector('#travelChecked');
const volcanoGrid=document.querySelector('#volcanoGrid');
const newsBox=document.querySelector('#volcanoNews');
const refreshButton=document.querySelector('#refreshTravelStatus');
const dateLabel=value=>new Date(value).toLocaleString('zh-TW',{timeZone:'Asia/Tokyo',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
const make=(tag,text,className)=>{const node=document.createElement(tag);node.textContent=text;if(className)node.className=className;return node};

async function readVolcano(volcano){
  const url=`https://www.data.jma.go.jp/vois/data/report/activity_info/${volcano.id}.html`;
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),15000);
  let response;
  try{response=await fetch(url,{cache:'no-store',signal:controller.signal})}
  finally{clearTimeout(timeout)}
  if(!response.ok)throw new Error('official-source-unavailable');
  const doc=new DOMParser().parseFromString(await response.text(),'text/html');
  const heading=doc.querySelector('.bigtitle')?.textContent||'';
  const keyword=doc.querySelector('.level-keyword')?.textContent||'';
  if(!heading.includes(volcano.sourceName||volcano.name))throw new Error('wrong-volcano');
  const match=keyword.match(/噴火警戒レベル\s*([1-5１-５])/);
  if(!match)throw new Error('alert-level-unreadable');
  const level=Number(match[1].replace(/[１-５]/g,c=>String(c.charCodeAt(0)-65296)));
  const latest=doc.querySelector('#recentInfoList li[data-datetime]');
  const published=latest?.getAttribute('data-datetime')||null;
  const title=latest?.querySelector('a')?.textContent?.trim()||'';
  return {...volcano,level,published,title,url};
}

function showImpact(title,description,kind){
  impactBox.dataset.level=kind;
  impactBox.replaceChildren(make('strong',title),make('p',description));
}

function renderVolcanoes(results){
  volcanoGrid.replaceChildren();
  for(const result of results){
    const card=make('article','', 'volcano-card');
    card.append(make('h3',result.name),make('strong',result.level?`警戒 ${result.level} 級`:'無法查核'));
    card.append(make('p',`${result.place}・${result.level?result.level>=3?'請遵守入山規制':result.level===2?'火口周邊管制':'留意活火山公告':'請開啟官方頁確認'}`));
    if(result.published)card.append(make('small',`最新公告：${dateLabel(result.published)}（日本時間）`));
    const link=make('a','日本氣象廳原文 ↗');link.href=result.url;link.target='_blank';link.rel='noopener';card.append(link);
    volcanoGrid.append(card);
  }
}

function renderNews(tokachi){
  if(!tokachi?.level){newsBox.textContent='目前無法取得十勝岳最新公告，請開啟日本氣象廳原文確認。';return}
  const description=tokachi.title.includes('解説情報')?'火山活動狀況說明':tokachi.title.includes('噴火警報')?'火口周邊警報':'火山活動資料';
  newsBox.textContent=`${description}・${tokachi.published?`${dateLabel(tokachi.published)}（日本時間）`:'公告時間未提供'}。目前警戒 ${tokachi.level} 級；請點下方官方原文閱讀警戒範圍。警戒升級不代表已經噴發。`;
}

async function updateTravelStatus(){
  refreshButton.disabled=true;
  checkedLabel.textContent='正在連線查核日本氣象廳…';
  showImpact('正在查核官方火山資訊…','未完成查核前，不會判定行程無影響。','watch');
  const settled=await Promise.allSettled(volcanoes.map(readVolcano));
  const results=settled.map((entry,index)=>entry.status==='fulfilled'?entry.value:{...volcanoes[index],level:null,url:`https://www.data.jma.go.jp/vois/data/report/activity_info/${volcanoes[index].id}.html`});
  renderVolcanoes(results);renderNews(results[0]);
  const incomplete=results.some(item=>!item.level);
  const nearAlert=results.some(item=>item.nearTrip&&item.level>=2);
  if(incomplete)showImpact('無法完整判斷行程影響','部分官方資料取得失敗；請開啟原文並向領隊確認，勿以舊資訊判斷。','watch');
  else if(nearAlert||results[0].level>=4)showImpact('火山警戒升高，請向領隊確認','行程附近火山有警戒變化，或十勝岳警戒範圍可能擴大；景點、航班及道路影響須以官方與旅行社通知為準。','caution');
  else showImpact('目前未見景點直接落在警戒區','十勝岳警戒區不在既定景點；大沼、支笏湖與洞爺湖附近火山目前為 1 級。航班、道路和團體安排仍須向官方及領隊確認。','checked');
  checkedLabel.textContent=`${incomplete?'部分資料未取得・':'已連網查核・'}${dateLabel(Date.now())}（日本時間）`;
  refreshButton.disabled=false;
}

refreshButton.addEventListener('click',updateTravelStatus);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')updateTravelStatus()});
window.addEventListener('online',updateTravelStatus);
updateTravelStatus();
