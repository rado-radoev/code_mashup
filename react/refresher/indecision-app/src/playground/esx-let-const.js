var nameVar = 'Rado'
var nameVar = 'Mike'
console.log('nameVar', nameVar);

let nameLet = 'Rado'
console.log('nameLet', nameLet);

const nameConst = 'Frank'
console.log('nameConst', nameConst)

function getPetName() {
    var petName = 'Hal'
    return petName;
}

getPetName();


const multiplier = {
    numbers: [3,4,5,7,8,9],
    multiplyBy: 5,
    multipy() {
        return this.numbers.map((number) => number * this.multiplyBy)
    }
}

console.log(multiplier.multipy())