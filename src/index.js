/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (var index = 0; index < array.length; index++) {
        fn.call(array[index], index, array);
    }
}
/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var arrayMap = [];

    for (var index = 0; index < array.length; index++) {
        arrayMap.push(fn.call(arguments, array[index], index, array));
    }

    return arrayMap;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var result = initial;

    for (var index = 0; index < array.length; index++) {
        result = fn.call(null, array[index], result, index, array);
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var keys, upperStr, upperArray;

    keys = Object.getOwnPropertyNames(obj)
    upperStr = keys.join(',').toUpperCase()
    upperArray = upperStr.split(',')

    return upperArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to) {
    var
        index,
        upTo,
        clonedArray = [],
        sliceSize,
        arrayLength = array.length;

    if (to == undefined) {
        to = array.length
    }

    upTo = (to) ? to : arrayLength;

    if (to < 0) {
        upTo = arrayLength + to;
    }

    sliceSize = upTo - from;

    if (sliceSize > 0) {
        clonedArray = new Array(sliceSize);
        if (array.charAt) {
            for (index = 0; index < sliceSize; index++) {
                clonedArray[index] = array.charAt(from + index);
            }
        } else {
            for (index = 0; index < sliceSize; index++) {
                clonedArray[index] = array[from + index];
            }
        }
    }

    return clonedArray;
}
/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    return new Proxy(obj, {
        set(target, prop, value) {

            target[prop] = value * value;

            return target[prop];
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
