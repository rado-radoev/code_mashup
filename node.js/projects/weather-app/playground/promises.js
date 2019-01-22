var asyncAdd = (a, b) => {
  return new Promise((resolve, rejects) => {
    setTimeout( () => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Argument must be number');
      }
    }, 1500);
  });
};

asyncAdd(7, 5).then( (res) => {
  console.log("Result: ", res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log("Result + 33: ", res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});


// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Promise resolved');
//   }, 2500);
//   reject('Promise rejected');
// });
//
// somePromise.then((message) => {
//   console.log(message);
// }, (errorMessage) => {
//   console.log(errorMessage);
// });
