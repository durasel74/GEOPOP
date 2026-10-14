'use strict';
/* GEOPOP · variants/frame.js — РАМКИ. Вариант {id:'none'} «НЕТ» держи первым. */
VAR.frame=[
 {id:'none',name:'НЕТ',draw(){}},
 {id:'ring',name:'КОЛЬЦО',draw(ctx,col){
   ctx.strokeStyle=col;ctx.lineWidth=24;
   ctx.beginPath();ctx.arc(256,256,238,0,TAU);ctx.stroke();
 }},
 {id:'double',name:'ДВОЙНОЕ',draw(ctx,col,t){
   ctx.strokeStyle=col;ctx.lineWidth=18;
   ctx.beginPath();ctx.arc(256,256,242,0,TAU);ctx.stroke();
   ctx.strokeStyle=t.ink;ctx.lineWidth=7;
   ctx.beginPath();ctx.arc(256,256,218,0,TAU);ctx.stroke();
 }},
 {id:'frame',name:'РАМКА',draw(ctx,col,t){
   ctx.strokeStyle=t.ink;ctx.lineWidth=14;ctx.strokeRect(28,28,456,456);
   ctx.fillStyle=col;
   [[256,28],[256,484],[28,256],[484,256]].forEach(([x,y])=>ctx.fillRect(x-14,y-14,28,28));
 }},
 {id:'ticks',name:'ПУНКТИР',draw(ctx,col,t){
   for(let i=0;i<24;i++){const a=i/24*TAU,big=i%6===0;
     ctx.fillStyle=big?t.ink:col;
     circle(ctx,256+Math.cos(a)*244,256+Math.sin(a)*244,big?11:6.5)}
 }},
 {id:'arc',name:'РАЗРЫВ',draw(ctx,col,t){
   ctx.strokeStyle=col;ctx.lineWidth=22;ctx.lineCap='round';
   ctx.beginPath();ctx.arc(256,256,238,-0.5,TAU-1.7);ctx.stroke();
   ctx.fillStyle=t.ink;
   circle(ctx,256+Math.cos(-0.5)*238,256+Math.sin(-0.5)*238,12);
   circle(ctx,256+Math.cos(TAU-1.7)*238,256+Math.sin(TAU-1.7)*238,12);
   ctx.lineCap='butt';
 }},
 {id:'square',name:'КВАДРАТ',draw(ctx,col,t){
   rr(ctx,36,36,440,440,26);
   ctx.strokeStyle=col;ctx.lineWidth=22;ctx.stroke();
   ctx.fillStyle=t.ink;
   [[256,36],[256,476],[36,256],[476,256]].forEach(([x,y])=>circle(ctx,x,y,11));
 }},
 {id:'tris',name:'ТРЕУГ.',draw(ctx,col,t){
   const n=16;
   for(let i=0;i<n;i++){
     const a=i/n*TAU-Math.PI/2;
     poly(ctx,[
       [256+Math.cos(a)*216,256+Math.sin(a)*216],
       [256+Math.cos(a-.1)*258,256+Math.sin(a-.1)*258],
       [256+Math.cos(a+.1)*258,256+Math.sin(a+.1)*258]
     ]);
     ctx.fillStyle=i%4===0?t.ink:col;ctx.fill();
   }
 }},
 {id:'arcs',name:'ДУГИ',draw(ctx,col,t){
   ctx.strokeStyle=col;ctx.lineWidth=20;ctx.lineCap='round';
   for(let k=0;k<4;k++){
     const ca=-Math.PI/4+k*Math.PI/2;
     ctx.beginPath();ctx.arc(256,256,240,ca-.5,ca+.5);ctx.stroke();
   }
   ctx.lineCap='butt';ctx.fillStyle=t.ink;
   for(let k=0;k<4;k++){
     const a=k*Math.PI/2;
     circle(ctx,256+Math.cos(a)*240,256+Math.sin(a)*240,9);
   }
 }},
 {id:'dotsF',name:'ТОЧКИ',draw(ctx,col,t){
   for(let i=0;i<16;i++){
     const a=i/16*TAU;
     ctx.fillStyle=i%4===0?t.ink:col;
     circle(ctx,256+Math.cos(a)*240,256+Math.sin(a)*240,13);
   }
 }},
 {id:'waveF',name:'ЧЕШУЯ',draw(ctx,col){
   const R=238,n=12;
   ctx.strokeStyle=col;ctx.lineWidth=14;
   for(let i=0;i<n;i++){
     const a=i/n*TAU;
     const x=256+Math.cos(a)*R,y=256+Math.sin(a)*R;
     ctx.beginPath();ctx.arc(x,y,26,a-Math.PI/2,a+Math.PI/2);ctx.stroke();
   }
 }},
 {id:'corners',name:'УГЛЫ',draw(ctx,col,t){
   ctx.strokeStyle=col;ctx.lineWidth=18;ctx.lineCap='round';
   const o=52,l=88;
   [[o,o,1,1],[512-o,o,-1,1],[o,512-o,1,-1],[512-o,512-o,-1,-1]].forEach(([x,y,dx,dy])=>{
     ctx.beginPath();ctx.moveTo(x+dx*l,y);ctx.lineTo(x,y);ctx.lineTo(x,y+dy*l);ctx.stroke();
   });
   ctx.lineCap='butt';ctx.fillStyle=t.ink;
   circle(ctx,256,46,9);circle(ctx,256,466,9);circle(ctx,46,256,9);circle(ctx,466,256,9);
 }},
 {id:'hexF',name:'ГЕКС',draw(ctx,col,t){
   ctx.beginPath();
   for(let i=0;i<6;i++){
     const a=-Math.PI/2+i*Math.PI/3;
     const x=256+Math.cos(a)*242,y=256+Math.sin(a)*242;
     i?ctx.lineTo(x,y):ctx.moveTo(x,y);
   }
   ctx.closePath();
   ctx.strokeStyle=col;ctx.lineWidth=20;ctx.lineJoin='round';ctx.stroke();
   ctx.fillStyle=t.ink;
   for(let i=0;i<6;i++){
     const a=-Math.PI/2+i*Math.PI/3;
     circle(ctx,256+Math.cos(a)*242,256+Math.sin(a)*242,11);
   }
 }},
 {id:'chain',name:'ЦЕПЬ',draw(ctx,col){
   const R=238,n=12;
   ctx.strokeStyle=col;ctx.lineWidth=13;
   for(let i=0;i<n;i++){
     const a=i/n*TAU;
     const x=256+Math.cos(a)*R,y=256+Math.sin(a)*R;
     ctx.beginPath();
     if(i%2)ctx.arc(x,y,24,a+Math.PI/2,a+Math.PI*1.5);
     else ctx.arc(x,y,24,a-Math.PI/2,a+Math.PI/2);
     ctx.stroke();
   }
 }},
 {id:'zigF',name:'ЗИГЗАГ',draw(ctx,col){
   const R1=224,R2=252,n=28;
   ctx.beginPath();
   for(let i=0;i<=n;i++){
     const a=i/n*TAU-Math.PI/2;
     const r=i%2?R2:R1;
     const x=256+Math.cos(a)*r,y=256+Math.sin(a)*r;
     i?ctx.lineTo(x,y):ctx.moveTo(x,y);
   }
   ctx.closePath();
   ctx.strokeStyle=col;ctx.lineWidth=10;ctx.lineJoin='miter';ctx.stroke();
 }},
 {id:'petals',name:'ЛЕПЕСТКИ',draw(ctx,col,t){
   const n=10;
   for(let i=0;i<n;i++){
     const a=i/n*TAU;
     const x=256+Math.cos(a)*236,y=256+Math.sin(a)*236;
     ctx.fillStyle=i%3===0?t.ink:col;
     ctx.beginPath();ctx.arc(x,y,22,a-Math.PI/2,a+Math.PI/2);ctx.closePath();ctx.fill();
   }
 }},
 {id:'segments',name:'СЕГМЕНТЫ',draw(ctx,col,t){
   const n=8;
   for(let i=0;i<n;i++){
     const a0=i/n*TAU+.06,a1=(i+1)/n*TAU-.06;
     ctx.strokeStyle=i%2?t.ink:col;
     ctx.lineWidth=22;
     ctx.beginPath();ctx.arc(256,256,238,a0,a1);ctx.stroke();
   }
 }},
 {id:'orbit',name:'ОРБИТА',draw(ctx,col,t){
   ctx.save();ctx.translate(256,256);ctx.rotate(-.5);
   ctx.strokeStyle=rgba(t.ink,.35);ctx.lineWidth=10;
   ctx.beginPath();ctx.ellipse(0,0,268,150,0,0,TAU);ctx.stroke();
   ctx.fillStyle=col;
   circle(ctx,268,0,20);ctx.lineWidth=6;ctx.strokeStyle=t.ink;ctx.stroke();
   circle(ctx,-268,0,20);ctx.stroke();
   ctx.restore();
 }},
 {id:'film',name:'ПЛЁНКА',draw(ctx,col,t){
   ctx.strokeStyle=t.ink;ctx.lineWidth=6;
   ctx.strokeRect(24,24,464,464);
   ctx.fillStyle=col;
   for(let x=64;x<460;x+=52){
     ctx.fillRect(x-13,38,26,20);
     ctx.fillRect(x-13,454,26,20);
   }
   for(let y=116;y<460;y+=52){
     ctx.fillRect(38,y-13,20,26);
     ctx.fillRect(454,y-13,20,26);
   }
 }},
 {id:'pearls',name:'ЖЕМЧУГ',draw(ctx,col,t){
   for(let i=0;i<20;i++){
     const a=i/20*TAU;
     ctx.fillStyle=i%2?t.ink:col;
     circle(ctx,256+Math.cos(a)*240,256+Math.sin(a)*240,i%2?9:16);
   }
 }},
 {id:'stamp',name:'МАРКА',draw(ctx,col,t){
   ctx.fillStyle=col;
   const n=10,step=512/(n+1);
   for(let i=1;i<=n;i++){
     circle(ctx,i*step,24,13);circle(ctx,i*step,488,13);
     circle(ctx,24,i*step,13);circle(ctx,488,i*step,13);
   }
   ctx.strokeStyle=rgba(t.ink,.5);ctx.lineWidth=4;
   ctx.strokeRect(52,52,408,408);
 }},
 {id:'halfF',name:'ПОЛУ',draw(ctx,col,t){
   ctx.lineWidth=24;
   ctx.strokeStyle=col;
   ctx.beginPath();ctx.arc(256,256,238,Math.PI,TAU);ctx.stroke();
   ctx.strokeStyle=t.ink;
   ctx.beginPath();ctx.arc(256,256,238,0,Math.PI);ctx.stroke();
 }},
 {id:'cross4',name:'КРЕСТЫ',draw(ctx,col,t){
   ctx.strokeStyle=rgba(t.ink,.3);ctx.lineWidth=8;
   ctx.beginPath();ctx.arc(256,256,238,0,TAU);ctx.stroke();
   ctx.fillStyle=col;
   [[256,30],[256,482],[30,256],[482,256]].forEach(([x,y])=>{
     ctx.fillRect(x-9,y-26,18,52);ctx.fillRect(x-26,y-9,52,18);
   });
 }},
 {id:'burstF',name:'ЛУЧИ',draw(ctx,col){
   ctx.strokeStyle=col;ctx.lineWidth=10;ctx.lineCap='round';
   for(let i=0;i<24;i++){
     const a=i/24*TAU;
     const r0=i%2?216:228,r1=i%2?246:258;
     ctx.beginPath();
     ctx.moveTo(256+Math.cos(a)*r0,256+Math.sin(a)*r0);
     ctx.lineTo(256+Math.cos(a)*r1,256+Math.sin(a)*r1);
     ctx.stroke();
   }
   ctx.lineCap='butt';
 }},
];