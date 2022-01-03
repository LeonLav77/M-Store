import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchProductsPerPageQuery } from "../slices/productsDataSlice";
import "../../css/ProductsPage.css";
import { Navbar } from "../components/Navbar";
import { useDimensions } from "../hooks/useDimensions";

export const ProductsPage = () => {
    const { data, error, isLoading } = useFetchProductsPerPageQuery(
        "allProductsWCP?productsPerPage=10"
    );
    const dimensions = useDimensions();
    const [categories, setCategories] = useState(Array(9).fill(" "));
    const [currentFilterPrice, setCurrentFilterPrice] = useState("50");
    const [recents, setRecents] = useState(Array(5).fill(" "));
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [showRecents, setShowRecents] = useState(false);

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        console.log(currentFilterPrice, selectedCategory, keyword);
    };

    return (
        <>
            <Navbar />
            <div className="main_all_products_container">
                <div>
                    <div className="filters_container">
                        {dimensions.screenWidth <= 1400 && !showFilters ? (
                            <h1 onClick={() => setShowFilters(true)}>
                                Filters &gt;
                            </h1>
                        ) : (
                            <>
                                <h1>Filter Results</h1>
                                <div className="category_filter">
                                    <h5>Choose Category</h5>
                                    <select name="" id="" value="">
                                        <option
                                            value=""
                                            selected
                                            hidden
                                            disabled
                                        >
                                            None
                                        </option>
                                        {categories.map((_, id) => (
                                            <option
                                                onClick={() =>
                                                    setSelectedCategory("nisto")
                                                }
                                                key={id}
                                                value=""
                                            >
                                                category
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="price_filter">
                                    <h5>Price</h5>
                                    <input
                                        type="range"
                                        name="price"
                                        min={0}
                                        max={100}
                                        value={currentFilterPrice}
                                        onChange={(e) =>
                                            setCurrentFilterPrice(
                                                e.target.value
                                            )
                                        }
                                    ></input>
                                    <h6>0-{currentFilterPrice}kn</h6>
                                </div>
                                <div className="keyword_filter">
                                    <h5>Filter Results By Name</h5>
                                    <input
                                        type="text"
                                        placeholder="Enter product name..."
                                        onChange={(e) =>
                                            setKeyword(e.target.value)
                                        }
                                    />
                                </div>
                                <br />
                                <button
                                    type="submit"
                                    onClick={searchSubmitHandler}
                                >
                                    Submit
                                </button>
                            </>
                        )}
                    </div>
                    <div className="recent_searches">
                        {dimensions.screenWidth <= 1400 && !showRecents ? (
                            <h1 onClick={() => setShowRecents(true)}>
                                Recents &gt;
                            </h1>
                        ) : (
                            <>
                                <h1>recents</h1>
                                <div>
                                    {recents.map((_, id) => (
                                        <p key={id}>nisto</p>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
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
                                        width: "95%",
                                        padding: 20,
                                        display: "flex",
                                        backgroundColor: "whitesmoke",
                                        boxShadow:
                                            "3px 3px 6px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    <img
                                        src={item.images[0].path}
                                        alt=""
                                        style={{
                                            width: 150,
                                            height: 150,
                                            backgroundColor: "lightgray",
                                            margin: 20,
                                        }}
                                    />
                                    <div style={{ marginTop: 5 }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <Link
                                                to={`/products/${item.id}`}
                                                style={{ fontSize: 32 }}
                                                state={{ item }}
                                            >
                                                {item.name}
                                            </Link>
                                            {item.discount?.discount && (
                                                <h5 className="on_sale_header">
                                                    SALE
                                                </h5>
                                            )}
                                        </div>
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
            </div>
        </>
    );
};
