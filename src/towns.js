/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise(function (resolve, reject) {
        var sortCitiesArray = [];
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.status >= 400) {
                reject();
            } else {
                var cities = JSON.parse(xhr.responseText)

                for (var townsKey in cities) {
                    if (Object.prototype.hasOwnProperty.call(cities, townsKey)) {
                        sortCitiesArray.push(cities[townsKey])
                    }
                }

                sortCitiesArray.sort(function (keyPrev, keyNext) {
                    if (keyPrev.name < keyNext.name) {
                        return -1;
                    }
                    if (keyPrev.name > keyNext.name) {
                        return 1;
                    }

                    return 0;
                });

                return resolve(sortCitiesArray)
            }
        })
    })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase())
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

loadTowns()
    .then(loadingBlock.style.display = 'none')
    .then(filterBlock.style.display = 'block')
    .then(function (value) {
        filterInput.addEventListener('keyup', function () {
            // это обработчик нажатия кливиш в текстовом поле
            var result = [];

            filterResult.innerHTML = '';

            for (var key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    result.push(value[key].name)
                }
            }

            result.forEach(function (item) {
                if (isMatching(item, filterInput.value)) {
                    var div = filterResult.appendChild(document.createElement('DIV'))

                    div.innerHTML = item;
                }
                if (filterInput.value == 0) {
                    filterResult.innerHTML = '';
                }
            })
        });
    })

export {
    loadTowns,
    isMatching
};