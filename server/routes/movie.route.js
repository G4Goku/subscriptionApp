const express =require('express')
const middleware = require('../middleware/auth')
const router = express.Router()
const movieController = require('../controller/movie.controller')

router.get('/list', middleware.auth, movieController.listMovies)

module.exports = router