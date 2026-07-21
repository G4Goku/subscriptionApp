import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

const SubscriptionCancel = () => {
    return (
        <React.Fragment>
            <NavBar />
            <div className="d-flex justify-content-center mt-5">
                <div className="text-center subscription_result">
                    <i className="fa-regular fa-circle-xmark fa-2xl" style={{ color: "#d30d0d" }}></i>
                    <h4 className="mt-3">Checkout cancelled.</h4>
                    <p className="text-muted">
                        You have not been charged. Pick a plan whenever you're ready.
                    </p>
                    <Link className="btn btn-danger mt-2" to="/planCard">Back to plans</Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SubscriptionCancel
