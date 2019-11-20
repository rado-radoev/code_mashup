//
// Object destructuring
//


// const person = {
//     name: 'Rado',
//     age: 35,
//     location: {
//         city: 'San Diego',
//         temp: 92
//     }
// };


// const { name: firstName = 'Anonymous', age } = person;
// // const name = person.name;
// // const age = person.age;


// console.log(`${firstName} is ${age}.`)


// const { city, temp: temperature } = person.location;
// if (city && temperature) {
//     console.log(`It is ${temperature} in ${city}`)
// };


// const book = {
//     titile: 'Ego is the enemy',
//     author:  'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher
// console.log(publisherName);






//
// Array destructuring
//

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pensylvania', '19174'];
const [ , , state = 'New York'] = address;
console.log(`You are in  ${state}`)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [ size, , price ] = item;
console.log(`A medium ${size} costs ${price}`)