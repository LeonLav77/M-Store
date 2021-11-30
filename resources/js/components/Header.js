// resources/assets/js/components/Header.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Header = () => {
    const [data, setData] = useState([]);
    const getData = () => {
        return axios
            .get("http://m-store.ddns.net/api/allProductsWithRealPrice")
            .then((res) => res.data.map((item) => setData(res.data)))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <Link className="navbar-brand" to="nesto">
                        Tasksman
                    </Link>
                    <Link className="navbar-brand" to="miguel">
                        miguel
                    </Link>
                </div>
            </nav>
            <div>
                {data.map((item) => {
                    return (
                        <div
                            key={item.id}
                            style={{
                                border: "2px solid black",
                                margin: 20,
                                width: "80%",
                                padding: 20,
                            }}
                        >
                            <h1>{item.name}</h1>
                            <p>{item.description}</p>
                            <h3>
                                {item.discount?.discount
                                    ? "Discout: "
                                    : "Current Price: "}
                                {item.discount?.discount ??
                                    item.currentPrice.toFixed(2)}
                                Kn
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
