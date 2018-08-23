// Ипорт стилей

// import '../common.blocks/base.scss';
// import '../common.blocks/colors.scss';
// import '../common.blocks/page/page.scss';
// import '../common.blocks/page/_background.scss';
// import '../common.blocks/logo/logo.scss';
// import '../common.blocks/logo/_bottom_line.scss';
// import '../common.blocks/icon/icon.scss';
// import '../common.blocks/icon/_view_cross.scss';
// import '../common.blocks/icon/_view_plus.scss';
// import '../common.blocks/icon/_color_white.scss';
// import '../common.blocks/workspace/workspace.scss';
// import '../common.blocks/workspace/__header.scss';
// import '../common.blocks/workspace/__search-field.scss';
// import '../common.blocks/input-search/input-search.scss';
// import '../common.blocks/input-search/_add_icon.scss';


// ипорт и рендер шаблона с друзьями
import render from '../templates/friends.hbs'
// импорт функций из файла
import {dnd, dndIcon} from './dnd/dnd'


var doc = document;

const page = doc.querySelector('.page');

// псевдо json
const items = [
  {name: 'Ivan', last_name: 'Ivanov'},
  {name: 'Pert', last_name: 'Pertov'},
  {name: 'Garic', last_name: 'Garicov'},
  {name: 'Lena', last_name: 'Lenova'}
];

// вывод на страницу
page.innerHTML = render({items: items});

// вызов импортированых функций из dnd
dnd()
dndIcon()