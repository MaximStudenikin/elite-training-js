/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
    var div = document.createElement('DIV');

    div.innerText = text

    return div;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в переметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) 
   добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
    return where.insertBefore(what, where.firstChild);
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов 
 следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>
   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. 
   следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    var thisChildren = where.children;
    var siblingArray = [];

    for (var index = 0; index < thisChildren.length; index++) {

        if (thisChildren[index].nextElementSibling && thisChildren[index].nextElementSibling.tagName === 'P') {
            siblingArray.push(thisChildren[index])
        }
    }

    return siblingArray;
}
/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" 
 внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
    var elementInfo = [];

    for (var child of where.children) {
        elementInfo.push(child.innerText);
    }

    return elementInfo;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {

    var childrens = where.childNodes;

    for (var index = 0; index < childrens.length; index++) {
        if (childrens[index].nodeType == 3) {
            where.removeChild(childrens[index])
        }
    }
}

/*
 Задание 6:
 Выполнить предудыщее задание с использование рекурсии - 
 то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
    var whereChildNodes = where.childNodes;

    for (let index = 0; index < whereChildNodes.length; index++) {
        if (whereChildNodes[index].nodeType == 3) {
            where.removeChild(whereChildNodes[index])
        }
    }

    for (let index = 0; index < whereChildNodes.length; index++) {
        if (whereChildNodes[index].children) {
            deleteTextNodesRecursive(whereChildNodes[index]);
        }
    }

}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
function collectDOMStat(root) {
    var elementInfo = {
        tags: {},
        classes: {},
        texts: 0
    }

    function counter(dom) {
        var thisChildNodes = dom.childNodes;

        for (var element of thisChildNodes) {
            if (element.nodeType === 1) {
                elementInfo.tags[element.tagName] = elementInfo.tags[element.tagName] || 0;
                elementInfo.tags[element.tagName]++;
                for (var elementClass of element.classList) {
                    elementInfo.classes[elementClass] = elementInfo.classes[elementClass] || 0;
                    elementInfo.classes[elementClass]++;
                }
            } else if (element.nodeType === 3) {
                elementInfo.texts++;
            }
            if (element.hasChildNodes()) {
                counter(element);
            }
        }
    }

    counter(root);

    return elementInfo;
}

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {

            var addedNodes = mutation.addedNodes,
                removedNodes = mutation.removedNodes;

            if (addedNodes.length) {
                fn({
                    type: 'insert',
                    nodes: [...addedNodes]
                });
            }

            if (removedNodes.length) {
                fn({
                    type: 'remove',
                    nodes: [...removedNodes]
                });
            }
        });
    });

    observer.observe(where, {
        childList: true,
        subtree: true
    });
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
