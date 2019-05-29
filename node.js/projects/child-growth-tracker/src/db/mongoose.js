const mongoose = require('mongoose')
const validator = require('validator')

const uri = "mongodb+srv://rradoev:M34M26kb8b@cluster0-yc4wz.mongodb.net/babydata?retryWrites=true";

mongoose.connect(uri ,{
    useNewUrlParser: true,
    useCreateIndex: true
})

const Height = mongoose.model('Height', {
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value <= 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    height: {
        type: Number,
        required: true
        // validate(value) {
        //     if (!validator.isDecimal(value)) {
        //         throw new Error('Dcimal expected')
        //     }
        // }
    }
})

const h = new Height({
    age: 1, 
    height: 32
})

h.save().then(() => {
    console.log(h)
}).catch((error) => {
    console.log(error)
})