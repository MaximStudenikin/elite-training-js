import render from '../scroll/__item.hbs';

function search(input, list, vkSDK) {

  function misMatch(key, inputValue) {
    if (key.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0) {
      return true;
    }

    return false;
  }

  input.addEventListener('keyup', function () {
    var filterInput = input.value;

    if (!filterInput) {
      render(vkSDK);
    } else {
      var filterList = {};

      for (var key in vkSDK) {
        if (key) {
          if (misMatch(key, filterInput) || misMatch(vkSDK[key], filterInput)) {
            filterList[key] = vkSDK[key];
          }
        }
      }
      var filterFriends = render(filterList);
      list.innerHTML = filterFriends;
    }
  });

}

export {
  search
}