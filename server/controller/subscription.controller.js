const constants = require('../utils/constants')
const subscriptionService = require('../service/subscription.service')

const listPrices = async (req, res) => {
    try {
        const prices = await subscriptionService.list()
        const reversePrice = prices.data.reverse()
        console.log({reversePrice})
        if (!prices && prices.data.length <= 0) return res.status(400).send({ message: constants.PRICE_LIST_FAILED })
            return res.status(200).send({ prices: reversePrice, message: constants.PRICE_LIST_SUCCESS })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

const createSubscription = async (req, res) => {
    try {
        const user = req.user
        const priceId = req.body.priceId
        const subscribeData = await subscriptionService.subscribe(user.stripeCustomerId, priceId)
        if (!subscribeData) return res.status(400).send({ message: constants.SUBSCRIPTION_FAILED })
            return res.status(200).send({ subscribeData, message: constants.SUBSCRIPTION_SUCCESS })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

module.exports = {
    listPrices,
    createSubscription
}