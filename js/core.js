'use strict';
/* GEOPOP · core.js — утилиты: генератор случайности, работа с цветом,
   примитивы фигур, реестр вариантов VAR.
   Реестр VAR наполняется в js/variants/*.js — порядок скриптов в index.html важен. */

const $=s=>document.querySelector(s);
const TAU=Math.PI*2;
let S=1; /* масштаб отрисовки: размер canvas / 512 */

/* детерминированный ГПСЧ: один и тот же seed → одна и та же картинка */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

/* hex → rgba-строка */
function rgba(hex,a){let h=hex.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return`rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`}

/* смешение двух hex-цветов (k: 0..1) */
function mix(a,b,k){const A=parseInt(a.slice(1),16),B=parseInt(b.slice(1),16);
  const r=Math.round(((A>>16)&255)*(1-k)+((B>>16)&255)*k),
        g=Math.round(((A>>8)&255)*(1-k)+((B>>8)&255)*k),
        bl=Math.round((A&255)*(1-k)+(B&255)*k);
  return`rgb(${r},${g},${bl})`}

/* примитивы фигур */
function circle(ctx,x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill()}
function poly(ctx,pts,close=true){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));if(close)ctx.closePath()}
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}

/* набор цветов эмблемы [primary, secondary, ink]: учитывает ручной цвет слоя */
function emCols(t,ov,rng){
  if(ov){const pool=t.a.filter(c=>c.toUpperCase()!==ov.toUpperCase());
    const b=pool.length?pool[Math.floor(rng()*pool.length)]:t.ink;
    return[ov,b,t.ink]}
  const i=Math.floor(rng()*t.a.length);
  const j=(i+1+Math.floor(rng()*(t.a.length-1)))%t.a.length;
  return[t.a[i],t.a[j],t.ink]}

/* акцентный цвет для фона (ручной или случайный из темы) */
function bgAcc(t,ov,rng){return ov||t.a[Math.floor(rng()*t.a.length)]}

/* второй цвет, не совпадающий с уже использованными */
function secColor(t,used,rng){const pool=t.a.filter(x=>!used.includes(x.toUpperCase()));return pool.length?pool[Math.floor(rng()*pool.length)]:t.ink}

/* ── реестр вариантов слоёв ──
   Ключи: bg, emblem, frame, accents, overlay.
   Каждый вариант: {id, name, draw(ctx, col, t, rng)}. */
const VAR={};