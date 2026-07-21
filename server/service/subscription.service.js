const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)
const User = require('../model/user.modal')

// Stripe substitutes the placeholder when it redirects, which is what lets the
// success page ask the server to confirm the checkout it just came back from.
const appendSessionId = (url) => {
    if (!url) return url
    return `${url}${url.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}`
}

const list = async () =>{
    let prices = await stripe.prices.list({
        active: true,
        type: 'recurring',
        limit: 10,
        expand: ['data.product']
      });
    return prices
}

const getPrice = async (priceId) => {
    const price = await stripe.prices.retrieve(priceId)
    return price
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
        success_url: appendSessionId(process.env.STRIPE_SUCCESS_URL),
        cancel_url:  process.env.STRIPE_CANCEL_URL,
        // shipping_address_collection: {
        //     allowed_countries: ["US", "CA", "GB", "AU", "IN", "..."],
        // }
    });
    return session
}

const getCheckoutSession = async (sessionId) => {
    // items (and their prices) come back inline on the expanded subscription
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['subscription']
    })
    return session
}

const listCustomerSubscriptions = async (customerId) => {
    // 'all' is needed because Stripe takes a single status and both active and
    // trialing count as subscribed; the high limit keeps a long tail of
    // cancelled subscriptions from pushing a live one off the page
    const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        limit: 100
    })
    return subscriptions
}

const getProductName = async (price) => {
    if (!price) return null
    if (price.nickname) return price.nickname
    if (!price.product) return null
    if (typeof price.product === 'object') return price.product.name ?? null
    const product = await stripe.products.retrieve(price.product)
    return product?.name ?? null
}

/**
 * Appends the subscription only when it is not already recorded, so a user
 * refreshing the success page cannot create duplicate entries.
 */
const saveSubscription = async (userId, subscription) => {
    const user = await User.findOneAndUpdate(
        { _id: userId, 'subscriptions.subscriptionId': { $ne: subscription.subscriptionId } },
        { $push: { subscriptions: subscription } },
        { new: true }
    )
    return user
}

module.exports = {
    list,
    getPrice,
    subscribe,
    getCheckoutSession,
    listCustomerSubscriptions,
    getProductName,
    saveSubscription
}
