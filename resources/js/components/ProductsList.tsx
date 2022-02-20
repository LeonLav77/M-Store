import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../slices/dataSlice";
import { ProductItem } from "./ProductItem";
import { ProductDataInterface } from "../pages/ProductsPage";

export const ProductsList = ({
    data = [],
}: {
    data: ProductDataInterface[] | undefined;
}) => {
    const listStyle = useSelector(
        (state: RootState) => state.productsData.listStyle
    );
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {data?.map((item, id) => {
                return (
                    <ProductItem key={id} item={item} listStyle={listStyle} />
                );
            })}
        </div>
    );
};
