import React from "react";
import '../../css/common.css'
import Nav from '../../components/NavBar'
import { Link } from "react-router-dom";

const ChoosePlanCard = () => {
    return (
        <React.Fragment>
            <Nav />
            <div className="d-flex justify-content-center">
                <div className="choose_plan_card">
                    <div className="text-center">
                        <span><i className="fa-regular fa-circle-check fa-2xl" style={{ color: "#d30d0d" }}></i></span>
                        <p className="text-muted mt-2">STEP <span className="fs-6 fw-medium text-dark">2</span> OF <span className="fs-6 fw-medium text-dark">3</span></p>
                        <h4>Choose Your Plan.</h4>
                    </div>
                    <div className="justify-content-center ms-5">
                        <p><i className="fa-solid fa-check fa-xl me-1" style={{ color: "#d30d0d" }}></i> No commitments, cancel anytime</p>
                        <p><i className="fa-solid fa-check fa-xl me-1" style={{ color: "#d30d0d" }}></i> Everything on Netflix for one low price</p>
                        <p><i className="fa-solid fa-check fa-xl me-1" style={{ color: "#d30d0d" }}></i> No commitments, cancel anytime</p>
                        <Link to="/planCard" className="btn btn-danger next_button mt-1">Next</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChoosePlanCard