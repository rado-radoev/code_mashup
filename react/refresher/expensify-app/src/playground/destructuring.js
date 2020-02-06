// console.log('desctructuring')

// const person = {
//     name: 'Andrew',
//     age: 35, 
//     location: {
//         city: 'Philadelphia',
//         temp: 92
//     }
// };

// const {name: firstName = 'Anonymous', age} = person;

// console.log(`${firstName} is ${age}`);

// const {temp: temperature, city} = person.location;

// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}`);
// }  


// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {name: publisherName = 'Self-Published'} = book.publisher

// console.log(publisherName);


// const address = [
//     '1299 South Juniper St',
//     'Philadelphia',
//     'Pensylvania',
//     '19147'
// ];

// const [street, city, state = 'New Your', zip] = address;
// const [, , state = 'New Your'] = address;

// console.log(street)

const item = [
    'Coffee (hot)',
    '$2.00',
    '$2.50',
    '$2.75'
];

const [drink, , mediumSizePrice] =  item;

console.log(`A Medium ${drink} costs ${mediumSizePrice}`);