const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({
        //     name: 'rado',
        //     age: 55
        // }); 
        reject('rejected')  
    }, 1500);
});

console.log('before')

promise.then((data) => {
    console.log('1', data);
}).catch((e) => {
    console.log(e)
});

console.log('after')