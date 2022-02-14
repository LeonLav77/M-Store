import React from "react";
import { useFetchCartQuery } from "../slices/rtkQuerySlice";

export const CheckoutCart = () => {
    const cartData = useFetchCartQuery(0);
    const {
        data,
        isLoading,
        error,
    }: { data?: any[]; isLoading?: any; error?: any } = cartData;
    return (
        <div
            style={{
                border: "2px solid #dedede",
                marginLeft: 40,
                marginBlock: 10,
                backgroundColor: "rgb(240, 240, 240)",
            }}
        >
            <h3
                style={{
                    backgroundColor: "rgb(212, 212, 212, 0.3)",
                    padding: 10,
                }}
            >
                Your Cart
            </h3>
            <div
                style={{
                    backgroundColor: "#ebebeb",
                    padding: "10px 5px",
                    border: "2px solid #dedede",
                    margin: "15px 10px",
                }}
            >
                {isLoading
                    ? "Loading..."
                    : error
                    ? "Error..."
                    : data.map((item, id) => {
                          return (
                              <div
                                  key={id}
                                  style={{ display: "flex", margin: 10 }}
                              >
                                  <img
                                      src={item.product.images[0].path}
                                      alt=""
                                      height={150}
                                      width={150}
                                  />
                                  <div style={{ marginInline: 10 }}>
                                      <h2 style={{ marginBottom: 10 }}>
                                          {item.product.name}
                                      </h2>
                                      <h5 style={{ marginBottom: 10 }}>
                                          Quantity: {item.quantity}
                                      </h5>
                                      <h5 style={{ fontSize: 24 }}>
                                          Price:{" "}
                                          {item.product.price + " Kn" ?? "Null"}
                                      </h5>
                                  </div>
                              </div>
                          );
                      })}
            </div>
        </div>
    );
};
