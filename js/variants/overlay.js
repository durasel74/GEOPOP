'use strict';
/* GEOPOP · variants/overlay.js — ОВЕРЛЕИ (текстуры поверх всего).
   Вариант {id:'none'} «НЕТ» держи первым. */
VAR.overlay=[
 {id:'none',name:'НЕТ',draw(){}},
 {id:'grain',name:'ЗЕРНО',draw(ctx,col,t,rng){
   for(let i=0;i<1100;i++){
     ctx.fillStyle=rng()<.5?'rgba(20,18,15,.055)':'rgba(255,255,255,.10)';
     ctx.fillRect(rng()*512,rng()*512,1.6,1.6);
   }
 }},
 {id:'halftone',name:'ПОЛУТОН',draw(ctx,col,t,rng){
   const corner=Math.floor(rng()*4);
   const sx=corner%2?512:0,sy=corner<2?0:512;
   const dx=corner%2?-1:1,dy=corner<2?1:-1;
   ctx.fillStyle=rgba(t.ink,.18);
   for(let i=0;i<9;i++)for(let j=0;j<9;j++){
     const d=(i+j)/16,rad=Math.max(0,1-d)*9;
     if(rad<1.4)continue;
     circle(ctx,sx+dx*(16+i*22),sy+dy*(16+j*22),rad);
   }
 }},
 {id:'gloss',name:'БЛИК',draw(ctx,col,t,rng){
   ctx.save();ctx.translate(256,256);ctx.rotate(-Math.PI/5);
   const off=-170+rng()*150;
   ctx.fillStyle='rgba(255,255,255,.10)';
   ctx.fillRect(-420,off,840,128);
   ctx.fillRect(-420,off+152,840,40);
   ctx.restore();
 }},
 {id:'stripesO',name:'ПОЛОСЫ',draw(ctx,col,t){
   ctx.save();ctx.translate(256,256);ctx.rotate(-Math.PI/5);
   ctx.fillStyle=rgba(t.ink,.07);
   for(let x=-420;x<420;x+=58)ctx.fillRect(x,-500,22,1000);
   ctx.restore();
 }},
 {id:'cornerO',name:'УГОЛ',draw(ctx,col,t,rng){
   const k=Math.floor(rng()*4);
   const sx=k%2?512:0,sy=k<2?0:512;
   ctx.fillStyle=rgba(t.ink,.10);
   ctx.beginPath();ctx.arc(sx,sy,200,0,TAU);ctx.fill();
   ctx.strokeStyle=rgba(t.ink,.16);ctx.lineWidth=10;
   ctx.beginPath();ctx.arc(sx,sy,232,0,TAU);ctx.stroke();
   const ex=k%2?0:512,ey=k<2?512:0;
   const dx=ex?-70:70,dy=ey?-70:70;
   ctx.fillStyle=rgba(t.ink,.14);
   poly(ctx,[[ex,ey],[ex+dx,ey],[ex,ey+dy]]);ctx.fill();
 }},
 {id:'scanline',name:'ЛИНИИ',draw(ctx,col,t){
   ctx.fillStyle=rgba(t.ink,.06);
   for(let y=0;y<512;y+=8)ctx.fillRect(0,y,512,3);
 }},
 {id:'halftone2',name:'ПОЛУТОН×2',draw(ctx,col,t){
   ctx.fillStyle=rgba(t.ink,.14);
   [[0,0,1,1],[512,512,-1,-1]].forEach(([sx,sy,dx,dy])=>{
     for(let i=0;i<7;i++)for(let j=0;j<7;j++){
       const d=(i+j)/12,rad=Math.max(0,1-d)*8;
       if(rad<1.2)continue;
       circle(ctx,sx+dx*(14+i*24),sy+dy*(14+j*24),rad);
     }
   });
 }},
 {id:'dotgrid',name:'СЕТКА ТОЧЕК',draw(ctx,col,t){
   ctx.fillStyle=rgba(t.ink,.13);
   for(let y=24;y<512;y+=48)for(let x=24;x<512;x+=48)circle(ctx,x,y,3.5);
 }},
 {id:'edges',name:'КРАЯ',draw(ctx,col,t){
   ctx.strokeStyle=rgba(t.ink,.10);
   for(let i=0;i<4;i++){
     ctx.lineWidth=10;
     ctx.strokeRect(6+i*10,6+i*10,500-i*20,500-i*20);
   }
 }},
 {id:'topband',name:'ШАПКА',draw(ctx,col,t){
   ctx.fillStyle=rgba(t.ink,.08);ctx.fillRect(0,0,512,86);
   ctx.fillStyle=rgba(t.ink,.12);ctx.fillRect(0,86,512,6);
 }},
 {id:'crosshatch',name:'ШТРИХОВКА',draw(ctx,col,t){
   ctx.strokeStyle=rgba(t.ink,.07);ctx.lineWidth=3;
   for(let i=-512;i<512;i+=14){
     ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i+512,512);ctx.stroke();
     ctx.beginPath();ctx.moveTo(i+512,0);ctx.lineTo(i,512);ctx.stroke();
   }
 }},
 {id:'rain',name:'ДОЖДЬ',draw(ctx,col,t,rng){
   ctx.strokeStyle=rgba(t.ink,.10);ctx.lineWidth=4;ctx.lineCap='round';
   for(let i=0;i<40;i++){
     const x=rng()*512,y=rng()*512;
     ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-10,y+26);ctx.stroke();
   }
   ctx.lineCap='butt';
 }},
 {id:'inner',name:'ВНУТРЬ',draw(ctx,col,t){
   ctx.strokeStyle=rgba(t.ink,.25);ctx.lineWidth=8;
   ctx.strokeRect(58,58,396,396);
   ctx.fillStyle=rgba(t.ink,.14);
   [[58,58],[454,58],[58,454],[454,454]].forEach(([x,y])=>ctx.fillRect(x-8,y-8,16,16));
 }},
 {id:'archO',name:'АРКА',draw(ctx,col,t){
   ctx.fillStyle=rgba(t.ink,.09);
   ctx.beginPath();ctx.arc(256,330,180,Math.PI,0);ctx.lineTo(436,512);ctx.lineTo(76,512);ctx.closePath();ctx.fill();
   ctx.fillStyle=rgba(t.ink,.12);
   ctx.beginPath();ctx.arc(256,330,140,Math.PI,0);ctx.lineTo(396,512);ctx.lineTo(116,512);ctx.closePath();ctx.fill();
 }},
 {id:'sunburst',name:'СВЕЧЕНИЕ',draw(ctx,col,t,rng){
   ctx.fillStyle=rgba(t.ink,.06);
   const n=12,rot=rng()*TAU/n;
   for(let i=0;i<n;i+=2){
     const a0=rot+i/n*TAU,a1=rot+(i+1)/n*TAU;
     ctx.beginPath();ctx.moveTo(256,256);
     ctx.lineTo(256+Math.cos(a0)*700,256+Math.sin(a0)*700);
     ctx.lineTo(256+Math.cos(a1)*700,256+Math.sin(a1)*700);
     ctx.closePath();ctx.fill();
   }
 }},
 {id:'confettiO',name:'СЕРПАНТИН',draw(ctx,col,t,rng){
   for(let i=0;i<26;i++){
     ctx.save();ctx.translate(rng()*512,rng()*512);ctx.rotate(rng()*TAU);
     ctx.fillStyle=i%3===0?rgba(t.ink,.16):rgba(t.ink,.09);
     ctx.fillRect(-7,-3,14,6);
     ctx.restore();
   }
 }},
 {id:'waveO',name:'ВОЛНЫ',draw(ctx,col,t){
   ctx.strokeStyle=rgba(t.ink,.08);ctx.lineWidth=5;
   for(let b=0;b<6;b++){
     const y0=40+b*84;
     ctx.beginPath();ctx.moveTo(0,y0);
     for(let x=0;x<512;x+=64)ctx.quadraticCurveTo(x+32,y0+18,x+64,y0);
     ctx.stroke();
   }
 }},
 {id:'halfTint',name:'ПОЛТИНТА',draw(ctx,col,t,rng){
   const vert=rng()<.5;
   ctx.fillStyle=rgba(t.ink,.07);
   if(vert)ctx.fillRect(256,0,256,512);else ctx.fillRect(0,256,512,256);
   ctx.strokeStyle=rgba(t.ink,.15);ctx.lineWidth=6;
   if(vert){ctx.beginPath();ctx.moveTo(256,0);ctx.lineTo(256,512);ctx.stroke()}
   else{ctx.beginPath();ctx.moveTo(0,256);ctx.lineTo(512,256);ctx.stroke()}
 }},
 {id:'circlesO',name:'ОРБИТЫ',draw(ctx,col,t){
   ctx.strokeStyle=rgba(t.ink,.10);ctx.lineWidth=12;
   ctx.beginPath();ctx.arc(140,150,110,0,TAU);ctx.stroke();
   ctx.beginPath();ctx.arc(390,380,140,0,TAU);ctx.stroke();
   ctx.fillStyle=rgba(t.ink,.06);
   circle(ctx,390,120,60);
 }},
 {id:'checkerO',name:'ШАХМАТКА',draw(ctx,col,t){
   ctx.fillStyle=rgba(t.ink,.05);
   const s=64;
   for(let y=0;y<8;y++)for(let x=0;x<8;x++)if((x+y)%2===0)ctx.fillRect(x*s,y*s,s,s);
 }},
 {id:'sealO',name:'ПЕЧАТЬ',draw(ctx,col,t){
   ctx.strokeStyle=rgba(t.ink,.14);ctx.lineWidth=10;
   ctx.beginPath();ctx.arc(256,256,206,0,TAU);ctx.stroke();
   ctx.fillStyle=rgba(t.ink,.14);
   circle(ctx,256,50,14);circle(ctx,256,462,14);
   circle(ctx,50,256,14);circle(ctx,462,256,14);
 }},
 {id:'grain2',name:'ШУМ',draw(ctx,col,t,rng){
   for(let i=0;i<2400;i++){
     ctx.fillStyle=rng()<.5?'rgba(20,18,15,.07)':'rgba(255,255,255,.14)';
     ctx.fillRect(rng()*512,rng()*512,2,2);
   }
 }},
 {id:'cornersO',name:'УГЛЫ',draw(ctx,col,t){
   ctx.fillStyle=rgba(t.ink,.10);
   poly(ctx,[[0,0],[130,0],[0,130]]);ctx.fill();
   poly(ctx,[[512,0],[512,130],[382,0]]);ctx.fill();
   poly(ctx,[[0,512],[0,382],[130,512]]);ctx.fill();
   poly(ctx,[[512,512],[382,512],[512,382]]);ctx.fill();
 }},
];