class Person {
    constructor(name = 'Anonymouse', age = 0) {
        this.name = name;
        this.age = age;
    }

    getGreeting() {
        // return 'Hi ' + this.name + '!';
        return `Hi ${this.name} !`
    }

    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`
    }
};

class Student extends Person {
    constructor(name, age, major) {
        super(name, age );
        this.major = major;
    }

    hasMajor() {
        return !!this.major
    }

    getDescription() {
        let description = super.getDescription();
        if (this.hasMajor()) {
            description += ` Their major is ${this.major}`
        }
        return description;
    }
}

class Traveler extends Person {
    constructor(name, homeLocation) {
        super(name);

        this.homeLocation = homeLocation;
    }

    getGreeting() {
        let greeting = super.getGreeting();
        if (this.homeLocation) {
            greeting += ` I am visiting from ${this.homeLocation}.`
        }

        return greeting;
    }
}

const traveler = new Traveler('Rado', 'Pleven');
console.log(traveler.getGreeting());


const student = new Student('Radoslav Radoev', 34, 'Sucker')
console.log(student)
console.log(student.hasMajor())
console.log(student.getDescription())

const me = new Person();
const it = new Person('Rado', 34)
console.log(me.getGreeting())
console.log(me.getDescription())
console.log(it.getGreeting() )
console.log(it.getDescription(0))