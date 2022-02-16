import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiMinimize2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../css/ProductsPage.css";
import { checkUser } from "../components/auth/Login";
import { Navbar } from "../components/Navbar";
import { PaginationFooter } from "../components/PaginationFooter";
import { ProductFilters } from "../components/ProductFilters";
import { ProductsList } from "../components/ProductsList";
import useAuth from "../hooks/useAuth";
import { useDimensions } from "../hooks/useDimensions";
import { setLastDomainPath } from "../slices/dataSlice";
import { useFetchProductsQuery } from "../slices/rtkQuerySlice";

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
    message?: string;
}

export const ProductsPage = () => {
    const dispatch = useDispatch();
    const toggleStyle = useSelector(
        (state: any) => state.productsData.toggleStyle
    );
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

    //dropdowns
    const [showRecents, setShowRecents] = useState(false);

    //listStyle
    const listStyle = useSelector((state: any) => state.productsData.listStyle);

    useEffect(() => {
        console.log(checkIfUser);
        if (!user) navigate("/login");
        dispatch(setLastDomainPath("products"));
    }, []);
    useEffect(() => {}, [productsData]);

    return (
        <>
            <Navbar />
            <div
                className={`main_all_products_container ${
                    toggleStyle ? "productsStyleToggled" : ""
                }`}
            >
                <div style={{ minWidth: 300, width: 350 }}>
                    <ProductFilters />
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
                        <h3 style={{ margin: 50 }}>Loading...</h3>
                    ) : productsError ? (
                        <h3 style={{ margin: 50 }}>Error...</h3>
                    ) : productsData.message ? (
                        <h3 style={{ margin: 50 }}>{productsData.message}</h3>
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
