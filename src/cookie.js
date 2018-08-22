/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

function misMatch(cookiesKey, inputValue) {
    if (cookiesKey.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0) {
        return true;
    }

    return false;
}

function creatorTable(cookiesList = {}) {
    listTable.innerHTML = '';

    for (var cookiesKey in cookiesList) {
        if (cookiesKey) {
            var filterInput = filterNameInput.value;

            if (misMatch(cookiesList[cookiesKey], filterInput) || misMatch(cookiesKey, filterInput)) {
                var tableRow = document.createElement('tr');

                tableRow.className = 'table-row';
                listTable.appendChild(tableRow);

                var cellName = document.createElement('td');

                cellName.textContent = cookiesKey;
                tableRow.appendChild(cellName);

                var cellValue = document.createElement('td');

                cellValue.textContent = cookiesList[cookiesKey];
                tableRow.appendChild(cellValue);

                var delButton = document.createElement('BUTTON');

                delButton.textContent = 'X';

                var delCell = document.createElement('td');

                delCell.appendChild(delButton);
                tableRow.appendChild(delCell);
            }
        }
    }
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + '=' + ';expires=Thu, 31 Dec 2000 07:00:00 UTC';
}

listTable.addEventListener('click', function (event) {
    var targetClick = event.target;

    if (targetClick.tagName === 'BUTTON') {
        var cookieName = targetClick.closest('.table-row').firstElementChild.innerText;

        listTable.removeChild(targetClick.closest('.table-row'));
        deleteCookie(cookieName);
    }
})

filterNameInput.addEventListener('keyup', function () {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    var filterInput = filterNameInput.value;

    if (!filterInput) {
        creatorTable(getCookies());
    } else {
        var filterList = {};

        for (var key in getCookies()) {
            if (key) {
                if (misMatch(key, filterInput) || misMatch(getCookies()[key], filterInput)) {
                    filterList[key] = getCookies()[key];
                }
            }
        }
        creatorTable(filterList);
    }
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    var cookieName = addNameInput.value;
    var cookieValue = addValueInput.value;

    document.cookie = `${cookieName} = ${cookieValue}`;

    creatorTable(getCookies());
});

window.onload = creatorTable(getCookies());