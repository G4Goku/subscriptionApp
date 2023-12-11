const express =require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const authController = require('../controller/auth.controller')
const authValidation = require('../middleware/validation/user.validation')

router.post('/register',authValidation.register,authController.register)
router.post('/login',authValidation.login,authController.login)

module.exports = router