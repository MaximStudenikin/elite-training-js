VK.init({
  apiId: 6669907
});

function auth() {
  return Promise((resolve, reject) => {
    VK.Auth.login(data => {
      if (data.session) {
        resolve();
      } else {
        reject(new Error('Все плохо'));
      }
    }, 2);
  });
}

auth().then(() => console.log('live is good'));