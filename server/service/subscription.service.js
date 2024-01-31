const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)

const list = async () =>{
    let prices = await stripe.prices.list({
        limit: 3,
      });
    return prices   
}
const subscribe = async (subId, priceId) =>{
    let session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types : ["card"],
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        customer: subId,
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url:  process.env.STRIPE_CANCEL_URL,
        // shipping_address_collection: {
        //     allowed_countries: ["US", "CA", "GB", "AU", "IN", "..."],
        // }
    });
    return session   
}

module.exports = {
    list,
    subscribe
}