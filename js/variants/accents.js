'use strict';
/* GEOPOP · variants/accents.js — АКЦЕНТЫ (мелкие фигуры вокруг эмблемы).
   Вариант {id:'none'} «НЕТ» держи первым. */
VAR.accents=[
 {id:'none',name:'НЕТ',draw(){}},
 {id:'confetti',name:'КОНФЕТТИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<9;i++){
     const a=(i/9)*TAU+rng()*.6,r=170+rng()*56;
     const x=256+Math.cos(a)*r,y=256+Math.sin(a)*r,k=Math.floor(rng()*4),c=cs[Math.floor(rng()*3)];
     ctx.save();ctx.translate(x,y);ctx.rotate(rng()*TAU);ctx.fillStyle=c;
     if(k===0)circle(ctx,0,0,7);
     else if(k===1)ctx.fillRect(-7,-7,14,14);
     else if(k===2){poly(ctx,[[0,-9],[8,6],[-8,6]]);ctx.fill()}
     else{ctx.beginPath();ctx.arc(0,0,8,0,Math.PI);ctx.closePath();ctx.fill()}
     ctx.restore();
   }
 }},
 {id:'sparks',name:'ИСКРЫ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<5;i++){
     const a=(i/5)*TAU+rng()*.7,r=176+rng()*46;
     const x=256+Math.cos(a)*r,y=256+Math.sin(a)*r,s=11+rng()*13;
     ctx.beginPath();ctx.moveTo(x,y-s);
     ctx.quadraticCurveTo(x+s*.18,y-s*.18,x+s,y);ctx.quadraticCurveTo(x+s*.18,y+s*.18,x,y+s);
     ctx.quadraticCurveTo(x-s*.18,y+s*.18,x-s,y);ctx.quadraticCurveTo(x-s*.18,y-s*.18,x,y-s);
     ctx.closePath();ctx.fillStyle=cs[Math.floor(rng()*3)];ctx.fill();
   }
 }},
 {id:'plus',name:'КРЕСТИКИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<5;i++){
     const a=(i/5)*TAU+rng()*.7,r=176+rng()*48;
     ctx.save();ctx.translate(256+Math.cos(a)*r,256+Math.sin(a)*r);
     ctx.rotate(rng()<.5?0:Math.PI/4);
     ctx.fillStyle=cs[Math.floor(rng()*3)];
     ctx.fillRect(-10,-3,20,6);ctx.fillRect(-3,-10,6,20);
     ctx.restore();
   }
 }},
 {id:'rings',name:'КОЛЬЦА',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<4;i++){
     const a=(i/4)*TAU+rng()*.8,r=178+rng()*46;
     ctx.strokeStyle=cs[Math.floor(rng()*3)];ctx.lineWidth=7;
     ctx.beginPath();ctx.arc(256+Math.cos(a)*r,256+Math.sin(a)*r,9+rng()*8,0,TAU);ctx.stroke();
   }
 }},
 {id:'raysA',name:'ЛУЧИКИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   ctx.lineCap='round';ctx.lineWidth=9;
   for(let i=0;i<8;i++){
     const a=i/8*TAU+rng()*.15;
     const r0=176+rng()*8,r1=206+rng()*10;
     ctx.strokeStyle=cs[i%3];
     ctx.beginPath();
     ctx.moveTo(256+Math.cos(a)*r0,256+Math.sin(a)*r0);
     ctx.lineTo(256+Math.cos(a)*r1,256+Math.sin(a)*r1);
     ctx.stroke();
   }
   ctx.lineCap='butt';
 }},
 {id:'hearts',name:'СЕРДЦА',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   const heart=(x,y,s,c)=>{
     ctx.fillStyle=c;
     circle(ctx,x-s*.32,y-s*.1,s*.34);
     circle(ctx,x+s*.32,y-s*.1,s*.34);
     poly(ctx,[[x-s*.62,y+s*.02],[x+s*.62,y+s*.02],[x,y+s*.72]]);ctx.fill();
   };
   for(let i=0;i<5;i++){
     const a=i/5*TAU+.5;
     heart(256+Math.cos(a)*190,256+Math.sin(a)*190,26+rng()*10,cs[i%3]);
   }
 }},
 {id:'drops',name:'КАПЛИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   const drop=(x,y,s,c)=>{
     ctx.fillStyle=c;
     poly(ctx,[[x,y-s*.9],[x+s*.5,y+s*.1],[x-s*.5,y+s*.1]]);ctx.fill();
     circle(ctx,x,y+s*.15,s*.42);
   };
   for(let i=0;i<4;i++){
     const a=i/4*TAU+.9;
     drop(256+Math.cos(a)*188,256+Math.sin(a)*188,30+rng()*12,cs[i%3]);
   }
 }},
 {id:'starsA',name:'ЗВЁЗДЫ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   const star4=(x,y,s,c)=>{
     ctx.fillStyle=c;
     poly(ctx,[[x,y-s],[x+s*.22,y-s*.22],[x+s,y],[x+s*.22,y+s*.22],[x,y+s],[x-s*.22,y+s*.22],[x-s,y],[x-s*.22,y-s*.22]]);
     ctx.fill();
   };
   for(let i=0;i<6;i++){
     const a=i/6*TAU+.3,r=172+rng()*52;
     star4(256+Math.cos(a)*r,256+Math.sin(a)*r,13+rng()*9,cs[i%3]);
   }
 }},
 {id:'moons',name:'ЛУНЫ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<5;i++){
     const a=i/5*TAU+.6,r=178+rng()*46;
     const x=256+Math.cos(a)*r,y=256+Math.sin(a)*r,s=17+rng()*7;
     ctx.fillStyle=cs[i%3];
     ctx.beginPath();
     ctx.arc(x,y,s,0,TAU);
     ctx.moveTo(x+s*.55,y);
     ctx.arc(x+s*.55,y,s*.7,0,TAU);
     ctx.fill('evenodd');
   }
 }},
 {id:'triA',name:'ТРЕУГОЛЬНИКИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<6;i++){
     const a=i/6*TAU+.2,r=176+rng()*50;
     ctx.save();ctx.translate(256+Math.cos(a)*r,256+Math.sin(a)*r);ctx.rotate(a+Math.PI/2);
     ctx.fillStyle=cs[i%3];
     poly(ctx,[[0,-13],[11,8],[-11,8]]);ctx.fill();
     ctx.restore();
   }
 }},
 {id:'sqA',name:'КВАДРАТЫ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<5;i++){
     const a=i/5*TAU+.5,r=178+rng()*48;
     ctx.save();ctx.translate(256+Math.cos(a)*r,256+Math.sin(a)*r);
     ctx.rotate(rng()*TAU);ctx.fillStyle=cs[i%3];
     ctx.fillRect(-11,-11,22,22);
     ctx.restore();
   }
 }},
 {id:'bubblesA',name:'ПУЗЫРИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<6;i++){
     const a=i/6*TAU+.9,r=170+rng()*56;
     const x=256+Math.cos(a)*r,y=256+Math.sin(a)*r,rad=10+rng()*10;
     if(i%2){ctx.fillStyle=cs[i%3];circle(ctx,x,y,rad)}
     else{ctx.strokeStyle=cs[i%3];ctx.lineWidth=6;
       ctx.beginPath();ctx.arc(x,y,rad,0,TAU);ctx.stroke()}
   }
 }},
 {id:'dashes',name:'ШТРИХИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   ctx.lineWidth=8;ctx.lineCap='round';
   for(let i=0;i<10;i++){
     const a=i/10*TAU+rng()*.2;
     ctx.strokeStyle=cs[i%3];
     ctx.beginPath();ctx.arc(256,256,206,a,a+.28);ctx.stroke();
   }
   ctx.lineCap='butt';
 }},
 {id:'smiles',name:'ДУЖКИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   ctx.lineWidth=8;ctx.lineCap='round';
   for(let i=0;i<5;i++){
     const a=i/5*TAU+.4,r=180+rng()*48;
     const x=256+Math.cos(a)*r,y=256+Math.sin(a)*r;
     ctx.strokeStyle=cs[i%3];
     ctx.beginPath();ctx.arc(x,y,14,Math.PI*1.15,Math.PI*1.85);ctx.stroke();
   }
   ctx.lineCap='butt';
 }},
 {id:'leaves',name:'ЛИСТЬЯ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<5;i++){
     const a=i/5*TAU+.2,r=180+rng()*46;
     ctx.save();ctx.translate(256+Math.cos(a)*r,256+Math.sin(a)*r);ctx.rotate(a+Math.PI/4);
     ctx.fillStyle=cs[i%3];
     ctx.beginPath();
     ctx.moveTo(0,-18);
     ctx.quadraticCurveTo(14,0,0,18);
     ctx.quadraticCurveTo(-14,0,0,-18);
     ctx.closePath();ctx.fill();
     ctx.restore();
   }
 }},
 {id:'arrowsA',name:'СТРЕЛКИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<5;i++){
     const a=i/5*TAU+.7,r=186+rng()*40;
     ctx.save();ctx.translate(256+Math.cos(a)*r,256+Math.sin(a)*r);ctx.rotate(a+Math.PI/2);
     ctx.fillStyle=cs[i%3];
     poly(ctx,[[0,-14],[11,6],[0,1],[-11,6]]);ctx.fill();
     ctx.restore();
   }
 }},
 {id:'zigA',name:'ЗУБЦЫ',draw(ctx,col){
   const n=24,R=210;
   ctx.strokeStyle=col;ctx.lineWidth=7;ctx.lineJoin='miter';
   ctx.beginPath();
   for(let i=0;i<=n;i++){
     const a=i/n*TAU-Math.PI/2;
     const r=i%2?R:R+26;
     const x=256+Math.cos(a)*r,y=256+Math.sin(a)*r;
     i?ctx.lineTo(x,y):ctx.moveTo(x,y);
   }
   ctx.closePath();ctx.stroke();
 }},
 {id:'boltsA',name:'МОЛНИИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<5;i++){
     const a=i/5*TAU+.35,r=176+rng()*52;
     ctx.save();ctx.translate(256+Math.cos(a)*r,256+Math.sin(a)*r);ctx.rotate(a-Math.PI/2);
     ctx.fillStyle=cs[i%3];
     poly(ctx,[[4,-16],[-8,2],[-1,2],[-4,16],[9,-3],[1,-3]]);ctx.fill();
     ctx.restore();
   }
 }},
 {id:'clover',name:'КЛЕВЕР',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<4;i++){
     const a=i/4*TAU+.4,r=182+rng()*48;
     const x=256+Math.cos(a)*r,y=256+Math.sin(a)*r;
     ctx.fillStyle=cs[i%3];
     circle(ctx,x-7,y-7,8);circle(ctx,x+7,y-7,8);circle(ctx,x,y+7,8);
     poly(ctx,[[x,y+4],[x-3,y+14],[x+3,y+14]]);ctx.fill();
   }
 }},
 {id:'pillow',name:'ПОДУШКИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<5;i++){
     const a=i/5*TAU+.55,r=178+rng()*46;
     ctx.save();ctx.translate(256+Math.cos(a)*r,256+Math.sin(a)*r);ctx.rotate(rng()<.5?0:Math.PI/4);
     ctx.fillStyle=cs[i%3];
     rr(ctx,-12,-12,24,24,8);ctx.fill();
     ctx.restore();
   }
 }},
 {id:'eggsA',name:'ЯЙЦА',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<5;i++){
     const a=i/5*TAU+.25,r=180+rng()*46;
     ctx.save();ctx.translate(256+Math.cos(a)*r,256+Math.sin(a)*r);ctx.rotate(a+Math.PI/2);
     ctx.fillStyle=cs[i%3];
     ctx.beginPath();ctx.ellipse(0,0,11,16,0,0,TAU);ctx.fill();
     ctx.restore();
   }
 }},
 {id:'dotsgrid',name:'ТОЧЕЧНИЦА',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   const grid=(sx,sy,dx,dy,c)=>{ctx.fillStyle=c;
     for(let i=0;i<4;i++)for(let j=0;j<4;j++)circle(ctx,sx+dx*i,sy+dy*j,5)};
   grid(50,50,26,26,cs[0]);grid(462,462,-26,-26,cs[1]);
   grid(462,50,-26,26,cs[2]);grid(50,462,26,-26,cs[0]);
 }},
 {id:'semiA',name:'ПОЛУКРУГИ',draw(ctx,col,t,rng){
   const cs=emCols(t,col,rng);
   for(let i=0;i<6;i++){
     const a=i/6*TAU+.05,r=178+rng()*52;
     ctx.save();ctx.translate(256+Math.cos(a)*r,256+Math.sin(a)*r);ctx.rotate(a+Math.PI/2);
     ctx.fillStyle=cs[i%3];
     ctx.beginPath();ctx.arc(0,0,13,0,Math.PI);ctx.closePath();ctx.fill();
     ctx.restore();
   }
 }},
];