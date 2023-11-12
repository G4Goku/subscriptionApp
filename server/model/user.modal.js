const mongoose = require('mongoose')
const User = mongoose.Schema

userSchema = new User({
    userName:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

const Users = mongoose.model('User', userSchema);

module.exports = Users
