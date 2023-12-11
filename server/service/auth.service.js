const User = require('../model/user.modal')

const register = async (data) =>{
    let result = await User.create(data)
    return result   
}

const getUserByEmail = async (data) =>{
    let result = await User.findOne(data)
    return result 
}

const getUserById = async (id) => {
    let user = await User.findOne(id)
    return user
}

module.exports ={
    getUserByEmail,
    register,
    getUserById
}