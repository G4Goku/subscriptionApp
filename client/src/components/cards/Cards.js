import React, { useEffect, useState } from "react";
import "../../css/common.css"
import { listPrice } from "../../helper/api_helper";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import { Col, Row } from "reactstrap";

const Cards = () => {

    // const [prices, setPrices] = useState()
    // useEffect(() => {
    //     fetchPrices()
    // }, []);

    // const fetchPrices = async () => {
    //     const result = await listPrice()
    //     setPrices(result.data.prices)
    // }

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
                                    {/* <th scope="col">Header 1</th> */}
                                    {/* <th scope="col">Header 2</th>
                                <th scope="col">Header 3</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Value 1.1</td>
                                    {/* <td>Value 1.2</td>
                                <td>Value 1.3</td> */}
                                </tr>
                                <tr>
                                    <td>Value 2.1</td>
                                    {/* <td>Value 2.2</td>
                                <td>Value 2.3</td> */}
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col lg="8">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Header 1</th>
                                    <th scope="col">Header 2</th>
                                    <th scope="col">Header 3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Value 1.1</td>
                                    <td>Value 1.2</td>
                                    <td>Value 1.3</td>
                                </tr>
                                <tr>
                                    <td>Value 2.1</td>
                                    <td>Value 2.2</td>
                                    <td>Value 2.3</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>


            <div class="callout top">Premium</div>

        </React.Fragment>

    )
}

export default Cards