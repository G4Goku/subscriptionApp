const express =require('express')
const middleware = require('../middleware/auth')
const router = express.Router()
const subscriptionController = require('../controller/subscription.controller')


router.get('/listPrices',middleware.auth , subscriptionController.listPrices)
router.post('/subscribe',middleware.auth, subscriptionController.subscribe)

module.exports = router