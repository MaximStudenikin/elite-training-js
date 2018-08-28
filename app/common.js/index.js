// Ипорт стилей
import '../common.blocks/index.scss';

VK.init({
  apiId: 6669907
});

function auth() {
  return new Promise((resolve, reject) => {
    VK.Auth.login(data => {
      if (data.session) {
        resolve(data.session);
      } else {
        reject(new Error('Не удалось авторизоваться'));
      }
    }, 2);
  });
}

function callAPI(method, params) {
  params.v = '5.76';

  return new Promise(function (resolve, reject) {
    VK.api(method, params, function (data) {
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data.response);
      }
    });
  });
}

var doc = document;
var localRepo = localStorage;

var leftMass = [];
var rightMass = [];

var leftSearchInput = doc.querySelector('#vk-search');
var rightSearchInput = doc.querySelector('#my-search');

var leftList = doc.querySelector('#vk-list');
var rightList = doc.querySelector('#my-list');

var cliar = doc.querySelector('#cliar');
var saveButtom = doc.querySelector('#save');

function saveToStorage(strArray, array) { //strArray это storage.array
  strArray = JSON.stringify(array);
}

function readFromStorage(array, strArray) {
  array = JSON.parse(strArray); //strArray это storage.array
}

function showFriends(data, contain, input) {
  leftSearchInput = input;
  if (input.value) {
    var filteredFriends = {
      response: []
    };
    filteredFriends.response = dat.response.filter(filterSort);
    createTemplate(filteredFriends, contain);
  } else {
    createTemplate(data, contain);
  }
}

function friendFilter(friends, filter) {
  rightMass.response = friends.response.filter(function (array) {
    if (array.photo_100 === filter) {
      leftMass.response.push(array);
      return false;
    }
    return true
  });
}

function friendRemove(friends, filter) {
  rightMass.response = friends.response.filter(function (array, index) {
    if (array.photo_100 == filter) {
      rightMass.response.push(array);
      return false;
    }
    return true
  });
}

function filterSort(data) {
  for (var index = 0; index < friendsInput.value.length; index++) {
    if (!(data.first_name[index].toLowerCase() === friendsInput.value[index].toLowerCase()) && !(data.last_name[index].toLowerCase() === friendsInput.value[index].toLowerCase())) {
      return false;
    }
  }
  return true;
}

function createTemplate(array) {
  var template = require('./__item.hbs');

  this.leftSideElement.innerHTML = template({
    items: array
  });
}

auth()
  .then(function () {
    return callAPI('friends.get', { fields: 'photo_100' });
  }).then(function (friends) {

    localRepo.VKfriends = JSON.stringify(friends.items);

    createTemplate(leftMass);
    createTemplate(rightMass);


    leftList.addEventListener('click', function (event) {
      if (event.target.classList.contains('add')) {
        var src = event.target.contains('div').firstChild.getAttribute('src');

        friendFilter(leftMass, src);

        createTemplate(leftMass, leftList);
        createTemplate(rightMass, rightList);

        friendsInput.value = '';
      }
    })

    rightList.addEventListener('click', function (event) {
      if (event.target.classList.contains('add')) {
        var src = event.target.contains('div').firstChild.getAttribute('src');

        friendRemove(rightMass, src);

        createTemplate(leftMass, leftList);
        createTemplate(rightMass, rightList);

        friendsInput.value = '';
      }
    })

    leftSearchInput.addEventListener('input', function () {
      showFriends(data, leftList, leftSearchInput);
    })

    rightSearchInput.addEventListener('input', function () {
      showFriends(rightMass, rightList, rightSearchInput);
    });

    saveButtom.addEventListener('click', function (event) {
      event.preventDefault();

      if (leftMass.response) {
        localStorage.fields = JSON.stringify(leftMass)
      }
    });

    cliar.addEventListener('click', function () {
      localStorage.clear();
      location.reload();
    })
  })