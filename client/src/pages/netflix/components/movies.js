import React from 'react'
import { useState, useEffect } from 'react'
import { listMovies } from '../../../helper/api_helper'
import '../../../css/common.css'



const Movies = ({ genre, genreKeyword, isLargeRow }) => {
    const [movies, setMovies] = useState([])
    const base_url = "https://image.tmdb.org/t/p/original/"

    // fn to call api
    const getData  = async ()=> {
        try {
            const result = await listMovies({genre: genreKeyword})
            console.warn(result?.data?.results,"result")
           setMovies(result?.data?.results)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <h1 style={{color:"black"}}>{genre}</h1>
            <div className='movies'>
                {movies && movies?.map(movie => (
                    <img className={`movie ${isLargeRow && 'largemovie'}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.original_name}
                    />
                ))}
            </div>
        </div >
    )

}

export default Movies
