// Ипорт стилей

import '../common.blocks/index.scss';


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
// page.innerHTML = render({items: items});

// вызов импортированых функций из dnd
dnd()
dndIcon()