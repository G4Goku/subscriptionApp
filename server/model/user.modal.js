const mongoose = require('mongoose')
const User = mongoose.Schema

// Audit record of a checkout that Stripe confirmed as paid. Stripe stays the
// source of truth for the live status; this is what the app has seen happen.
const subscriptionSchema = new User({
    subscriptionId: {
        type: String,
        required: true
    },
    checkoutSessionId: {
        type: String
    },
    priceId: {
        type: String
    },
    planName: {
        type: String
    },
    amount: {
        type: Number
    },
    currency: {
        type: String
    },
    interval: {
        type: String
    },
    status: {
        type: String
    },
    currentPeriodEnd: {
        type: Date
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false })

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
    },
    stripeCustomerId:{
        type: String
    },
    subscriptions : [subscriptionSchema],
})

const Users = mongoose.model('User', userSchema);

module.exports = Users
