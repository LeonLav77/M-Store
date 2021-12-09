import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Products = () => {
    const [data, setData] = useState([]);
    const getData = () => {
        return axios
            .get("http://127.0.0.1:8000/api/allProductsWCP?productsPerPage=10")
            .then((res) => setData(res.data.data))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
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
                            <Link
                                to={`/products/${item.id}`}
                                style={{ fontSize: 32 }}
                                state={{ item }}
                            >
                                {item.name}
                            </Link>
                            <p>{item.description}</p>
                            <h3>
                                {item.discount?.discount
                                    ? "Discout: "
                                    : "Current Price: "}
                                {item.discount?.discount ?? item.current_price}
                                Kn
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
