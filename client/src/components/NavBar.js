import React from "react";
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a class="header__logo mt-3" href="#">
                    <img src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media/netflix.svg" alt="" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto me-5">
                            <Link to="/" className="nav-link active fw-medium">
                                Home
                            </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar