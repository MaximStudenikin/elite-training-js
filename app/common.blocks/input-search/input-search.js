// var inputSearch = homeworkContainer.querySelector('#vk-search');

// function misMatch(key, inputValue) {
//   if (key.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0) {
//       return true;
//   }

//   return false;
// }

// inputSearch.addEventListener('keyup', function () {
//   var filterInput = inputSearch.value;

//   if (!filterInput) {
//       creatorTable(getCookies());
//   } else {
//       var filterList = {};

//       for (var key in getCookies()) {
//           if (key) {
//               if (misMatch(key, filterInput) || misMatch(getCookies()[key], filterInput)) {
//                   filterList[key] = getCookies()[key];
//               }
//           }
//       }
//       creatorTable(filterList);
//   }
// });