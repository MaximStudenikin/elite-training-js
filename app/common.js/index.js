// Ипорт стилей
import '../common.blocks/index.scss';

var doc = document;

var vkMass = {
  response: []
};
var myMass = {
  response: []
};

var vkSearchInput = doc.querySelector('#vk-search');
var mySearchInput = doc.querySelector('#my-search');

var vkList = doc.querySelector('#vk-list');
var myList = doc.querySelector('#my-list');

var friendsInput;

var cliar = doc.querySelector('#cliar');
var saveButtom = doc.querySelector('#save');

function showFriends(data, contain, input) {
  vkSearchInput = input;
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
  myMass.response = friends.response.filter(function (array) {
    if (arr.photo_100 === filter) {
      vkMass.response.push(array);
      return false;
    }
    return true
  });
}

function friendRemove(friends, filter) {
  myMass.response = friends.response.filter(function (array, index) {
    if (array.photo_100 == filter) {
      myMass.response.push(array);
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

function createTemplate(data, contain) {
  var source = vkListItem.innerHTML;
  var templateFn = Handlebars.compile(source);
  var template = templateFn({
    list: data.response
  });

  contain.innerHTML = template;
}

new Promise(function (resolve) {
  if(document.readyState == 'complete') {
      resolve();
  } else {
      window.onload = resolve;
  }
}).then(function () {
  return new Promise(function (resolve, reject) {
      VK.init({
          apiId: 6669907
      });

      VK.Auth.login(function(response) {
          if(response.session) {
              resolve(response);
          } else {
              reject(new Error('Не удалось подключение'));
          }
      }, 2);
  });
}).then(function () {
  return new Promise(function (resolve, reject) {
      VK.api('friends.get', {'fields': 'photo_100'}, function (data) {
          if(data.error) {
              reject (new Error('Все плохо'));
          } else {
              resolve(data);
          }
      });
  });
}).then(function (data) {
    if (localStorage.length > 0) {
      vkMass = JSON.parse(localStorage.fields);
    }

    myMass = data;

    if (!vkMass.response[0]) {
      createTemplate(data, leftContainer);
    } else {
      myMass.response = myMass.response.filter(function (index) {
        !myMass.response.some(function (index2) {
          index.photo_100 == index2.photo_100
        });
      })
      createTemplate(vkMass, vkList);
      createTemplate(myMass, myList);
    }

    vkList.addEventListener('click', function (event) {
      if (event.target.classList.contains('add')) {
        var src = event.target.contains('div').firstChild.getAttribute('src');

        friendFilter(vkMass, src);

        createTemplate(vkMass, vkList);
        createTemplate(myMass, myList);

        friendsInput.value = '';
      }
    })

    myList.addEventListener('click', function (event) {
      if (event.target.classList.contains('add')) {
        var src = event.target.contains('div').firstChild.getAttribute('src');

        friendRemove(myMass, src);

        createTemplate(vkMass, vkList);
        createTemplate(myMass, myList);

        friendsInput.value = '';
      }
    })

    vkSearchInput.addEventListener('input', function () {
      showFriends(data, vkList, vkSearchInput);
    })

    mySearchInput.addEventListener('input', function () {
      showFriends(myMass, myList, mySearchInput);
    });

    saveButtom.addEventListener('click', function (event) {
      event.preventDefault();

      if (vkMass.response) {
        localStorage.fields = JSON.stringify(vkMass)
      }
    });

    cliar.addEventListener('click', function () {
      localStorage.clear();
      location.reload();
    })
  })