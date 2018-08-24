# Задача
Реализовать приложение которое представляет из себя два списка.

![Макет]:(https://image.prntscr.com/image/RvC9hNfJS5mm99UJtnYFUQ.png)


## Описание
В левом списке должен быть вывод друзей из профиля vk.com.<br>
В правом списке должны отображаться только те кого перенесли. <br>
Перенос между списками осуществляется: 
- Drag and Drop
- В правый спиок по нажатию кнопки добавить (+)
- удаление из левого списка по нажатию кнопки (Х)

```
Перетаскивать возможено в обоих направлениях.
```
В обоих списках возможна фильтрация друзей по Имене и Фамилии<br>
При нажатие кнопки «Сохранить» списки должны сохраняться в localstorage<br>
Списки не должны очищаться/изменяться при перезагрузке страницы.

```
Разрешено использовать только чисты JS, шаблонизаторы и VK SDK
```

### NPM cmd

```
$ npm install // установить зависимости
$ npm run prepare // запустить тесты и проверить стиль кода
$ npm run test // запустить тесты
$ npm run codestyle // проверить стиль кода
$ npm run start // запустить встроенный сервер и следить за изменениями файлов
$ npm run build // собрать проект в папку 'build'
```