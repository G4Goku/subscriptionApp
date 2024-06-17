const movieService = require('../service/movies.sevice');
const constants = require('../utils/constants');

const listMovies = async (req, res) => {
    try {
        const movies = await movieService.list(req.query.genre)
        if (!movies) return res.status(400).send({ message: constants.MOVIE_LIST_FAILED })
            return res.status(200).send(movies)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

module.exports = {
    listMovies
}