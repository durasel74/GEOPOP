'use strict';
/* GEOPOP · main.js — привязка событий и запуск приложения. */

/* ── пейджер тем: стрелки и свайп ── */
 $('#tPrev').onclick=()=>goThemePage(tPage-1);
 $('#tNext').onclick=()=>goThemePage(tPage+1);
(()=>{
  let sx=null;
  const vp=$('#tViewport');
  vp.addEventListener('pointerdown',e=>{sx=e.clientX});
  vp.addEventListener('pointerup',e=>{
    if(sx===null)return;
    const dx=e.clientX-sx;sx=null;
    if(Math.abs(dx)>40)(dx<0?$('#tNext'):$('#tPrev')).click();
  });
})();

/* ── расширенный режим ── */
 $('#advSw').onclick=e=>{
  const on=e.currentTarget.classList.toggle('on');
  e.currentTarget.setAttribute('aria-checked',on);
  $('#layers').hidden=!on;
  $('#advNote').textContent=on
    ?'Клик по плитке выбирает вариант. Кубик перекидывает версию элемента. Цвет: схема, сочетающиеся оттенки, или HEX. Замок закрепляет слой.'
    :'Ручная настройка слоёв: выбор варианта по превью, цвет и блокировка элемента от генерации.';
};

/* ── размер экспорта ── */
 $('#sizes').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  state.size=+b.dataset.s;
  document.querySelectorAll('#sizes button').forEach(x=>x.classList.toggle('on',x===b));
  repaint();
});

/* ── навигация: редактор / галерея ── */
 $('#favBtn').onclick=()=>showView(view==='editor'?'gallery':'editor');
 $('#btnBack').onclick=()=>showView('editor');

/* ── основные кнопки ── */
 $('#btnGen').onclick=generate;
 $('#btnCopy').onclick=()=>copyCanvas(cv,state.size);
 $('#btnSave').onclick=()=>downloadCanvas(cv,`geopop_${seedHex()}_${state.size}px.png`);
 $('#btnLike').onclick=addFav;

/* ── горячие клавиши (работают и в русской раскладке) ── */
addEventListener('keydown',e=>{
  if(e.target.matches('input'))return;
  if(view==='gallery'){if(e.key==='Escape')showView('editor');return}
  if(e.code==='Space'){e.preventDefault();generate()}
  else if(['c','C','с','С'].includes(e.key))copyCanvas(cv,state.size);
  else if(['s','S','ы','Ы'].includes(e.key))downloadCanvas(cv,`geopop_${seedHex()}_${state.size}px.png`);
});

/* ───────── запуск ───────── */
randomizeLayers();
buildThemes();buildOrbit();buildLayers();buildPreviews();
updateFavCount();
repaint();
port.classList.add('pop');
setTimeout(()=>port.classList.remove('pop'),340);