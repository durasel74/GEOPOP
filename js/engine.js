'use strict';
/* GEOPOP · engine.js — конфигурация слоёв, состояние, отрисовка на canvas,
   детерминированная генерация и экспорт PNG. */

/* ───────── конфигурация слоёв ─────────
   noneW — вероятность, что слой при генерации окажется «НЕТ» (0 — всегда есть);
   salt  — соль для независимого рандома внутри слоя. */
const LAYERS=[
 {id:'bg',     label:'ФОН',     noneW:0,   salt:11},
 {id:'emblem', label:'ЭМБЛЕМА', noneW:0,   salt:23},
 {id:'frame',  label:'РАМКА',   noneW:.16, salt:37},
 {id:'accents',label:'АКЦЕНТЫ', noneW:.24, salt:41},
 {id:'overlay',label:'ОВЕРЛЕЙ', noneW:.16, salt:53},
];
/* порядок наложения слоёв при отрисовке */
const DRAW_ORDER=['bg','frame','emblem','accents','overlay'];

/* ───────── состояние приложения ───────── */
const state={
  seed:(Math.random()*0xFFFFFF)|0,
  size:512, themeId:THEMES[0].id,
  layers:Object.fromEntries(LAYERS.map(l=>[l.id,{v:VAR[l.id][0].id,color:null,locked:false,sub:0}])),
};
const seedHexOf=s=>(s>>>0).toString(16).toUpperCase().padStart(6,'0');
const seedHex=()=>seedHexOf(state.seed);
const themeOf=()=>THEMES.find(t=>t.id===state.themeId);
const themeById=id=>THEMES.find(t=>t.id===id)||THEMES[0];
const roleColor=(id,t)=>ROLE[id](t);
const varName=(lid,v)=>{const f=VAR[lid].find(x=>x.id===v);return f?f.name:'—'};

/* случайный выбор варианта слоя (с учётом веса «НЕТ» и замков) */
function pickVar(lid){
  const cfg=LAYERS.find(x=>x.id===lid);
  if(cfg.noneW&&Math.random()<cfg.noneW)return'none';
  const pool=VAR[lid].filter(v=>v.id!=='none');
  return pool[Math.floor(Math.random()*pool.length)].id;
}
function randomizeLayers(){
  for(const l of LAYERS){const L=state.layers[l.id];if(L.locked)continue;L.v=pickVar(l.id);L.sub=(Math.random()*1e9)|0}
  state.seed=(Math.random()*0xFFFFFF)|0;
}

/* ───────── отрисовка ───────── */
const cv=$('#cv');
/* p: {seed, themeId, size, layers:{id:{v,color,sub}}} — рисует в target или в главный canvas */
function paint(p,target){
  const cvs=target||cv;
  if(cvs.width!==p.size){cvs.width=cvs.height=p.size}
  S=p.size/512;
  const ctx=cvs.getContext('2d');
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,cvs.width,cvs.height);
  ctx.scale(S,S);
  const t=themeById(p.themeId);
  for(const id of DRAW_ORDER){
    const layer=p.layers[id];
    const vd=VAR[id].find(v=>v.id===layer.v)||VAR[id][0];
    const col=layer.color||roleColor(id,t);
    const rng=mulberry32(((p.seed^(id.charCodeAt(0)*2654435761))>>>0)^(layer.sub||0));
    ctx.save();
    try{vd.draw(ctx,col,t,rng)}catch(e){}
    ctx.restore();
  }
  ctx.setTransform(1,0,0,1,0,0);
}

/* мини-превью первого варианта слоя; «НЕТ» — белая плитка с крестиком */
function paintTile(c,lid,vid){
  const theme=themeOf(),L=state.layers[lid];
  const x=c.getContext('2d');
  x.setTransform(1,0,0,1,0,0);
  x.clearRect(0,0,c.width,c.height);
  if(vid==='none'){
    x.fillStyle='#FFFFFF';x.fillRect(0,0,c.width,c.height);
    const u=c.width/100;
    x.strokeStyle='rgba(25,23,19,.42)';x.lineWidth=7*u;x.lineCap='round';
    x.beginPath();
    x.moveTo(33*u,33*u);x.lineTo(67*u,67*u);
    x.moveTo(67*u,33*u);x.lineTo(33*u,67*u);
    x.stroke();
    return;
  }
  x.fillStyle=theme.bg;x.fillRect(0,0,c.width,c.height);
  const layers={};
  for(const l of LAYERS)layers[l.id]={v:l.id===lid?vid:'none',color:l.id===lid?L.color:null,sub:l.id===lid?L.sub:0};
  paint({seed:state.seed,themeId:theme.id,size:c.width,layers},c);
}

function syncMeta(){
  const elSeed=$('#mSeed'),elMeta=$('#meta');
  if(elSeed)elSeed.textContent='0x'+seedHex();
  if(elMeta)elMeta.textContent=`SEED 0x${seedHex()} · ${themeOf().name} · ${state.size}×${state.size}`;
}

/* ───────── экспорт PNG ───────── */
async function copyCanvas(cvs,size){
  try{
    if(!navigator.clipboard||!window.ClipboardItem)throw new Error('no-api');
    const blob=await new Promise(r=>cvs.toBlob(r,'image/png'));
    try{await navigator.clipboard.write([new ClipboardItem({'image/png':blob})])}
    catch(e){await navigator.clipboard.write([new ClipboardItem({'image/png':new Promise(r=>cvs.toBlob(r,'image/png'))})])}
    toast(`СКОПИРОВАНО В БУФЕР · PNG ${size}PX`);
  }catch(e){toast('БУФЕР НЕДОСТУПЕН В ЭТОМ БРАУЗЕРЕ — СКАЧАЙТЕ PNG',true)}
}
function downloadCanvas(cvs,name){
  const a=document.createElement('a');
  a.download=name;a.href=cvs.toDataURL('image/png');
  document.body.append(a);a.click();a.remove();
  toast('СОХРАНЕНО: '+name);
}