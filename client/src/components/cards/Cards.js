import React from "react";
import { Col, Row, CardBody, CardGroup, Card, CardImg, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import "../../css/common.css"

const Cards = () => {

    return (
        <React.Fragment>
            <div className="wrapper mt-5">
                <div className="pricing-plan">
                    <div className="plan">
                        <div className="first-cut">
                            <div>
                                <h2>Basic</h2>
                                <div className="price">
                                    <p className="whole">$59</p>
                                    <div className="price-details">
                                        <p className="cent">.99</p>
                                        <p>monthly</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <a href="#" className="button">Get Started</a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="title">For expert members:</p>
                                <ul>
                                    <li>Access to expert challenges</li>
                                    <li>Join Slack community</li>
                                    <li>Access to design specifications</li>
                                    <li>Access to all assets</li>
                                    <li className="tooltip"><span className="label">EXPERT</span>Label</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="plan best">
                        <div className="first-cut">
                            <div>
                                <h2>Gold</h2>
                                <div className="price">
                                    <p className="whole">$99</p>
                                    <div className="price-details">
                                        <p className="cent">.99</p>
                                        <p>monthly</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <a href="#" className="button">Get Started</a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="title">For pro members:</p>
                                <ul>
                                    <li>All Expert features plus</li>
                                    <li>Detailed tutorials for each design</li>
                                    <li>Full access to Web Academy</li>
                                    <li className="tooltip"><span className="label">PRO</span>Label</li>
                                </ul>
                            </div>
                        </div>
                        <div className="popular">
                            <div className="inner">
                                <p>Most Popular</p>
                            </div>
                        </div>
                    </div>
                    <div className="plan">
                        <div className="first-cut">
                            <div>
                                <h2>Premium</h2>
                                <div className="price">
                                    <p className="whole">$199</p>
                                    <div className="price-details">
                                        <p className="cent">.99</p>
                                        <p>monthly</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <a href="#" className="button">Get Started</a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p class="title">For guru members:</p>
                                <ul>
                                    <li>All Pro features plus</li>
                                    <li>Code reviews</li>
                                    <li class="tooltip"><span class="label">GURU</span>Label</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cards