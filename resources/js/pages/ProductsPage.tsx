import React, { MouseEvent, useEffect, useRef, useState } from "react";
import {
    useFetchCategoriesQuery,
    useFetchProductsQuery,
} from "../slices/rtkQuerySlice";
import "../../css/ProductsPage.css";
import { Navbar } from "../components/Navbar";
import { useDimensions } from "../hooks/useDimensions";
import { PaginationFooter } from "../components/PaginationFooter";
import { useDispatch, useSelector } from "react-redux";
import {
    addToRecents,
    fetchFilteredProducts,
    setLastDomainPath,
} from "../slices/dataSlice";
import { Error } from "../components/Error";
import { RelatedCategoriesInterface } from "./ProductDetailsPage";
import { ProductsList } from "../components/ProductsList";
import { FiMinimize2 } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { checkUser } from "../components/auth/Login";

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
    const fetchingProps = useSelector(
        (state: any) => state.productsData.fetchingProps
    );
    const checkIfUser = checkUser();
    const productsPerPageData = useFetchProductsQuery(fetchingProps);
    const {
        data: productsData,
        error: productsError,
        isLoading: productsLoading,
    }: {
        data?: productsPerPageDataInterface;
        error?: any;
        isLoading?: any;
    } = productsPerPageData;
    const navigate = useNavigate();

    // productsData as productsPerPageDataInterface;
    const categories = useFetchCategoriesQuery("categories");
    const {
        data: categoriesData,
        error: categoriesError,
        isLoading: categoriesLoading,
    }: {
        data?: RelatedCategoriesInterface[];
        error?: any;
        isLoading?: any;
    } = categories;
    // const filteredProducts = useSelector(
    //     (state: any) => state.productsData.filteredProducts
    // );
    // const showFilteredItems = useSelector(
    //     (state: any) => state.productsData.showFilteredProducts
    // );
    // const filteredProductsStatus = useSelector(
    //     (state: any) => state.productsData.status
    // );
    const recentSearches = useSelector(
        (state: any) => state.productsData.recents
    );
    const { user } = useAuth();
    const dimensions = useDimensions();

    //filter props - NE KORISIN
    // const [categories, setCategories] = useState<RelatedCategoriesInterface[]>(
    //     []
    // );
    const [maxPrice, setMaxPrice] = useState<string | number>("100");
    const [selectedCategory, setSelectedCategory] = useState<string>(null);
    const [selectedSize, setSelectedSize] = useState<string>(null);
    const [selectedCondition, setSelectedCondition] = useState<string>(null);
    const conditions = ["new", "used"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const [keyword, setKeyword] = useState("");

    //dropdowns
    const [showFilters, setShowFilters] = useState(false);
    const [showRecents, setShowRecents] = useState(false);
    const discountCheckboxRef = useRef(null);

    //listStyle
    const listStyle = useSelector((state: any) => state.productsData.listStyle);

    const searchSubmitHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (keyword != "") dispatch(addToRecents(keyword));
        // dispatch(
        //     fetchFilteredProducts({
        //         maxPrice,
        //         keyword,
        //         category: selectedCategory,
        //         size: selectedSize,
        //         condition: selectedCondition,
        //         discount: discountCheckboxRef.current.checked ? "true" : "",
        //         page: 1,
        //         // page: currentPage.split("?")[1].split("=")[1],
        //     })
        // );
    };
    useEffect(() => {
        console.log(checkIfUser);
        if (!user) navigate("/login");
        dispatch(setLastDomainPath("products"));
    }, []);
    useEffect(() => {}, [productsData]);

    return (
        <>
            <Navbar />
            <div className="main_all_products_container">
                <div style={{ minWidth: 300, width: 350 }}>
                    <div className="filters_container">
                        {dimensions.screenWidth <= 1400 || !showFilters ? (
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                onClick={() => {
                                    setShowFilters(true);
                                }}
                            >
                                <h3 style={{ margin: 0 }}>Filters</h3>
                                <FaChevronDown
                                    size={20}
                                    style={{
                                        marginRight: 5,
                                    }}
                                />
                            </div>
                        ) : (
                            <>
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h3>Filter Results</h3>
                                    <FiMinimize2
                                        style={{
                                            marginRight: 10,
                                            marginTop: 5,
                                        }}
                                        size={25}
                                        onClick={() => setShowFilters(false)}
                                    />
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
                                        {categoriesError ? (
                                            <Error showError={true} />
                                        ) : categoriesLoading ? (
                                            <h4>Loading...</h4>
                                        ) : (
                                            categoriesData.map(
                                                (category, id) => (
                                                    <option
                                                        key={id}
                                                        value={category.name}
                                                    >
                                                        {category.name}
                                                    </option>
                                                )
                                            )
                                        )}
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
                        {dimensions.screenWidth <= 1400 || !showRecents ? (
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                onClick={() => {
                                    setShowRecents(true);
                                }}
                            >
                                <h3 style={{ margin: 0 }}>Recents</h3>
                                <FaChevronDown
                                    size={20}
                                    style={{
                                        marginRight: 5,
                                    }}
                                />
                            </div>
                        ) : (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <h3>Recents</h3>
                                    <FiMinimize2
                                        style={{
                                            marginRight: 10,
                                            marginTop: 5,
                                        }}
                                        size={25}
                                        onClick={() => setShowRecents(false)}
                                    />
                                </div>
                                <div>
                                    {recentSearches.length == 0 ? (
                                        <h4>No Recent Searches...</h4>
                                    ) : (
                                        recentSearches.map(
                                            (recentSearch, id) => (
                                                <h4 key={id}>{recentSearch}</h4>
                                            )
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="products_list">
                    {productsLoading ? (
                        <h1>Loading...</h1>
                    ) : productsError ? (
                        <h1>Error...</h1>
                    ) : (
                        // ) : filteredProducts.message != undefined ? (
                        //     <h1>{filteredProducts.message}</h1>
                        <div style={{ width: "100%" }}>
                            <PaginationFooter
                                currentPage={productsData.current_page}
                                lastPage={productsData.last_page}
                                firstPage={productsData.first_page_url}
                                nextPage={productsData.next_page_url}
                                prevPage={productsData.prev_page_url}
                            />
                            <div
                                style={
                                    listStyle == "block"
                                        ? {
                                              display: "flex",
                                              flexWrap: "wrap",
                                              width: "100%",
                                          }
                                        : null
                                }
                            >
                                <ProductsList data={productsData.data} />
                                {/* {!showFilteredItems ? (
                                    <ProductsList data={data.data} />
                                ) : (
                                    <>
                                        {filteredProductsStatus == "pending" ? (
                                            <h1>loading</h1>
                                        ) : (
                                            <></>
                                            // <ProductsList
                                            //     data={filteredProducts.data}
                                            // />
                                        )}
                                    </>
                                )} */}
                            </div>
                            <PaginationFooter
                                currentPage={productsData.current_page}
                                lastPage={productsData.last_page}
                                firstPage={productsData.first_page_url}
                                nextPage={productsData.next_page_url}
                                prevPage={productsData.prev_page_url}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
