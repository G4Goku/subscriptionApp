const constants = require('../utils/constants')
const subscriptionService = require('../service/subscription.service')

const ACTIVE_STATUSES = ['active', 'trialing']
// a trial or a fully discounted plan completes checkout without a charge
const SETTLED_PAYMENT_STATUSES = ['paid', 'no_payment_required']

const toEpochDate = (seconds) => (seconds ? new Date(seconds * 1000) : null)

const buildSubscriptionRecord = (subscription, planName, checkoutSessionId = null) => {
    const item = subscription?.items?.data?.[0]
    const price = item?.price
    return {
        subscriptionId: subscription.id,
        checkoutSessionId,
        priceId: price?.id ?? null,
        planName: planName ?? null,
        amount: price?.unit_amount ?? null,
        currency: price?.currency ?? null,
        interval: price?.recurring?.interval ?? null,
        status: subscription.status,
        currentPeriodEnd: toEpochDate(subscription.current_period_end ?? item?.current_period_end)
    }
}

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
        if (!priceId) return res.status(400).send({ message: constants.PRICE_ID_REQUIRED })
        if (!user.stripeCustomerId) return res.status(400).send({ message: constants.STRIPE_CUSTOMER_MISSING })

        // never hand an unchecked id straight to checkout
        const price = await subscriptionService.getPrice(priceId).catch(() => null)
        if (!price || !price.active) return res.status(400).send({ message: constants.INVALID_PRICE })

        // a second checkout would bill an already subscribed customer twice
        const existing = await subscriptionService.listCustomerSubscriptions(user.stripeCustomerId)
        const alreadySubscribed = (existing?.data ?? []).some((item) => ACTIVE_STATUSES.includes(item.status))
        if (alreadySubscribed) return res.status(409).send({ message: constants.SUBSCRIPTION_ALREADY_ACTIVE })

        const session = await subscriptionService.subscribe(user.stripeCustomerId, priceId)
        if (!session || !session.url) return res.status(400).send({ message: constants.SUBSCRIPTION_FAILED })
        return res.status(200).send({
            sessionId: session.id,
            url: session.url,
            message: constants.SUBSCRIPTION_SUCCESS
        })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

/**
 * Called by the success page with the session_id Stripe redirected back with.
 * The session is re-fetched from Stripe rather than trusted from the client,
 * so only a checkout that Stripe reports as paid is recorded on the user.
 */
const confirmSubscription = async (req, res) => {
    try {
        const user = req.user
        const sessionId = req.body.sessionId
        if (!sessionId) return res.status(400).send({ message: constants.SESSION_ID_REQUIRED })

        const session = await subscriptionService.getCheckoutSession(sessionId).catch(() => null)
        if (!session) return res.status(400).send({ message: constants.SUBSCRIPTION_SESSION_INVALID })

        const sessionCustomerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
        if (!sessionCustomerId || sessionCustomerId !== user.stripeCustomerId) {
            return res.status(403).send({ message: constants.SUBSCRIPTION_SESSION_MISMATCH })
        }
        if (session.status !== 'complete' || !SETTLED_PAYMENT_STATUSES.includes(session.payment_status)) {
            return res.status(402).send({ message: constants.SUBSCRIPTION_NOT_COMPLETED })
        }

        const subscription = session.subscription
        if (!subscription || typeof subscription === 'string') {
            return res.status(400).send({ message: constants.SUBSCRIPTION_SESSION_INVALID })
        }

        const planName = await subscriptionService.getProductName(subscription.items?.data?.[0]?.price)
        const record = buildSubscriptionRecord(subscription, planName, session.id)
        await subscriptionService.saveSubscription(user._id, record)

        return res.status(200).send({ subscription: record, message: constants.SUBSCRIPTION_CONFIRMED })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

const getSubscriptionStatus = async (req, res) => {
    try {
        const user = req.user
        if (!user.stripeCustomerId) {
            return res.status(200).send({
                isSubscribed: false,
                subscriptions: [],
                message: constants.SUBSCRIPTION_STATUS_SUCCESS
            })
        }

        // read live from Stripe: a stored status goes stale once a plan renews,
        // is cancelled or fails payment
        const subscriptions = await subscriptionService.listCustomerSubscriptions(user.stripeCustomerId)
        const active = (subscriptions?.data ?? []).filter((item) => ACTIVE_STATUSES.includes(item.status))

        return res.status(200).send({
            isSubscribed: active.length > 0,
            subscriptions: active.map((item) => buildSubscriptionRecord(item, item.items?.data?.[0]?.price?.nickname)),
            message: constants.SUBSCRIPTION_STATUS_SUCCESS
        })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

module.exports = {
    listPrices,
    createSubscription,
    confirmSubscription,
    getSubscriptionStatus
}