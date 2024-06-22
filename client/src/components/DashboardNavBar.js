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
                <p style={{ marginTop: '-37px', fontSize: '19px' }}>Home</p>
                <p style={{ marginTop: '-43px', fontSize: '19px', marginLeft: '78px' }}>TV Shows</p>
                <p style={{ marginTop: '-43px', fontSize: '19px', marginLeft: '188px' }}>Movies</p>
                <p style={{ marginTop: '-43px', fontSize: '19px', marginLeft: '273px' }}>Recently Added</p>

                <p style={{ marginTop: '-43px', fontSize: '19px', marginLeft: '426px' }}>My List</p>
                <p style={{ marginTop: '-43px', fontSize: '23px', marginLeft: '1143px' }}><BiSearch /></p>
                <p style={{ marginTop: '-51px', fontSize: '19px', marginLeft: '1212px' }}><BsBellFill /></p>

            </div>
        </div>
    )
}

export default DashboardNavBar
