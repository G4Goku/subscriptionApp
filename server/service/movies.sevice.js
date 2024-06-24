const axios = require('axios');
require('dotenv').config()
const baseUrl = process.env.MOVIE_DB_BASE_URL
const APIKEY = process.env.MOVIE_DB_API_KEY;

const list = async (genre) => {
    console.log(genre,":genre")
    const requests = {
        trending: `/trending/all/week?api_key=${APIKEY}&language=en-US`,
        originals: `/discover/tv?api_key=${APIKEY}&with_networks=213`,
        topRated: `/movie/top_rated?api_key=${APIKEY}&language=en-US`,
        action: `/discover/movie?api_key=${APIKEY}&with_genres=28`,
        comedy: `/discover/movie?api_key=${APIKEY}&with_genres=35`,
        horror: `/discover/movie?api_key=${APIKEY}&with_genres=27`,
        romance: `/discover/movie?api_key=${APIKEY}&with_genres=10749`,
        documentary: `/discover/movie?api_key=${APIKEY}&with_genres=99`,
    };

    try {
        let url;
        switch (genre) {
            case "trending":
                url = requests.trending;
                break;
            case "originals":
                url = requests.originals;
                break;
            case "topRated":
                url = requests.topRated;
                break;
            case "action":
                url = requests.action;
                break;
            case "comedy":
                url = requests.comedy;
                break;
            case "horror":
                url = requests.horror;
                break;
            case "romance":
                url = requests.romance;
                break;
            case "documentary":
                url = requests.documentary;
                break;
            default:
                throw new Error("Invalid query parameter");
        }
        console.log(`${baseUrl}${url}`,"`${baseUrl}${url}`")
        const response = await axios.get(`${baseUrl}${url}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error; // rethrow the error after logging it
    }
};


module.exports = {
    list
}