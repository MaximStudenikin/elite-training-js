VK.init({
  apiId: 6669907
})

function authorization() {
  return new Promise(function (resolve, reject) {
    VK.Auth.login(function (data) {
      if (data.session) {
        resolve();
      } else {
        reject(new Error('Все плохо'));
      }
    }, 2);
  });
}

function callAPI(method, params) {
  params.v = 5.76;

  return new Promise(function (resolve, reject) {
    VK.api(method, params, function (data) {
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data.response);
      }
    });
  })
}

export {
  authorization,
  callAPI
}