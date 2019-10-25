class Person {
    constructor(name = 'Anonymouse', age = 0) {
        this.name = name;
        this.age = age;
    }

    getGreeting() {
        // return 'Hi ' + this.name + '!';
        return `Hi ${this.name}, grandpa ${this.age} !`
    }

    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`
    }
};

const me = new Person();
const it = new Person('Rado', 34)
console.log(me.getGreeting())
console.log(me.getDescription())
console.log(it.getGreeting() )
console.log(it.getDescription(0))