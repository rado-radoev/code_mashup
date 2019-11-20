const person = {
    name: 'Rado',
    age: 35,
    location: {
        city: 'San Diego',
        temp: 92
    }
};


const { name = 'Anonymous', age } = person;
// const name = person.name;
// const age = person.age;


console.log(`${name} is ${age}.`)


const { city, temp: temperature } = person.location;
if (city && temperature) {
    console.log(`It is ${temperature} in ${city}`)
};
