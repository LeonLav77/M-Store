import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchProductsPerPageQuery } from "../slices/productsDataSlice";
import "../../css/ProductsPage.css";
import { Navbar } from "../components/Navbar";

export const ProductsPage = () => {
    const { data, error, isLoading } = useFetchProductsPerPageQuery(
        "allProductsWCP?productsPerPage=10"
    );
    const [categories, setCategories] = useState(Array(9).fill(" "));
    const [currentFilterPrice, setCurrentFilterPrice] = useState("50");
    const [recents, setRecents] = useState(Array(5).fill(" "));
    return (
        <>
            <Navbar />
            <div className="main_all_products_container">
                <div className="filters_container">
                    <h1>filters</h1>
                    <p>category</p>
                    <select name="" id="">
                        {categories.map((category, id) => (
                            <option key={id}>category</option>
                        ))}
                    </select>
                    <p>Price</p>
                    <input
                        type="range"
                        name="price"
                        min="1"
                        max="100"
                        value={currentFilterPrice}
                        onChange={(e) => setCurrentFilterPrice(e.target.value)}
                    ></input>
                    <p>{currentFilterPrice}Kn</p>
                    <p>Na,me</p>
                    <input type="text" placeholder="ENter product nbame.,." />
                    <h1></h1>
                    <button>Sumbmit</button>
                </div>
                <div className="products_list">
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
                                        display: "flex",
                                    }}
                                >
                                    <img
                                        src=""
                                        alt=""
                                        style={{
                                            width: 150,
                                            height: 150,
                                            backgroundColor: "lightgray",
                                            marginRight: 30,
                                        }}
                                    />
                                    <div>
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
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="recent_searches">
                    <h1>recents</h1>
                    <div>
                        {recents.map((_, id) => (
                            <p key={id}>nisto</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
