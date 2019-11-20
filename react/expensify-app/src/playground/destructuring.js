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


const book = {
    titile: 'Ego is the enemy',
    author:  'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Published' } = book.publisher
console.log(publisherName);
