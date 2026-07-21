import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { confirmSubscription } from "../../helper/api_helper";
import NavBar from "../../components/NavBar";

const SubscriptionSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const [status, setStatus] = useState("confirming")
    const [message, setMessage] = useState("")
    const [subscription, setSubscription] = useState(null)
    // StrictMode runs effects twice in development; the server is idempotent
    // either way, this just avoids the duplicate request
    const requested = useRef(false)

    useEffect(() => {
        if (requested.current) return
        requested.current = true
        confirmCheckout()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const confirmCheckout = async () => {
        if (!sessionId) {
            setStatus("failed")
            setMessage("No checkout session was provided.")
            return
        }
        try {
            const result = await confirmSubscription({ sessionId })
            setSubscription(result?.data?.subscription ?? null)
            setMessage(result?.data?.message ?? "")
            setStatus("confirmed")
        } catch (error) {
            setMessage(error?.response?.data?.message ?? error.message)
            setStatus("failed")
        }
    }

    return (
        <React.Fragment>
            <NavBar />
            <div className="d-flex justify-content-center mt-5">
                <div className="text-center subscription_result">
                    {status === "confirming" && (
                        <React.Fragment>
                            <h4>Confirming your payment...</h4>
                            <p className="text-muted">This only takes a moment.</p>
                        </React.Fragment>
                    )}

                    {status === "confirmed" && (
                        <React.Fragment>
                            <i className="fa-regular fa-circle-check fa-2xl" style={{ color: "#d30d0d" }}></i>
                            <h4 className="mt-3">You're all set.</h4>
                            {subscription?.planName && (
                                <p className="text-muted mb-1">
                                    Your <span className="fw-medium text-dark">{subscription.planName}</span> plan is active.
                                </p>
                            )}
                            <p className="text-muted">{message}</p>
                            <Link className="btn btn-danger mt-2" to="/dashboard">Start watching</Link>
                        </React.Fragment>
                    )}

                    {status === "failed" && (
                        <React.Fragment>
                            <i className="fa-regular fa-circle-xmark fa-2xl" style={{ color: "#d30d0d" }}></i>
                            <h4 className="mt-3">We couldn't confirm your subscription.</h4>
                            <p className="text-muted">{message}</p>
                            <Link className="btn btn-outline-danger mt-2" to="/planCard">Back to plans</Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default SubscriptionSuccess
