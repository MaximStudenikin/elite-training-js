var doc = document;

// Ипорт стилей
import '../common.blocks/index.scss';


// ипорт и рендер шаблона с друзьями
import render from '../common.blocks/scroll/__item.hbs';
// импорт функций из файла
// import { dnd, dndIcon } from './dnd/dnd'
import { authorization, callAPI } from './vkSDK/vkSDK';

authorization()
  .then(function () {
    return callAPI('users.get', { name_case: 'gen' });
  })
  .then(function ([me]) {
    const title = doc.querySelector('#headerTitile');
    title.textContent = `Другофильр: ${me.first_name} ${me.last_name}`;
  })
  .then(function () {
    return callAPI('friends.get', {fields: 'photo_100', count: 50});
  })
  .then(function (friends) {
    scroll = doc.querySelector('#vk-list')
    var friendsHtml = render(friends);
    scroll.innerHTML = friendsHtml;
  })

// вызов импортированых функций из dnd
// dnd()
// dndIcon()