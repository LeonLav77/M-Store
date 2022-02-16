import React, { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiMinimize2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useDimensions } from "../hooks/useDimensions";
import { RelatedCategoriesInterface } from "../pages/ProductDetailsPage";
import { addToRecents, setFetchingProps } from "../slices/dataSlice";
import { useFetchCategoriesQuery } from "../slices/rtkQuerySlice";
import { Error } from "./Error";

export const ProductFilters = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(
        (state: any) => state.productsData.currentPage
    );
    const [showFilters, setShowFilters] = useState(false);
    const dimensions = useDimensions();
    const [maxPrice, setMaxPrice] = useState<string | number>("100");
    const [selectedCategory, setSelectedCategory] = useState<string>(null);
    const [selectedSize, setSelectedSize] = useState<string>(null);
    const [selectedCondition, setSelectedCondition] = useState<string>(null);
    const conditions = ["new", "used"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const [keyword, setKeyword] = useState("");
    const discountCheckboxRef = useRef(null);
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
    const searchSubmitHandler = (e: any) => {
        e.preventDefault();
        if (keyword != "") dispatch(addToRecents(keyword));
        dispatch(
            setFetchingProps({
                page: currentPage,
                params: {
                    keyword,
                    maxPrice,
                    category: selectedCategory,
                    size: selectedSize,
                    condition: selectedCondition,
                },
            })
        );
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
    return (
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
                                else setSelectedCategory(e.target.value);
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
                                categoriesData.map((category, id) => (
                                    <option key={id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className="category_filter">
                        <h5>Choose Size</h5>
                        <select
                            onChange={(e) => {
                                if (e.target.value == "any")
                                    setSelectedSize("");
                                else setSelectedSize(e.target.value);
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
                                else setSelectedCondition(e.target.value);
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
                            onChange={(e) => setMaxPrice(e.target.value)}
                        ></input>
                        <h6>0-{maxPrice}kn</h6>
                    </div>
                    Discount Only:
                    <input type="checkbox" ref={discountCheckboxRef} />
                    <div className="keyword_filter">
                        <h5>Filter Results By Name</h5>
                        <input
                            type="text"
                            placeholder="Enter product name..."
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <br />
                    <button type="submit" onClick={searchSubmitHandler}>
                        Submit
                    </button>
                </>
            )}
        </div>
    );
};
