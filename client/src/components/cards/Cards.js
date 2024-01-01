import React, { useEffect, useState } from "react";
import "../../css/common.css"
import { listPrice } from "../../helper/api_helper";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import { Col, Row } from "reactstrap";

const Cards = () => {

    const [prices, setPrices] = useState()
    console.warn({ prices });
    useEffect(() => {
        fetchPrices()
    }, []);

    const fetchPrices = async () => {
        const result = await listPrice()
        setPrices(result.data.prices)
    }

    return (
        <React.Fragment>
            <NavBar />
            <div className="d-flex justify-content-center mt-5">
                <main className="max-w-5xl transition-all md:px-10">
                    <h1 className="mb-3 text-3xl font-medium">
                        Choose the plan that's right for you
                    </h1>
                    <ul style={{ listStyleType: 'none' }}>
                        <li className="flex items-center gap-x-2 text-lg">
                            <i class="fa-solid fa-check fa-xl me-1" style={{ color: "#d30d0d" }}></i> Watch all you want.
                            Ad-free.
                        </li>
                        <li className="flex items-center gap-x-2 text-lg">
                            <i class="fa-solid fa-check fa-xl me-1" style={{ color: "#d30d0d" }}></i> Recommendations just
                            for you.
                        </li>
                        <li className="flex items-center gap-x-2 text-lg">
                            <i class="fa-solid fa-check fa-xl me-1" style={{ color: "#d30d0d" }}></i> Upgrade or cancel your
                            plan anytime.
                        </li>
                    </ul>
                </main>

            </div>
            <div class="container mt-4">
                <Row>
                    <Col lg="4">
                        <table class="table plan_side_table">
                            <thead>
                                <tr>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="fw-bold">Monthly price</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Video quality</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Resolution</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col lg="8">
                        <table class="table">
                            <thead>
                                <tr>
                                    {prices?.map((price, index) => (
                                        <th key={index} scope="col" style={{ borderBottom: "0px" }}>
                                            <div className="callout top d-flex align-items-center justify-content-center">{price.nickname}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {prices?.map((price, index) => (
                                        <td ><span className="table_value fw-bold">${price.unit_amount / 100}</span></td>
                                    ))}
                                </tr>
                                <tr>
                                    <td ><span className="table_value fw-bold">Good</span></td>
                                    <td ><span className="table_value fw-bold">Better</span></td>
                                    <td ><span className="table_value fw-bold">Best</span></td>
                                </tr>
                                <tr>
                                    <td ><span className="table_value fw-bold">720p</span></td>
                                    <td ><span className="table_value fw-bold">1080p</span></td>
                                    <td ><span className="table_value fw-bold">{"4K+HDR"}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
        </React.Fragment>

    )
}

export default Cards