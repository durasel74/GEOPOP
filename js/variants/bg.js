'use strict';
/* GEOPOP · variants/bg.js — ФОН.
   Новый фон: добавь объект {id:'уник',name:'ИМЯ',draw(ctx,col,t,rng){...}}
   в конец массива. Каждые 8 вариантов = одна страница плиток. */
VAR.bg=[
 {id:'plain',name:'ПЛОСКИЙ',draw(ctx,col,t){ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512)}},
 {id:'stripes',name:'ПОЛОСЫ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   ctx.fillStyle=c;
   if(rng()<.5){let y=-30+rng()*30;while(y<512){const h=26+rng()*56;ctx.fillRect(0,y,512,h);y+=h+36+rng()*44}}
   else{let x=-30+rng()*30;while(x<512){const w=26+rng()*56;ctx.fillRect(x,0,w,512);x+=w+36+rng()*44}}
 }},
 {id:'corner',name:'УГЛЫ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const tl=rng()<.5,sx=tl?0:512,sy=tl?0:512;
   ctx.fillStyle=c;circle(ctx,sx,sy,204);
   ctx.fillStyle=t.ink;circle(ctx,sx,sy,128);
   ctx.fillStyle=t.bg;circle(ctx,sx,sy,64);
   const ex=tl?512:0,ey=tl?512:0;
   ctx.fillStyle=c;circle(ctx,ex,ey,88);
   ctx.fillStyle=t.ink;circle(ctx,ex,ey,40);
 }},
 {id:'check',name:'ШАХМАТКА',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   ctx.fillStyle=mix(t.bg,c,.18);
   const cell=64;
   for(let y=0;y<8;y++)for(let x=0;x<8;x++)if((x+y)%2===0)ctx.fillRect(x*cell,y*cell,cell,cell);
   ctx.fillStyle=c;
   const n=3+Math.floor(rng()*3);
   for(let i=0;i<n;i++){const x=Math.floor(rng()*8),y=Math.floor(rng()*8);ctx.fillRect(x*cell,y*cell,cell,cell)}
 }},
 {id:'dots',name:'ТОЧКИ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   ctx.fillStyle=mix(t.bg,c,.42);
   for(let y=34;y<512;y+=46)for(let x=34;x<512;x+=46)circle(ctx,x,y,5.5);
   ctx.fillStyle=c;
   const n=2+Math.floor(rng()*2);
   for(let i=0;i<n;i++)circle(ctx,34+Math.floor(rng()*10)*46,34+Math.floor(rng()*10)*46,13);
 }},
 {id:'split',name:'СПЛИТ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const ang=[45,-45,0,90][Math.floor(rng()*4)]*Math.PI/180;
   ctx.save();ctx.translate(256,256);ctx.rotate(ang);
   ctx.fillStyle=c;ctx.fillRect(-380,-380,760,380);
   ctx.strokeStyle=t.ink;ctx.lineWidth=10;
   ctx.beginPath();ctx.moveTo(-380,0);ctx.lineTo(380,0);ctx.stroke();
   ctx.restore();
 }},
 {id:'zigzag',name:'ЗИГЗАГ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const teeth=8,tw=512/teeth,th=22,bh=30;
   for(let b=0;b<4;b++){
     const y0=36+b*116+rng()*24;
     ctx.fillStyle=b%2?mix(t.bg,c,.42):c;
     ctx.beginPath();ctx.moveTo(0,y0);
     for(let i=1;i<=teeth;i++)ctx.lineTo(i*tw,y0+(i%2?th:0));
     ctx.lineTo(512,y0+bh);ctx.lineTo(0,y0+bh);ctx.closePath();ctx.fill();
   }
 }},
 {id:'raysbg',name:'ЛУЧИ',draw(ctx,col,t,rng){
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const c=bgAcc(t,col,rng);
   const c2=secColor(t,[c.toUpperCase()],rng);
   const n=28,rot=rng()*TAU/n;
   ctx.fillStyle=c;
   for(let i=0;i<n;i+=2){
     const a0=rot+i/n*TAU,a1=rot+(i+1)/n*TAU;
     ctx.beginPath();ctx.moveTo(256,256);
     ctx.lineTo(256+Math.cos(a0)*640,256+Math.sin(a0)*640);
     ctx.lineTo(256+Math.cos(a1)*640,256+Math.sin(a1)*640);
     ctx.closePath();ctx.fill();
   }
   ctx.fillStyle=c2;
   const off=Math.floor(rng()*n);
   for(let k=0;k<3;k++){
     const i=(off+k*7)%n,a0=rot+i/n*TAU,a1=rot+(i+1)/n*TAU;
     ctx.beginPath();ctx.moveTo(256,256);
     ctx.lineTo(256+Math.cos(a0)*640,256+Math.sin(a0)*640);
     ctx.lineTo(256+Math.cos(a1)*640,256+Math.sin(a1)*640);
     ctx.closePath();ctx.fill();
   }
 }},
 {id:'scallop',name:'ЧЕШУЯ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const R=46,stepX=72,stepY=50;
   for(let row=0;row*stepY<560;row++)
     for(let ci=-1;ci*stepX<560;ci++){
       const x=ci*stepX+(row%2?stepX/2:0),y=row*stepY;
       ctx.fillStyle=rng()<.1?c:mix(t.bg,c,.3);
       ctx.beginPath();ctx.arc(x,y,R,0,Math.PI);ctx.closePath();ctx.fill();
     }
 }},
 {id:'gridbg',name:'СЕТКА',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   ctx.strokeStyle=rgba(t.ink,.28);ctx.lineWidth=2;
   for(let i=1;i<8;i++){
     ctx.beginPath();ctx.moveTo(i*64,0);ctx.lineTo(i*64,512);ctx.stroke();
     ctx.beginPath();ctx.moveTo(0,i*64);ctx.lineTo(512,i*64);ctx.stroke();
   }
   const n=3+Math.floor(rng()*3);
   for(let i=0;i<n;i++){
     const gx=Math.floor(rng()*8),gy=Math.floor(rng()*8);
     ctx.fillStyle=i===0?t.ink:c;
     ctx.fillRect(gx*64,gy*64,64,64);
   }
 }},
 {id:'triangles',name:'ТРЕУГОЛЬНИКИ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const s=64;
   for(let y=0;y<8;y++)for(let x=0;x<8;x++){
     const up=(x+y)%2===0;
     ctx.fillStyle=(x+y)%4===0?c:mix(t.bg,c,.16);
     poly(up?[[x*s,y*s+s],[x*s+s,y*s+s],[x*s+s/2,y*s]]:[[x*s,y*s],[x*s+s,y*s],[x*s+s/2,y*s+s]]);
     ctx.fill();
   }
 }},
 {id:'waves',name:'ВОЛНЫ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   ctx.fillStyle=c;
   for(let b=0;b<6;b++){
     const y0=26+b*86+rng()*16,amp=13;
     ctx.beginPath();ctx.moveTo(0,y0);
     for(let x=0;x<512;x+=32)ctx.quadraticCurveTo(x+16,y0+((x/32)%2?amp:-amp),x+32,y0);
     ctx.lineTo(512,y0+22);ctx.lineTo(0,y0+22);ctx.closePath();ctx.fill();
   }
 }},
 {id:'bubbles',name:'ПУЗЫРИ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   const c2=secColor(t,[c.toUpperCase()],rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   for(let i=0;i<9;i++){
     const r=34+rng()*58,x=rng()*512,y=rng()*512;
     ctx.fillStyle=rng()<.7?c:c2;
     circle(ctx,x,y,r);
   }
   ctx.strokeStyle=rgba(t.ink,.16);ctx.lineWidth=4;
   for(let i=0;i<3;i++){
     const r=24+rng()*30;
     ctx.beginPath();ctx.arc(rng()*512,rng()*512,r,0,TAU);ctx.stroke();
   }
 }},
 {id:'bricks',name:'КИРПИЧИ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const bw=128,bh=56,list=[];
   for(let row=0;row*bh<512+bh;row++){
     const off=(row%2)?bw/2:0;
     for(let ci=-1;ci*bw<512+bw;ci++)list.push([ci*bw+off,row*bh]);
   }
   const hot=new Set();
   const nH=4+Math.floor(rng()*3);
   for(let i=0;i<nH;i++)hot.add(Math.floor(rng()*list.length));
   list.forEach(([x,y],i)=>{
     ctx.fillStyle=hot.has(i)?c:rgba(t.ink,.10);
     ctx.fillRect(x+3,y+3,bw-6,bh-6);
   });
 }},
 {id:'arrows',name:'СТРЕЛКИ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   ctx.strokeStyle=c;ctx.lineWidth=26;ctx.lineJoin='miter';
   const dir=rng()<.5?1:-1;
   for(let k=-1;k<6;k++){
     const y=40+k*92;
     ctx.beginPath();
     if(dir>0){ctx.moveTo(-20,y+40);ctx.lineTo(256,y);ctx.lineTo(532,y+40)}
     else{ctx.moveTo(-20,y);ctx.lineTo(256,y+40);ctx.lineTo(532,y)}
     ctx.stroke();
   }
 }},
 {id:'confetti',name:'КОНФЕТТИ',draw(ctx,col,t,rng){
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   for(let i=0;i<70;i++){
     ctx.save();ctx.translate(rng()*512,rng()*512);ctx.rotate(rng()*TAU);
     ctx.globalAlpha=.85;
     ctx.fillStyle=t.a[Math.floor(rng()*t.a.length)];
     ctx.fillRect(-9,-4,18,8);
     ctx.restore();
   }
   ctx.globalAlpha=1;
 }},
 {id:'halfmoon',name:'ЛУНА',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   ctx.save();ctx.translate(256,256);ctx.rotate(Math.floor(rng()*4)*Math.PI/2);
   ctx.fillStyle=c;ctx.beginPath();ctx.arc(0,-330,300,0,TAU);ctx.fill();
   ctx.fillStyle=t.ink;ctx.beginPath();ctx.arc(0,-330,180,0,TAU);ctx.fill();
   ctx.fillStyle=t.bg;ctx.beginPath();ctx.arc(0,-330,72,0,TAU);ctx.fill();
   ctx.restore();
 }},
 {id:'diag',name:'ДИАГОНАЛЬ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   ctx.save();ctx.translate(256,256);ctx.rotate(Math.PI/4);
   ctx.fillStyle=c;
   for(let x=-760;x<760;x+=128)ctx.fillRect(x,-760,64,1520);
   ctx.restore();
 }},
 {id:'dropbg',name:'КАПЛИ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const step=86;
   const drop=(x,y,k,c)=>{
     ctx.fillStyle=c;
     poly(ctx,[[x,y-k],[x+k*.68,y+k*.35],[x-k*.68,y+k*.35]]);ctx.fill();
     circle(ctx,x,y+k*.6,k*.6);
   };
   for(let y=30;y<512;y+=step)for(let x=30;x<512;x+=step)drop(x,y,16,mix(t.bg,c,.35));
   const n=3+Math.floor(rng()*2);
   for(let i=0;i<n;i++)drop(30+Math.floor(rng()*6)*step,30+Math.floor(rng()*6)*step,24,c);
 }},
 {id:'crossbg',name:'КРЕСТЫ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const step=80;
   const cross=(x,y,k,c)=>{ctx.fillStyle=c;ctx.fillRect(x-k*.18,y-k*.5,k*.36,k);ctx.fillRect(x-k*.5,y-k*.18,k,k*.36)};
   for(let y=40;y<512;y+=step)for(let x=40;x<512;x+=step)cross(x,y,28,mix(t.bg,c,.4));
   const n=3+Math.floor(rng()*3);
   for(let i=0;i<n;i++)cross(40+Math.floor(rng()*6)*step,40+Math.floor(rng()*6)*step,44,c);
 }},
 {id:'tiles',name:'МОЗАИКА',draw(ctx,col,t,rng){
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const s=128,cols=[...t.a];
   for(let y=0;y<4;y++)for(let x=0;x<4;x++){
     if(rng()<.55)continue;
     ctx.fillStyle=rng()<.15?t.ink:cols[Math.floor(rng()*cols.length)];
     ctx.fillRect(x*s+4,y*s+4,s-8,s-8);
   }
 }},
 {id:'mount',name:'ГОРЫ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   const c2=secColor(t,[c.toUpperCase()],rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   ctx.fillStyle=mix(t.bg,c,.35);
   poly(ctx,[[0,512],[0,330],[120,220],[240,330],[340,250],[512,340],[512,512]]);ctx.fill();
   ctx.fillStyle=c;
   poly(ctx,[[0,512],[0,420],[150,300],[300,430],[420,330],[512,420],[512,512]]);ctx.fill();
   ctx.fillStyle=c2;
   poly(ctx,[[0,512],[110,380],[230,512]]);ctx.fill();
   ctx.fillStyle=t.ink;ctx.fillRect(0,502,512,10);
 }},
 {id:'ringsbg',name:'КРУГИ',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   const cx=rng()<.5?0:512,cy=rng()<.5?0:512;
   ctx.strokeStyle=rgba(t.ink,.22);ctx.lineWidth=3;
   for(let r=70;r<760;r+=70){ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.stroke()}
   const rr2=[105,245,385][Math.floor(rng()*3)];
   ctx.fillStyle=c;ctx.beginPath();ctx.arc(cx,cy,rr2,0,TAU);ctx.fill();
   ctx.fillStyle=t.ink;ctx.beginPath();ctx.arc(cx,cy,rr2*.55,0,TAU);ctx.fill();
 }},
 {id:'bigdots',name:'ГОРОШЕК',draw(ctx,col,t,rng){
   const c=bgAcc(t,col,rng);
   ctx.fillStyle=t.bg;ctx.fillRect(0,0,512,512);
   ctx.fillStyle=c;
   const s=128;
   for(let y=0;y<4;y++)for(let x=0;x<4;x++)
     circle(ctx,x*s+s/2+(y%2?s/2:0),y*s+s/2,30);
 }},
];