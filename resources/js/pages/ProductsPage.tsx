import React, { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchProductsPerPageQuery } from "../slices/rtkQuerySlice";
import "../../css/ProductsPage.css";
import { Navbar } from "../components/Navbar";
import { useDimensions } from "../hooks/useDimensions";
import { PaginationFooter } from "../components/PaginationFooter";
import { useSelector } from "react-redux";

export interface ProductDataInterface {
    id: number;
    name: string;
    price: number;
    description: string;
    updated_at: string;
    seller_id: number;
    images: { product_id: number; path: string };
    discount: null | {
        created_at: null | string;
        discount: number;
        expiryDate: string;
        id: number;
        product_id: number;
        updated_at: null | string;
    };
    current_price: number;
    created_at: string;
    category_id: number;
}
interface LinkInterface {
    url: null | string;
    label: string;
    active: boolean;
}

interface productsPerPageDataInterface {
    current_page: number;
    data: ProductDataInterface[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkInterface[];
    next_page_url: string | null;
    path: string;
    prev_page: string;
    prev_page_url: null | string;
    total: number;
    to: number;
}

export const ProductsPage = () => {
    const productsPerPageData = useFetchProductsPerPageQuery(
        "allProductsWCP?productsPerPage=10"
    );
    const {
        data,
        error,
        isLoading,
    }: { data?: productsPerPageDataInterface; error?: any; isLoading?: any } =
        productsPerPageData;

    data as productsPerPageDataInterface;
    const filteredProducts = useSelector(
        (state: any) => state.productsData.filteredProducts
    );
    console.log(filteredProducts);
    const showFilteredItems = useSelector(
        (state: any) => state.productsData.showFilteredProducts
    );
    const filteredProductsStatus = useSelector(
        (state: any) => state.productsData.status
    );
    const dimensions = useDimensions();
    const [categories, setCategories] = useState<string[]>(Array(9).fill(" "));
    const [currentFilterPrice, setCurrentFilterPrice] = useState<
        string | number
    >("50");
    const [recents, setRecents] = useState<string[]>(Array(5).fill(" "));
    const [selectedCategory, setSelectedCategory] = useState<string>(null);
    const [keyword, setKeyword] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [showRecents, setShowRecents] = useState(false);
    // const [showFilteredItems, setShowFilteredItems] = useState(true);
    const [showCloseBtn, setShowCloseBtn] = useState(false);
    const [hideRecents, setHideRecents] = useState(false);

    useEffect(() => {
        console.log(data);
    }, [isLoading]);

    const searchSubmitHandler = (e: MouseEvent<HTMLButtonElement>) => {
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
                            <h1
                                onClick={() => {
                                    setShowFilters(true);
                                    setShowCloseBtn(true);
                                }}
                            >
                                Filters &gt;
                            </h1>
                        ) : (
                            <>
                                <div
                                    style={
                                        showCloseBtn
                                            ? {
                                                  width: "100%",
                                                  display: "flex",
                                                  justifyContent:
                                                      "space-between",
                                              }
                                            : null
                                    }
                                >
                                    <h1>Filter Results</h1>
                                    {showCloseBtn && (
                                        <h1
                                            onClick={() =>
                                                setShowFilters(false)
                                            }
                                        >
                                            X
                                        </h1>
                                    )}
                                </div>
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
                            <h1
                                onClick={() => {
                                    setShowRecents(true);
                                    setHideRecents(true);
                                }}
                            >
                                Recents &gt;
                            </h1>
                        ) : (
                            <>
                                <div
                                    style={
                                        hideRecents
                                            ? {
                                                  width: "100%",
                                                  display: "flex",
                                                  justifyContent:
                                                      "space-between",
                                              }
                                            : null
                                    }
                                >
                                    <h1>Recents</h1>
                                    {hideRecents && (
                                        <h1
                                            onClick={() =>
                                                setShowRecents(false)
                                            }
                                        >
                                            X
                                        </h1>
                                    )}
                                </div>
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
                        <h1>Loading...</h1>
                    ) : error ? (
                        <h1>Error...</h1>
                    ) : filteredProducts.message != undefined ? (
                        <h1>{filteredProducts.message}</h1>
                    ) : (
                        <div style={{ width: "100%" }}>
                            <PaginationFooter
                                currentPage={data.current_page}
                                lastPage={data.last_page}
                                firstPage={data.first_page_url}
                                nextPage={data.next_page_url}
                                prevPage={data.prev_page_url}
                            />
                            {!showFilteredItems ? (
                                data.data.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className="product_item_container"
                                        >
                                            <img
                                                src={item.images[0].path}
                                                alt=""
                                                className="product_item_image"
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
                                                        style={{
                                                            fontSize: 32,
                                                        }}
                                                        state={{ item }}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    {item.discount
                                                        ?.discount && (
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
                            ) : (
                                <div>
                                    {filteredProductsStatus == "pending" ? (
                                        <h1>loading</h1>
                                    ) : (
                                        filteredProducts.data.map(
                                            (item: any) => {
                                                return (
                                                    <div
                                                        key={item.id}
                                                        style={{
                                                            border: "2px solid black",
                                                            margin: 20,
                                                            width: "95%",
                                                            padding: 20,
                                                            display: "flex",
                                                            backgroundColor:
                                                                "whitesmoke",
                                                            boxShadow:
                                                                "3px 3px 6px rgba(0, 0, 0, 0.5)",
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                item.images[0]
                                                                    .path
                                                            }
                                                            alt=""
                                                            style={{
                                                                width: 150,
                                                                height: 150,
                                                                backgroundColor:
                                                                    "lightgray",
                                                                margin: 20,
                                                            }}
                                                        />
                                                        <div
                                                            style={{
                                                                marginTop: 5,
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexWrap:
                                                                        "wrap",
                                                                }}
                                                            >
                                                                <Link
                                                                    to={`/products/${item.id}`}
                                                                    style={{
                                                                        fontSize: 32,
                                                                    }}
                                                                    state={{
                                                                        item,
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                                {item.discount
                                                                    ?.discount && (
                                                                    <h5 className="on_sale_header">
                                                                        SALE
                                                                    </h5>
                                                                )}
                                                            </div>
                                                            <p>
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                            <h3>
                                                                {item.discount
                                                                    ?.discount
                                                                    ? "Discout: "
                                                                    : "Current Price: "}
                                                                {item.discount
                                                                    ?.discount ??
                                                                    item.current_price}
                                                                Kn
                                                            </h3>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )
                                    )}
                                </div>
                            )}
                            <PaginationFooter
                                currentPage={data.current_page}
                                lastPage={data.last_page}
                                firstPage={data.first_page_url}
                                nextPage={data.next_page_url}
                                prevPage={data.prev_page_url}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
