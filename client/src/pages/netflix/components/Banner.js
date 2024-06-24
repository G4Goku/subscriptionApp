import React from 'react'
import { useState, useEffect } from 'react'
import '../../../css/Banner.css'
import DashboardNavBar from '../../../components/DashboardNavBar'

import { FaPlay, } from "react-icons/fa";
import { VscAdd } from 'react-icons/vsc'
import { listMovies } from '../../../helper/api_helper'


const Banner = () => {
    const [movies, setMovies] = useState([])
    const base_url = "https://image.tmdb.org/t/p/original/"

    // fn to call api
    const getData  = async ()=> {
        try {
            const result = await listMovies({genre:"originals"})
            console.warn(result,"dashboard");
           setMovies(result.data.results[
               Math.floor(Math.random() * result.data.results.length - 1)
           ])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    // console.log(movies);
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "...." : str
    }
    return (
        <div className='banner' style={{
            backgroundImage: `url(${base_url}${movies?.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",


        }}>
            <DashboardNavBar ></DashboardNavBar>
            <div className='bannercontent'>
                <h1 style={{ maxWidth: 450 }}>{movies?.title}</h1>
                <button><FaPlay style={{ marginRight: '6px' }} /> Now</button>
                <button style={{ marginLeft: '10px' }}><VscAdd style={{ marginRight: '6px' }} />My List</button>

                <h4 className='mt-2' style={{ maxWidth: 450, color:'white' }}>
                    {truncate(movies?.overview, 150)}</h4>
            </div>


        </div>
    )
}

export default Banner
