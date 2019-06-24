const mongoose = require('mongoose')
      bcrypt = require('bcrypt')
      SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema( {
    // name: {
    //     first: String,
    //     last: String, 
    //     required: true,
    //     trim: true
    // },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String, 
        required: true,
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
        required: true,
    }
}, {
    collection: 'users'
});

userSchema.pre('save', (next) => { 
    var user = this;
    // only hash password if the password is new or modified
    if (!user.isModified('password')) return next();

    // generate bcypt salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        // now hash the password with the new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            // overide clear text password with hasdhed
            user.password = hash;
            next();
        })
    })
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