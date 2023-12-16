const User = require('../model/user.modal')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_TOKEN
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)

const register = async (data) =>{
    const result = await User.create(data)
    return result   
}

const getUserByEmail = async (data) =>{
    const result = await User.findOne(data)
    return result 
}

const getUserById = async (id) => {
    const user = await User.findOne(id)
    return user
}

const createStripeCustomer = async (userData) => {
    const customer = await stripe.customers.create({
        name: userData.userName,
        email: userData.email
      });
    return customer
}

const generateToken = (user) => {
    return jwt.sign(user,secretKey)
}

module.exports ={
    getUserByEmail,
    register,
    getUserById,
    createStripeCustomer,
    generateToken
}