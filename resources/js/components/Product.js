import React from "react";
import { useParams } from "react-router";

export const Product = () => {
    const params = useParams();
    return <h1>{params.productId}</h1>;
};
