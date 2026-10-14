'use strict';
/* GEOPOP · themes.js — цветовые схемы.
   Поля темы:
     id   — уникальный идентификатор (латиницей);
     name — название на карточке;
     bg   — фон аватарки; ink — «чернильный» контур;
     a[4] — основные акценты (по ролям: эмблема / рамка / фон+акценты / доп.);
     x[8] — дополнительные сочетающиеся цвета для расширенного режима. */

const THEMES=[
 {id:'pop',   name:'POP!',   bg:'#F6F1E7',ink:'#17151C',a:['#FF5C39','#FFC940','#17A398','#FF4D8D'],
  x:['#FFFFFF','#FFE8D6','#FFD9A0','#7A2E1D','#0E7C66','#FFB3D0','#2E86AB','#C7BCA9']},
 {id:'acid',  name:'ACID',   bg:'#EFEFE6',ink:'#131311',a:['#C3F53C','#FF5EA8','#20BFA9','#FF8A3C'],
  x:['#FFFFFF','#EBFBC8','#FFD3E8','#5A7A17','#8A1F5C','#1E3A34','#FF9D5C','#B9B4A4']},
 {id:'sunset',name:'SUNSET', bg:'#FBEFE3',ink:'#221714',a:['#FF6A3D','#FFB23E','#E23E5C','#7A4DD8'],
  x:['#FFFFFF','#FFD3C2','#FFE7C4','#8C2F1A','#4A2F8F','#2E5339','#F2A9C4','#6B4A32']},
 {id:'ocean', name:'OCEAN',  bg:'#E9F3F1',ink:'#0E2A2B',a:['#18B3B8','#FFB020','#3A5BD9','#FF6B8F'],
  x:['#FFFFFF','#CBE9EC','#FFE3B3','#0D7377','#1F2F6E','#E76F51','#B8D8B8','#5C6B73']},
 {id:'candy', name:'CANDY',  bg:'#FFF0F4',ink:'#2A1A22',a:['#FF87AB','#FFD166','#5BC8E8','#9E7BFF'],
  x:['#FFFFFF','#FFD6E1','#FFEDC7','#C24D6E','#3D5A80','#7FB685','#F2E8DC','#5E4B8B']},
 {id:'mono',  name:'MONO',   bg:'#F1F0EC',ink:'#141414',a:['#1A1A18','#8E8E88','#FF4B33','#D8D6CE'],
  x:['#FFFFFF','#F4F3EF','#C4C3BB','#A5A49C','#6E6D66','#454440','#2A2926','#8F2B1F']},
 {id:'menta', name:'MENTA',  bg:'#EDF7EE',ink:'#12332A',a:['#37C978','#0FB5BA','#FFD23F','#FF6B6B'],
  x:['#FFFFFF','#D9F4E0','#C4EFF0','#FFEFB8','#1F7A4D','#0A5C60','#FFD1D1','#F4B942']},
 {id:'sky',   name:'SKY',    bg:'#EAF4FF',ink:'#102A43',a:['#2E86FF','#6FE7DD','#FFB020','#FF6B8F'],
  x:['#FFFFFF','#D4E7FF','#D8FAF5','#FFE7C2','#1B4F9C','#0E6E73','#F2789F','#334E68']},
 {id:'grape', name:'GRAPE',  bg:'#F3EDFA',ink:'#241536',a:['#7C4DFF','#C158DC','#FFC447','#00C2A8'],
  x:['#FFFFFF','#E7DBFF','#F9D8F0','#FFEDBF','#5B2FB8','#8F4A16','#2E7D6B','#E0A458']},
 {id:'diner', name:'DINER',  bg:'#FBF2E0',ink:'#26150F',a:['#D7263D','#F49D1A','#1B7B5A','#274690'],
  x:['#FFFFFF','#F7D9C4','#FFE1AE','#9C1B2E','#123F2E','#E8C39E','#5C4033','#7FA3C4']},
 {id:'forest',name:'FOREST', bg:'#EEF2E4',ink:'#1C2B1E',a:['#5B8E3E','#D9A036','#C75146','#2E5339'],
  x:['#FFFFFF','#DCE8C9','#F7E3B8','#F3CFC7','#3E5C2E','#8A5A22','#C46D5E','#8FA98F']},
 {id:'berry', name:'BERRY',  bg:'#FDF0F7',ink:'#33121F',a:['#E63984','#FF9F68','#8AC6A5','#6A4C93'],
  x:['#FFFFFF','#FFD3E5','#FFDFC9','#D5EDDE','#A81E5B','#4E3B78','#D9822B','#1F5F5B']},
 {id:'clay',  name:'CLAY',   bg:'#F7EFE6',ink:'#2E211A',a:['#C96F4A','#E5B769','#7A8B6F','#3E5C50'],
  x:['#FFFFFF','#F0DACB','#F4DFB6','#8A4E2F','#54705F','#B65C3B','#D9A05B','#A9927F']},
 {id:'lemon', name:'LEMON',  bg:'#FBF6DC',ink:'#2A2508',a:['#FFD100','#FF8A00','#7CB518','#FF4D6D'],
  x:['#FFFFFF','#FFF3B8','#FFE08A','#8A6D00','#5C4A00','#FFA9C4','#4E7A27','#E8DCC0']},
 {id:'coral', name:'CORAL',  bg:'#FFEDE5',ink:'#331410',a:['#FF5148','#FF8E6E','#FFB53F','#2E86AB'],
  x:['#FFFFFF','#FFD9CC','#FFC2A8','#A83226','#7A2E86','#1F6F8B','#FFDD86','#E8C4B8']},
 {id:'mint',  name:'MINT',   bg:'#EAFBF2',ink:'#0E3325',a:['#2EC4A9','#77E4A4','#FFD166','#FF6B6B'],
  x:['#FFFFFF','#D2F5E4','#C0EDE0','#1B7A5E','#0A4A3A','#FFDD8A','#FF9AA2','#CFE8D8']},
 {id:'lilac', name:'LILAC',  bg:'#F2EDFB',ink:'#2B1B44',a:['#9B5DE5','#F15BB5','#FEE440','#00BBF9'],
  x:['#FFFFFF','#E5D9F7','#F4D9EE','#6A3AA0','#3D2364','#FFE08A','#7FD8D0','#D8CCE8']},
 {id:'cocoa', name:'COCOA',  bg:'#F3E9DC',ink:'#33221A',a:['#8C5A3C','#D9995B','#5F7A61','#C1443C'],
  x:['#FFFFFF','#EDD9C4','#E0C0A0','#5C3A24','#3E2716','#87A078','#C8563F','#D9CBB8']},
 {id:'arctic',name:'ARCTIC', bg:'#EDF5FA',ink:'#14314F',a:['#4EA8DE','#97D8C4','#F9C74F','#F28482'],
  x:['#FFFFFF','#D8ECF7','#CBE8E0','#2C6E9E','#1B4965','#FFD166','#F4978E','#C5D8E0']},
 {id:'mango', name:'MANGO',  bg:'#FFF3E0',ink:'#3E2A14',a:['#FF9F1C','#FFBF69','#2EC4B6','#E23E5C'],
  x:['#FFFFFF','#FFE3B3','#FFD19A','#B36A00','#7A4A00','#1D7F7A','#B23A48','#F2E3CE']},
 {id:'matcha',name:'MATCHA', bg:'#EFF3E4',ink:'#28361E',a:['#88B04B','#5B8C42','#E8A33D','#D96C5F'],
  x:['#FFFFFF','#DEE8C8','#CFE0B0','#4A6630','#2E4220','#E8B84B','#C25B4E','#D8D4C0']},
 {id:'asiimov',name:'ASIIMOV', bg:'#F2F0EA',ink:'#1C1A17',a:['#FF6B1A','#26231F','#FF8E3C','#9B968C'],
  x:['#FFFFFF','#FFB25C','#FFE3C4','#8C4A12','#C7C2B6','#8F8B83','#4A453D','#221F1B']},
 {id:'dragonlore',name:'DRAGON LORE', bg:'#E9DFC6',ink:'#33230F',a:['#7C4A1E','#C9992E','#B2622D','#556B4E'],
  x:['#FFFFFF','#F5EDD8','#E3D3AC','#8A5A2A','#4A3319','#E0B84A','#6E7B54','#7A3B22']},
 {id:'noir',  name:'NOIR',   bg:'#15141C',ink:'#EDEBE3',a:['#FFD23F','#FF3E7F','#35D0BA','#F2F0E9'],
  x:['#FFFFFF','#F2F0E9','#3D3C4C','#2B2A38','#FFD9A8','#FFB3CE','#9BE8DC','#8C86FF']},
 {id:'uv',    name:'UV',     bg:'#1A1030',ink:'#F0EAFF',a:['#9D4EDD','#FF5DA2','#FFE45E','#00E5FF'],
  x:['#FFFFFF','#F0EAFF','#3A2760','#2A1B45','#FFD9F0','#C9B8FF','#B9FFF2','#FFF3B8']},
 {id:'gold',  name:'GOLD',   bg:'#191512',ink:'#F2E8D5',a:['#E0A32E','#F2C879','#B03A2E','#F5EFE0'],
  x:['#FFFFFF','#F5EFE0','#E8D9B0','#8A6420','#5C4214','#6E2B24','#3A5C50','#C9B896']},
];

/* роль → цвет темы по умолчанию для каждого слоя */
const ROLE={bg:t=>t.a[2],emblem:t=>t.a[0],frame:t=>t.a[1],accents:t=>t.a[2],overlay:t=>t.ink};

/* фиксированная демо-композиция для мини-аватарок на карточках тем */
const DEMO={
  seed:0x7A3E91,
  layers:{
    bg:{v:'bubbles',color:null,sub:10},
    emblem:{v:'face',color:null,sub:13},
    frame:{v:'double',color:null,sub:1},
    accents:{v:'sparks',color:null,sub:1},
    overlay:{v:'none',color:null,sub:1}
  }
};