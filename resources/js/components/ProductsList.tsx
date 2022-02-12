import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductItem } from "./ProductItem";

export const ProductsList = ({ data }) => {
    const listStyle = useSelector((state: any) => state.productsData.listStyle);
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {data.map((item, id) => {
                return (
                    <ProductItem key={id} item={item} listStyle={listStyle} />
                );
            })}
        </div>
    );
};
