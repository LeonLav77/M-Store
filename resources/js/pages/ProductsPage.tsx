import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchProductsQuery } from "../slices/rtkQuerySlice";
import "../../css/ProductsPage.css";
import { Navbar } from "../components/Navbar";
import { useDimensions } from "../hooks/useDimensions";
import { PaginationFooter } from "../components/PaginationFooter";
import { useDispatch, useSelector } from "react-redux";
import { addToRecents, fetchFilteredProducts } from "../slices/dataSlice";
import axios from "axios";
import { RelatedCategoriesInterface } from "./ProductDetailsPage";

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
    const dispatch = useDispatch();
    const currentPage = useSelector(
        (state: any) => state.productsData.whatPage
    );
    const productsPerPageData = useFetchProductsQuery(currentPage);
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
    const showFilteredItems = useSelector(
        (state: any) => state.productsData.showFilteredProducts
    );
    const filteredProductsStatus = useSelector(
        (state: any) => state.productsData.status
    );
    const recentSearches = useSelector(
        (state: any) => state.productsData.recents
    );
    const dimensions = useDimensions();
    const [categories, setCategories] = useState<RelatedCategoriesInterface[]>(
        []
    );
    const [maxPrice, setMaxPrice] = useState<string | number>("100");
    const [selectedCategory, setSelectedCategory] = useState<string>(null);
    const [selectedSize, setSelectedSize] = useState<string>(null);
    const [selectedCondition, setSelectedCondition] = useState<string>(null);
    const conditions = ["new", "used"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const [keyword, setKeyword] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [showRecents, setShowRecents] = useState(false);
    // const [showFilteredItems, setShowFilteredItems] = useState(true);
    const [showCloseBtn, setShowCloseBtn] = useState(false);
    const [hideRecents, setHideRecents] = useState(false);
    const discountCheckboxRef = useRef(null);

    const searchSubmitHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (keyword != "") dispatch(addToRecents(keyword));
        dispatch(
            fetchFilteredProducts({
                maxPrice,
                keyword,
                category: selectedCategory,
                size: selectedSize,
                condition: selectedCondition,
                discount: discountCheckboxRef.current.checked ? "true" : "",
            })
        );
    };

    const getCategories = () => {
        return axios
            .get("http://127.0.0.1:8000/api/categories")
            .then((res: any) => {
                setCategories(res.data);
                console.log(res);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getCategories();
    }, []);
    useEffect(() => {}, [data]);

    return (
        <>
            <Navbar />
            <div className="main_all_products_container">
                <div style={{ minWidth: 300 }}>
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
                                    <select
                                        onChange={(e) => {
                                            if (e.target.value == "any")
                                                setSelectedCategory("");
                                            else
                                                setSelectedCategory(
                                                    e.target.value
                                                );
                                        }}
                                    >
                                        <option value="any" selected>
                                            any
                                        </option>
                                        {categories.map((category, id) => (
                                            <option
                                                key={id}
                                                value={category.name}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="category_filter">
                                    <h5>Choose Size</h5>
                                    <select
                                        onChange={(e) => {
                                            if (e.target.value == "any")
                                                setSelectedSize("");
                                            else
                                                setSelectedSize(e.target.value);
                                        }}
                                    >
                                        <option value="any" selected>
                                            any
                                        </option>
                                        {sizes.map((size, id) => (
                                            <option key={id} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="category_filter">
                                    <h5>Choose Condition</h5>
                                    <select
                                        onChange={(e) => {
                                            if (e.target.value == "any")
                                                setSelectedCondition("");
                                            else
                                                setSelectedCondition(
                                                    e.target.value
                                                );
                                        }}
                                    >
                                        <option value="any" selected>
                                            any
                                        </option>
                                        {conditions.map((condition, id) => (
                                            <option key={id} value={condition}>
                                                {condition}
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
                                        value={maxPrice}
                                        onChange={(e) =>
                                            setMaxPrice(e.target.value)
                                        }
                                    ></input>
                                    <h6>0-{maxPrice}kn</h6>
                                </div>
                                Discount Only:
                                <input
                                    type="checkbox"
                                    ref={discountCheckboxRef}
                                />
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
                                    {recentSearches.length == 0 ? (
                                        <h2>No Recent Searches...</h2>
                                    ) : (
                                        recentSearches.map(
                                            (recentSearch, id) => (
                                                <h3 key={id}>{recentSearch}</h3>
                                            )
                                        )
                                    )}
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
                                                        ? "Discount: "
                                                        : "Current Price: "}
                                                    {item.current_price.toFixed(
                                                        2
                                                    )}
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
                                        filteredProducts.data?.map(
                                            (item: any) => {
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="product_item_container"
                                                    >
                                                        <img
                                                            src={
                                                                item.images[0]
                                                                    .path
                                                            }
                                                            alt=""
                                                            className="product_item_image"
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
                                                                {item.current_price.toFixed(
                                                                    2
                                                                )}
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
