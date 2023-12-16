require('dotenv').config()
const authService =require('../service/auth.service')
const constants = require('../utils/constants')
const bcrypt = require('bcrypt')

const register =async (req,res) =>{
 try {
    const {userName,email,password} = req.body
    const user = await authService.getUserByEmail({email})
    if (!user) {
        const stripeCustomer = await authService.createStripeCustomer({email,userName})
        console.log({stripeCustomer});
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const result = await authService.register({userName,email,password: hashedPassword, stripeCustomerId: stripeCustomer.id })
        console.log(result)
        const token = await authService.generateToken({sub: result._id})
        if (!result) return res.status(400).send({ message: constants.REGISTRATION_FAILED })
            return res.status(200).send({ token, message: constants.REGISTRATION_SUCCESS, result})
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
        if (!validatePassword) return res.status(400).send({message: constants.INVALID_PASSWORD }) 
        const token = await authService.generateToken({sub :user._id})
        return res.status(200).send({message: constants.LOGIN_SUCCESS, token})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}

module.exports ={
    register,
    login
}