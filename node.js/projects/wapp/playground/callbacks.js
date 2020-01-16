
// const geoCode = (address, callbak) => {
//     setTimeout(() => {
//         const data = {
//             lon: 0,
//             lat: 0
//         }
//         callbak(data);
//     }, 2000)
// }

// geoCode('California', (data) => {
//     console.log(data)
// })

const add = (num1, num2, callback) => {
    setTimeout(() => {
        
        const sum = num1 + num2;

        callback(sum)
    }, 2000);
}


add(1, 4, (sum) => {
    console.log(sum);
})