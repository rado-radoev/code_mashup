const mongoose = require('mongoose')
const validator = require('validator')


const Height = require('../../playground/models/height')
const Child = require('../../playground/models/child')

const uri = "mongodb+srv://rradoev:M34M26kb8b@cluster0-yc4wz.mongodb.net/child-data?retryWrites=true";

mongoose.connect(uri ,{
    useNewUrlParser: true,
    useCreateIndex: true
})

// const Height = mongoose.model('Height', {
//     age: {
//         type: Number,
//         required: true,
//         validate(value) {
//             if (value <= 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     height: {
//         type: Number,
//         required: true
//         // validate(value) {
//         //     if (!validator.isDecimal(value)) {
//         //         throw new Error('Dcimal expected')
//         //     }
//         // }
//     }
// })

// const h = new Height({
//     age: 1, 
//     height: 32
// })

// h.save().then(() => {
//     console.log(h)
// }).catch((error) => {
//     console.log(error)
// })

const main = async () => {
  
    const baby = await Child.findOne({name: 'Victor'})
    // console.log(baby)
  
    const height = new Height({
      height: 155,
      owner: baby._id
    })
  
    // console.log(height)
    const saved = await height.save()
    // console.log(saved)
  
    const h = await Height.findById('5cf0c13cfabce307a033a20f')
    await h.populate('owner').execPopulate()
    console.log(h.owner.birthdate)
   }
  
//    main()