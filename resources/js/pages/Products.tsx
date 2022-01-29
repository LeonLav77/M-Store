import React from "react";
import { Link } from "react-router-dom";
import { useFetchProductsQuery } from "../slices/rtkQuerySlice";

export const Products = () => {
    const { data, error, isLoading } = useFetchProductsQuery(1);
    return (
        <div>
            <div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error...</div>
                ) : (
                    data.data.map((item) => {
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
                                    {item.discount?.discount ??
                                        item.current_price}
                                    Kn
                                </h3>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
