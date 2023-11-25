const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)

const list = async () =>{
    let prices = await stripe.prices.list({
        limit: 3,
      });
    return prices   
}

module.exports = {
    list
}