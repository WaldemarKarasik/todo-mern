const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 15
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
})

UserSchema.pre('save', function(next) {
    if(!this.isModified('password'))
        return next()
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if (err)
            return next(err)
        this.password = hashedPassword
        next()
    })
})

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err)
            return cb(err)
        if(!isMatch)
            return cb(null, false)
        return cb(null, this)
    })  
}



module.exports = mongoose.model('User', UserSchema)