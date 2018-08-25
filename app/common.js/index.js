// Ипорт стилей
import '../common.blocks/index.scss';


// ипорт и рендер шаблона с друзьями
// import render from '../common.blocks/scroll/__item.hbs';
// импорт функций из файла
// import { dnd, dndIcon } from './dnd/dnd'
// import { auth } from './friendsVK/friendsVK';


VK.init({
  apiId: 6669907
});

function auth() {
  return Promise((resolve, reject) => {
    VK.Auth.login(data => {
      if (data.session) {
        resolve();
      } else {
        reject(new Error('Все плохо'));
      }
    }, 2);
  });
}

auth().then(() => console.log('live is good'));


// var doc = document;

// const scroll = doc.querySelector('.scroll');

// // псевдо json
// const items = [
//   { name: 'Ivan', last_name: 'Ivanov', photo: 'https://source.unsplash.com/user/chrisjoelcampbell/50x50' },
//   { name: 'Pert', last_name: 'Pertov', photo: 'https://source.unsplash.com/user/chrisjoelcampbell/50x50' },
//   { name: 'Garic', last_name: 'Garicov', photo: 'https://source.unsplash.com/user/chrisjoelcampbell/50x50' },
// ];

// вывод на страницу
// scroll.innerHTML = render({ items: items });

// вызов импортированых функций из dnd
// dnd()
// dndIcon()