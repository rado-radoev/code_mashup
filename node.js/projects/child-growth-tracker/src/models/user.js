const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const SALT_WORK_FACTOR = 10;


const userSchema = new mongoose.Schema( {
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String, 
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    collection: 'users'
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');

    user.tokens = user.tokens.concat( { token } )
    await user.save()

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain password before saving
userSchema.pre('save', async function(next) { 
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR)
    }

    next()
});


userSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(nul, isMatch);
    })
};


userSchema.virtual('fullname').get(() => {
    return this.name.first + " " + this.name.last;
})

const User = mongoose.model('User', userSchema);

module.exports = User;