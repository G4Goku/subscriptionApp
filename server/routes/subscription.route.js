const express =require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const subscriptionController = require('../contoller/subscription.controller')


router.get('/listPrices', subscriptionController.listPrices)
// router.post('/login',authValidation.login,authController.login)

module.exports = router