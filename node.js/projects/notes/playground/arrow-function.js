var square = (x) => x*x;

console.log(square(3));

var user = {
  name: "Rado",
  sayHi: () => {
    console.log('Hi');
  },
  sayHiAlt () {
    console.log(`Hi. I'am ${this.name}`);
  }
};


user.sayHiAlt();
