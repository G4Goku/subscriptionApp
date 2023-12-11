import React, { useEffect, useState } from "react";
import "../../css/common.css"
import { listPrice } from "../../helper/api_helper";

const Cards = () => {

    const [prices, setPrices] = useState()
    useEffect(() => {
        fetchPrices()
    }, []);

    const fetchPrices = async () => {
        const result = await listPrice()
        setPrices(result.data.prices)
    }

    return (
        <React.Fragment>
            <div className="wrapper mt-5">
                <div className="pricing-plan">
                    {prices?.map((item, index) => (
                        <div className="plan best" key={index}>
                            <div className="first-cut">
                                <div>
                                    {console.warn({ item })}
                                    <h2>{item.nickname}</h2>
                                    <div className="price">
                                        <p className="">{(item.unit_amount / 100).toFixed(2)}</p>
                                        <p className="">/{item.recurring.interval}</p>
                                    </div>
                                    <div>
                                        <div>
                                            <a href="#" className="button">
                                                Subscribe
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="title">{`For ${item.nickname} subscription`}</p>
                                    <ul>
                                        <li>All Expert features plus</li>
                                        <li>Detailed tutorials for each design</li>
                                        <li>Full access to Web Academy</li>
                                        <li className="tooltip">
                                            <span className="label">PRO</span>Label
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {item.nickname === "Standard" &&
                                <div className="popular">
                                    <div className="inner">
                                        <p>Most Popular</p>
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>

    )
}

export default Cards