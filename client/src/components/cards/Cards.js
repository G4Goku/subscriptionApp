import React, { useEffect, useState } from "react";
import "../../css/common.css"
import { listPrice, createSubscription } from "../../helper/api_helper";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Fallbacks used when a Stripe product carries no metadata of its own, so the
// table still reads as a tiered comparison from cheapest to most expensive.
const PLAN_TIERS = [
    { quality: "Good", resolution: "720p" },
    { quality: "Better", resolution: "1080p" },
    { quality: "Best", resolution: "4K+HDR" },
]

const planDetails = (price, index) => {
    const fallback = PLAN_TIERS[Math.min(index, PLAN_TIERS.length - 1)]
    const metadata = price?.product?.metadata ?? {}
    return {
        name: price?.nickname || price?.product?.name || `Plan ${index + 1}`,
        quality: metadata.video_quality || fallback.quality,
        resolution: metadata.resolution || fallback.resolution,
    }
}

const formatAmount = (price) => {
    const amount = (price?.unit_amount ?? 0) / 100
    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: (price?.currency || "usd").toUpperCase(),
            minimumFractionDigits: 0,
        }).format(amount)
    } catch (error) {
        return `$${amount}`
    }
}

const Cards = () => {
    const navigate = useNavigate()
    const [prices, setPrices] = useState([])
    const [selectedPriceId, setSelectedPriceId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [subscribing, setSubscribing] = useState(false)

    useEffect(() => {
        fetchPrices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAuthError = (error) => {
        if (error?.response?.status === 401) {
            navigate("/login")
            return true
        }
        return false
    }

    const fetchPrices = async () => {
        setLoading(true)
        try {
            const result = await listPrice()
            const available = result?.data?.prices ?? []
            setPrices(available)
            // preselect the cheapest plan so the button is never a dead end
            if (available.length > 0) setSelectedPriceId(available[0].id)
        } catch (error) {
            if (!handleAuthError(error)) {
                toast.error(error?.response?.data?.message ?? "Unable to load plans", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } finally {
            setLoading(false)
        }
    }

    const handleSubscribe = async () => {
        if (!selectedPriceId || subscribing) return
        setSubscribing(true)
        try {
            const result = await createSubscription({ priceId: selectedPriceId })
            const checkoutUrl = result?.data?.url
            if (!checkoutUrl) throw new Error("Checkout session did not return a url")
            // full page navigation: Stripe Checkout is hosted outside the SPA
            window.location.href = checkoutUrl
        } catch (error) {
            if (!handleAuthError(error)) {
                toast.error(error?.response?.data?.message ?? error.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            setSubscribing(false)
        }
    }

    if (loading) {
        return (
            <React.Fragment>
                <NavBar />
                <div className="text-center mt-5">Loading plans...</div>
            </React.Fragment>
        )
    }

    if (prices.length === 0) {
        return (
            <React.Fragment>
                <NavBar />
                <ToastContainer />
                <div className="text-center mt-5">
                    <p>No plans available right now.</p>
                    <button className="btn btn-outline-danger" onClick={fetchPrices}>Try again</button>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <NavBar />
            <ToastContainer />
            <div className="d-flex justify-content-center mt-5">
                <main className="max-w-5xl transition-all md:px-10">
                    <h1 className="mb-3 text-3xl font-medium">
                        Choose the plan that's right for you
                    </h1>
                    <ul style={{ listStyleType: 'none' }}>
                        <li className="flex items-center gap-x-2 text-lg">
                            <i className="fa-solid fa-check fa-xl me-1" style={{ color: "#d30d0d" }}></i> Watch all you want.
                            Ad-free.
                        </li>
                        <li className="flex items-center gap-x-2 text-lg">
                            <i className="fa-solid fa-check fa-xl me-1" style={{ color: "#d30d0d" }}></i> Recommendations just
                            for you.
                        </li>
                        <li className="flex items-center gap-x-2 text-lg">
                            <i className="fa-solid fa-check fa-xl me-1" style={{ color: "#d30d0d" }}></i> Upgrade or cancel your
                            plan anytime.
                        </li>
                    </ul>
                </main>
            </div>

            <div className="container mt-4">
                <table className="table plans_table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ borderBottom: "0px" }}></th>
                            {prices.map((price, index) => (
                                <th
                                    key={price.id}
                                    scope="col"
                                    style={{ borderBottom: "0px" }}
                                    className={price.id === selectedPriceId ? "plan_column plan_column_selected" : "plan_column"}
                                    onClick={() => setSelectedPriceId(price.id)}
                                >
                                    <div className="plan_callout">{planDetails(price, index).name}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="fw-bold plan_label">Monthly price</td>
                            {prices.map((price) => (
                                <td key={price.id} className={price.id === selectedPriceId ? "plan_column_selected" : undefined}>
                                    <span className="fw-bold">
                                        {formatAmount(price)}
                                        {price.recurring?.interval ? `/${price.recurring.interval}` : ""}
                                    </span>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="fw-bold plan_label">Video quality</td>
                            {prices.map((price, index) => (
                                <td key={price.id} className={price.id === selectedPriceId ? "plan_column_selected" : undefined}>
                                    <span className="fw-bold">{planDetails(price, index).quality}</span>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="fw-bold plan_label">Resolution</td>
                            {prices.map((price, index) => (
                                <td key={price.id} className={price.id === selectedPriceId ? "plan_column_selected" : undefined}>
                                    <span className="fw-bold">{planDetails(price, index).resolution}</span>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="plan_label"></td>
                            {prices.map((price, index) => (
                                <td key={price.id} className={price.id === selectedPriceId ? "plan_column_selected" : undefined}>
                                    <input
                                        type="radio"
                                        name="plan"
                                        className="form-check-input"
                                        aria-label={`Select ${planDetails(price, index).name}`}
                                        checked={price.id === selectedPriceId}
                                        onChange={() => setSelectedPriceId(price.id)}
                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>

                <div className="d-flex justify-content-center mb-5">
                    <button
                        className="btn btn-danger btn-lg fs-6 subscribe_button"
                        onClick={handleSubscribe}
                        disabled={!selectedPriceId || subscribing}
                    >
                        {subscribing ? "Redirecting to checkout..." : "Subscribe"}
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cards
