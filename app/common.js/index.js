var doc = document;

// Ипорт стилей
import '../common.blocks/index.scss';


// ипорт и рендер шаблона с друзьями
import render from '../common.blocks/scroll/__item.hbs';
// импорт функций из файла
// import { dnd, dndIcon } from './dnd/dnd'
import { authorization, callAPI } from './vkSDK/vkSDK';

authorization()
  .then(function () { console.log('live is good') })
  .then(function () {
    return callAPI('users.get', { name_case: 'gen' });
  })
  .then(function ([me]) {
    console.log([me]);
    const title = doc.querySelector('#headerTitile');
    title.textContent = `Другофильр: ${me.first_name} ${me.last_name}`;
  })
  .then(function () {
    return callAPI('friends.get', {fields: 'country, city, photo_100'});
  })
  .then(function (friends) {
   console.log(friends)
  })
  .then(function (friends) {
    var scroll = doc.querySelector('#vk-list__item')
    console.log(scroll)
    var friendsHtml = render(friends);

    scroll.innterHtml = friendsHtml;
  })

// вызов импортированых функций из dnd
// dnd()
// dndIcon()