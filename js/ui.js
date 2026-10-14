'use strict';
/* GEOPOP · ui.js — интерфейс: тосты, примерка размеров, генерация,
   орбита, пейджер тем, карточки слоёв, избранное, галерея.
   Привязка событий и запуск — в main.js. */

/* ───────── тосты ───────── */
function toast(msg,err){
  const d=document.createElement('div');
  d.className='toast'+(err?' err':'');d.textContent=msg;
  $('#toasts').append(d);
  setTimeout(()=>{d.classList.add('out');setTimeout(()=>d.remove(),320)},2600);
}

/* ───────── примерка размеров + общая перерисовка ───────── */
const PV_SPECS=[{s:128,r:1},{s:96,r:1},{s:64,r:1},{s:48,r:0},{s:32,r:1},{s:24,r:1}];
let pvCanvases=[];
function buildPreviews(){
  const row=$('#pvRow');row.innerHTML='';pvCanvases=[];
  PV_SPECS.forEach(({s,r})=>{
    const cell=document.createElement('div');
    cell.className='pv'+(r?' circle':'');
    const c=document.createElement('canvas');
    c.width=c.height=s*2;c.style.width=s+'px';
    const lb=document.createElement('i');lb.textContent=s;
    cell.append(c,lb);row.append(cell);pvCanvases.push(c);
  });
}
function syncPreviews(){
  pvCanvases.forEach(c=>{
    const x=c.getContext('2d');
    x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';
    x.clearRect(0,0,c.width,c.height);
    x.drawImage(cv,0,0,cv.width,cv.height,0,0,c.width,c.height);
  });
}
function repaint(){paint(state);syncPreviews();syncMeta()}

/* ───────── генерация: один клик — один кадр ───────── */
const port=$('#port');
function generate(){
  randomizeLayers();
  port.classList.remove('pop');void port.offsetWidth;
  port.classList.add('pop');
  repaint();buildLayers();
  setTimeout(()=>port.classList.remove('pop'),340);
}

/* ───────── орбита фигур вокруг превью ───────── */
function buildOrbit(){
  const t=themeOf(),box=$('#orbit');box.innerHTML='';
  const kinds=['dot','sq','spark','tri','ring','dot','sq','spark'];
  const cols=[...t.a,t.ink];
  for(let i=0;i<8;i++){
    const el=document.createElement('i');
    el.className='ob k-'+kinds[i];
    const ang=(i/8)*TAU-Math.PI/2;
    el.style.left=(50+54*Math.cos(ang))+'%';
    el.style.top=(50+54*Math.sin(ang))+'%';
    const c=cols[i%cols.length];
    if(kinds[i]==='dot')el.style.background=c;
    else if(kinds[i]==='sq'){el.style.background=c;el.style.transform=`translate(-50%,-50%) rotate(${i*23}deg)`}
    else if(kinds[i]==='ring')el.style.borderColor=c;
    else if(kinds[i]==='spark')el.innerHTML=`<svg viewBox="0 0 24 24"><path d="M12 2 Q13.5 10.5 22 12 Q13.5 13.5 12 22 Q10.5 13.5 2 12 Q10.5 10.5 12 2Z" fill="${c}"/></svg>`;
    else el.innerHTML=`<svg viewBox="0 0 24 24"><path d="M12 3 L21 20 H3 Z" fill="${c}"/></svg>`;
    box.append(el);
  }
}

/* ───────── пейджер тем ───────── */
const PER_PAGE=6;
let tPage=0,themeCardEls=[];
function paintThemeDemo(cvs,t){
  paint({seed:DEMO.seed,themeId:t.id,size:cvs.width,layers:JSON.parse(JSON.stringify(DEMO.layers))},cvs);
}
function goThemePage(i,instant){
  const pages=Math.ceil(THEMES.length/PER_PAGE);
  tPage=((i%pages)+pages)%pages;
  const track=$('#tTrack');
  if(instant)track.style.transition='none';
  track.style.transform=`translateX(-${tPage*100}%)`;
  if(instant){track.getBoundingClientRect();track.style.transition=''}
  document.querySelectorAll('#tDots .t-dot').forEach((d,k)=>d.classList.toggle('on',k===tPage));
}
function buildThemes(){
  const track=$('#tTrack');track.innerHTML='';
  const dotsBox=$('#tDots');dotsBox.innerHTML='';
  themeCardEls=[];
  const pages=Math.ceil(THEMES.length/PER_PAGE);
  for(let p=0;p<pages;p++){
    const page=document.createElement('div');page.className='t-page';
    const grid=document.createElement('div');grid.className='t-grid';
    THEMES.slice(p*PER_PAGE,p*PER_PAGE+PER_PAGE).forEach(t=>{
      const b=document.createElement('button');
      b.className='theme'+(t.id===state.themeId?' on':'');
      const holder=document.createElement('span');holder.className='thcv';
      const c=document.createElement('canvas');c.width=c.height=300;
      paintThemeDemo(c,t);holder.append(c);
      const nm=document.createElement('span');nm.className='nm';nm.textContent=t.name;
      b.append(holder,nm);
      b.onclick=()=>{
        state.themeId=t.id;
        themeCardEls.forEach(({el,id})=>el.classList.toggle('on',id===t.id));
        buildOrbit();buildLayers();repaint();
      };
      themeCardEls.push({el:b,id:t.id});
      grid.append(b);
    });
    page.append(grid);track.append(page);
  }
  for(let i=0;i<pages;i++){
    const d=document.createElement('button');
    d.className='t-dot';d.title='Страница '+(i+1);
    d.onclick=()=>goThemePage(i);
    dotsBox.append(d);
  }
  const idx=THEMES.findIndex(t=>t.id===state.themeId);
  goThemePage(Math.floor(idx/PER_PAGE),true);
}

/* ───────── карточки слоёв ───────── */
const LOCK_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="11" width="12" height="9" rx="1.5"/><path d="M9 11V8a3 3 0 0 1 6 0v3"/></svg>';
const UNLOCK_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="11" width="12" height="9" rx="1.5"/><path d="M9 11V8a3 3 0 0 1 5.8-1"/></svg>';
const CARET='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
const DICE_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/><circle cx="8.2" cy="8.2" r="1.7" fill="currentColor" stroke="none"/><circle cx="15.8" cy="8.2" r="1.7" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="8.2" cy="15.8" r="1.7" fill="currentColor" stroke="none"/><circle cx="15.8" cy="15.8" r="1.7" fill="currentColor" stroke="none"/></svg>';

const VP_TILES=8; /* плиток на страницу вариантов */
function normHex(v){
  v=(v||'').trim();if(!v)return null;
  if(v[0]!=='#')v='#'+v;
  if(/^#[0-9a-fA-F]{3}$/.test(v))v='#'+v.slice(1).split('').map(c=>c+c).join('');
  return /^#[0-9a-fA-F]{6}$/.test(v)?v.toUpperCase():false;
}
function buildLayers(){
  const box=$('#layers');const theme=themeOf();
  const open=new Set([...box.querySelectorAll('.layer.open')].map(e=>e.dataset.id));
  const dotHTML=(c,L)=>`<button class="dot ${L.color&&L.color.toUpperCase()===c.toUpperCase()?'on':''}" data-c="${c}" style="background:${c}" title="${c}"></button>`;
  box.innerHTML='';
  for(const l of LAYERS){
    const L=state.layers[l.id];
    const el=document.createElement('div');
    el.className='layer'+(open.has(l.id)?' open':'');el.dataset.id=l.id;
    const schemeDots=[...theme.a,theme.ink].map(c=>dotHTML(c,L)).join('');
    const extraDots=(theme.x||[]).map(c=>dotHTML(c,L)).join('');
    el.innerHTML=`
      <div class="lrow">
        <button class="lbtn lock ${L.locked?'on':''}" title="${L.locked?'Разблокировать элемент':'Закрепить: не менять при генерации'}">${L.locked?LOCK_SVG:UNLOCK_SVG}</button>
        <button class="lname">${l.label}${CARET}</button>
        <span class="lvar">${varName(l.id,L.v)}</span>
        <button class="lbtn step" data-d="-1" title="Предыдущий вариант">‹</button>
        <button class="lbtn step" data-d="1" title="Следующий вариант">›</button>
        <button class="dice" title="Случайная версия этого элемента — другие слои не трогаются">${DICE_SVG}</button>
        <button class="cswatch" title="Цвет элемента" style="background:${L.color||roleColor(l.id,theme)}"></button>
      </div>
      <div class="lbody">
        <div class="lbl2"></div>
        <div class="v-viewport"><div class="v-track" data-track></div></div>
        <div class="v-nav">
          <button class="v-arrow" data-dir="-1" title="Предыдущая страница вариантов">‹</button>
          <div class="v-dots" data-vdots></div>
          <button class="v-arrow" data-dir="1" title="Следующая страница вариантов">›</button>
        </div>
        <div class="lbl2">ЦВЕТ</div>
        <div class="dots">${schemeDots}<span class="dotsep" title="Дополнительные сочетающиеся цвета"></span>${extraDots}</div>
        <div class="hexrow">
          <input type="color" class="cpick" title="Палитра — выбрать произвольный цвет" value="${(L.color||roleColor(l.id,theme)).toLowerCase()}">
          <input class="hexin" value="${L.color||''}" placeholder="HEX · например #FF5C39" spellcheck="false" maxlength="7">
          <button class="auto" title="Вернуть цвет темы">АВТО</button>
        </div>
      </div>`;
    const row=()=>el.querySelector('.lvar').textContent=varName(l.id,L.v);
    const sw=el.querySelector('.cswatch');
    const setSw=()=>{sw.style.background=L.color||roleColor(l.id,theme)};
    const hexin=el.querySelector('.hexin');
    const cpick=el.querySelector('.cpick');

    /* ── страницы вариантов ── */
    const track=el.querySelector('[data-track]');
    const dotsBox=el.querySelector('[data-vdots]');
    const all=VAR[l.id];
    const pages=[];
    for(let i=0;i<all.length;i+=VP_TILES)pages.push(all.slice(i,i+VP_TILES));
    let vPage=0;
    const vDots=[];
    pages.forEach(pg=>{
      const page=document.createElement('div');page.className='v-page';
      const grid=document.createElement('div');grid.className='vgrid';
      pg.forEach(v=>{
        const b=document.createElement('button');
        b.className='vtile'+(v.id===L.v?' on':'');
        b.dataset.v=v.id;b.title=v.name;
        const c=document.createElement('canvas');c.width=c.height=216;
        b.append(c);grid.append(b);
      });
      page.append(grid);track.append(page);
    });
    pages.forEach((_,i)=>{
      const d=document.createElement('button');
      d.className='v-dot';d.title='Страница '+(i+1);
      d.onclick=()=>setVPage(i);
      dotsBox.append(d);vDots.push(d);
    });
    function setVPage(i){
      vPage=Math.max(0,Math.min(pages.length-1,i));
      track.style.transform=`translateX(-${vPage*100}%)`;
      vDots.forEach((d,k)=>d.classList.toggle('on',k===vPage));
    }
    /* слой всегда открывается на ПЕРВОЙ странице */
    setVPage(0);
    el.querySelector('[data-dir="-1"]').onclick=()=>setVPage(vPage-1);
    el.querySelector('[data-dir="1"]').onclick=()=>setVPage(vPage+1);

    const tileBtns=[...el.querySelectorAll('.vtile')];
    const markTiles=()=>tileBtns.forEach(x=>x.classList.toggle('on',x.dataset.v===L.v));
    const repaintTiles=()=>{
      tileBtns.forEach(b=>paintTile(b.querySelector('canvas'),l.id,b.dataset.v));
    };
   const touchTiles=()=>repaintTiles();
    if(el.classList.contains('open'))repaintTiles();

    /* клик по плитке — только выбор варианта */
    tileBtns.forEach(b=>b.onclick=()=>{
      if(L.v===b.dataset.v)return;
      L.v=b.dataset.v;
      markTiles();row();repaint();
    });

    /* замок */
    el.querySelector('.lock').onclick=e=>{
      L.locked=!L.locked;
      const b=e.currentTarget;
      b.classList.toggle('on',L.locked);
      b.innerHTML=L.locked?LOCK_SVG:UNLOCK_SVG;
      b.title=L.locked?'Разблокировать элемент':'Закрепить: не менять при генерации';
      toast(L.locked?`${l.label}: ЭЛЕМЕНТ ЗАКРЕПЛЁН`:`${l.label}: ЭЛЕМЕНТ ОТПУЩЕН`);
    };
    /* раскрытие */
    el.querySelector('.lname').onclick=()=>{el.classList.toggle('open');if(el.classList.contains('open'))repaintTiles()};
    sw.onclick=()=>{el.classList.toggle('open');if(el.classList.contains('open'))repaintTiles()};
    /* стрелки вариантов — доводят страницу до выбранного варианта */
    el.querySelectorAll('.step').forEach(b=>b.onclick=()=>{
      const vs=VAR[l.id],d=+b.dataset.d;
      L.v=vs[(vs.findIndex(v=>v.id===L.v)+d+vs.length)%vs.length].id;
      markTiles();row();repaint();
      setVPage(Math.floor(VAR[l.id].findIndex(v=>v.id===L.v)/VP_TILES));
    });
    /* кубик — переброс версии только этого элемента */
    el.querySelector('.dice').onclick=e=>{
      L.sub=(Math.random()*1e9)|0;
      const b=e.currentTarget;
      b.classList.remove('spin');void b.offsetWidth;b.classList.add('spin');
      repaint();touchTiles();
    };

    /* цвета */
    const allDots=()=>el.querySelectorAll('.dot');
    const markDots=v=>allDots().forEach(x=>x.classList.toggle('on',!!v&&x.dataset.c.toUpperCase()===v.toUpperCase()));
    const syncPick=()=>{cpick.value=(L.color||roleColor(l.id,theme)).toLowerCase()};
    allDots().forEach(d=>d.onclick=()=>{
      L.color=d.dataset.c;
      repaint();setSw();touchTiles();syncPick();
      hexin.value=L.color;hexin.classList.remove('bad');
      markDots(L.color);
    });
    cpick.addEventListener('input',()=>{
      L.color=cpick.value.toUpperCase();
      repaint();setSw();touchTiles();
      hexin.value=L.color;hexin.classList.remove('bad');
      markDots(L.color);
    });
    hexin.addEventListener('input',()=>{
      const v=normHex(hexin.value);
      if(v===false){hexin.classList.add('bad');return}
      hexin.classList.remove('bad');
      L.color=v;
      repaint();setSw();touchTiles();syncPick();
      markDots(v);
    });
    el.querySelector('.auto').onclick=()=>{
      L.color=null;
      repaint();setSw();touchTiles();syncPick();
      hexin.value='';hexin.classList.remove('bad');
      allDots().forEach(x=>x.classList.remove('on'));
      toast(`${l.label}: ЦВЕТ ТЕМЫ ВОССТАНОВЛЕН`);
    };
    box.append(el);
  }
}

/* ───────── избранное ───────── */
const FAV_KEY='geopop.favs.v1';
let favs=(()=>{try{const r=localStorage.getItem(FAV_KEY);return r?JSON.parse(r):[]}catch(e){return[]}})();
function persistFavs(){try{localStorage.setItem(FAV_KEY,JSON.stringify(favs))}catch(e){toast('НЕ УДАЛОСЬ СОХРАНИТЬ ИЗБРАННОЕ',true)}}
function updateFavCount(){$('#favCount').textContent=favs.length;$('#gCount').textContent=favs.length}

function addFav(){
  const p=JSON.parse(JSON.stringify({seed:state.seed,themeId:state.themeId,size:512,layers:state.layers}));
  favs.unshift({id:Date.now()+'-'+Math.floor(Math.random()*9999),p});
  persistFavs();updateFavCount();
  const b=$('#btnLike');b.classList.add('liked');setTimeout(()=>b.classList.remove('liked'),450);
  toast('ДОБАВЛЕНО В ИЗБРАННОЕ');
}
function delFav(id){
  favs=favs.filter(f=>f.id!==id);
  persistFavs();updateFavCount();renderGallery();
  toast('УДАЛЕНО ИЗ ИЗБРАННОГО');
}
function applyFav(f){
  state.seed=f.p.seed;state.themeId=f.p.themeId;
  state.layers=JSON.parse(JSON.stringify(f.p.layers));
  state.size=512;
  document.querySelectorAll('#sizes button').forEach(b=>b.classList.toggle('on',b.dataset.s==='512'));
  buildThemes();buildOrbit();buildLayers();
  showView('editor');
  toast('ЗАГРУЖЕНО В РЕДАКТОР');
}

const IC={
 copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="1"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/></svg>',
 dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v10m0 0 4-4m-4 4-4-4M4 19h16"/></svg>',
 edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="M13.5 6.5l3 3"/></svg>',
 trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m3 0-1 13H8L7 7"/></svg>'};

function renderGallery(){
  const grid=$('#gGrid');grid.innerHTML='';
  $('#gEmpty').hidden=favs.length>0;
  updateFavCount();
  favs.forEach(f=>{
    const card=document.createElement('div');card.className='g-card';
    const th=document.createElement('div');th.className='g-thumb';
    const c=document.createElement('canvas');c.width=c.height=512;
    th.append(c);card.append(th);
    paint(f.p,c);
    const info=document.createElement('div');info.className='g-info';
    info.innerHTML=`<span>0x${seedHexOf(f.p.seed)}</span><span>${themeById(f.p.themeId).name}</span>`;
    const acts=document.createElement('div');acts.className='g-acts';
    const mk=(cls,ic,title,fn)=>{const b=document.createElement('button');b.className='ibtn '+cls;b.innerHTML=ic;b.title=title;b.onclick=fn;acts.append(b)};
    mk('',IC.copy,'Скопировать PNG',()=>copyCanvas(c,512));
    mk('',IC.dl,'Скачать PNG',()=>downloadCanvas(c,`geopop_${seedHexOf(f.p.seed)}_512px.png`));
    mk('edit',IC.edit,'Открыть в редакторе',()=>applyFav(f));
    mk('danger',IC.trash,'Удалить',()=>delFav(f.id));
    card.append(info,acts);
    grid.append(card);
  });
}

/* ───────── переключение видов ───────── */
let view='editor';
function showView(v){
  view=v;
  $('#editorView').hidden=v!=='editor';
  $('#galleryView').hidden=v!=='gallery';
  $('#favBtn').classList.toggle('on',v==='gallery');
  window.scrollTo({top:0});
  if(v==='gallery')renderGallery();
  else repaint();
}