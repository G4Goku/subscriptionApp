const constants = require('../utils/constants')
const subscriptionService = require('../service/subscription.service')

const listPrices = async (req, res) => {
    try {
        const prices = await subscriptionService.list()
        if (!prices || !prices.data || prices.data.length <= 0) {
            return res.status(400).send({ message: constants.PRICE_LIST_FAILED })
        }
        // cheapest plan first, so the UI can lay the tiers out left to right
        const sortedPrices = [...prices.data].sort((a, b) => a.unit_amount - b.unit_amount)
        return res.status(200).send({ prices: sortedPrices, message: constants.PRICE_LIST_SUCCESS })
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