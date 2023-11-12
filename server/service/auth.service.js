const user = require('../model/user.modal')

const register = async (data) =>{
    let result = await user.create(data)
    return result   
}

const getUserByEmail = async (data) =>{
    let result = await user.findOne(data)
    return result 
}

module.exports ={
    getUserByEmail,
    register
}