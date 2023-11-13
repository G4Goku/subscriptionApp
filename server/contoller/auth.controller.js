require('dotenv').config()
const authService =require('../service/auth.service')
const constants = require('../utils/constants')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_TOKEN
console.log(secretKey,"secretKey")

const register =async (req,res) =>{
 try {
    const {userName,email,password} = req.body
    const user = await authService.getUserByEmail({email})
    if (!user) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const token = jwt.sign({user},secretKey)
        const result = await authService.register({userName,email,password: hashedPassword})
        if (!result) return res.status(400).send({ message: constants.REGISTRATION_FAILED })
            return res.header('x-auth-token',token).status(200).send({ message: constants.REGISTRATION_SUCCESS, result})
    }else{
        return res.status(400).send({ message: constants.EMAIL_ALREADY_EXIST })
    }
 } catch (error) {
    return res.status(500).send({ message: error.message })
 }
    
}

const login = async(req,res) => {
    try {
        const {email, password} = req.body
        const user = await authService.getUserByEmail({email})
        if (!user) return res.status(400).send({message: constants.INVALID_EMAIL})
        const validatePassword = await bcrypt.compare(password,user.password)
        console.log(validatePassword,"validatePassword")
        if (!validatePassword) return res.status(400).send({message: constants.INVALID_PASSWORD }) 
        const token = jwt.sign({user},secretKey)
        return res.header('x-auth-token',token).status(200).send({message: constants.LOGIN_SUCCESS})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}

module.exports ={
    register,
    login
}