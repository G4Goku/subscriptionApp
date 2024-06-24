import React from 'react'
import { BiSearch, } from "react-icons/bi";
import { BsBellFill, } from "react-icons/bs";
import { useState, useEffect } from 'react';
import "../css/common.css"

const DashboardNavBar = () => {
    const [show, handleshow] = useState(false)

    useEffect(() => {
        // to check events happened or not 
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleshow(true)
            }
            else {
                handleshow(false)
            }
        })
    }, [])
    // console.log(show);

    return (
        <div className={`nav ${show && 'nav-black'}`}>
            <img
                className='logo'
                style={{
                    width: '110px',
                    marginLeft: '40px',
                    marginTop: '10px'
                }}
                src='https://www.freepnglogos.com/uploads/netflix-logo-0.png'
            />
            <div style={{ marginLeft: '205px' }}>
                <p style={{ marginTop: '-37px', fontSize: '19px', color:'white' }}>Home</p>
                <p style={{ marginTop: '-43px', fontSize: '19px', marginLeft: '78px', color:'white' }}>TV Shows</p>
                <p style={{ marginTop: '-43px', fontSize: '19px', marginLeft: '188px', color:'white' }}>Movies</p>
                <p style={{ marginTop: '-43px', fontSize: '19px', marginLeft: '273px', color:'white' }}>Recently Added</p>

                <p style={{ marginTop: '-43px', fontSize: '19px', marginLeft: '426px', color:'white' }}>My List</p>
                <p style={{ marginTop: '-43px', fontSize: '23px', marginLeft: '1143px', color:'white' }}><BiSearch /></p>
                <p style={{ marginTop: '-51px', fontSize: '19px', marginLeft: '1212px', color:'white' }}><BsBellFill /></p>

            </div>
        </div>
    )
}

export default DashboardNavBar
