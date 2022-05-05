import React, { useState } from "react";
// import { AiFillStar } from "react-icons/ai";
import "../../css/ProductsPage.css";
import { ProductDataInterface } from "../pages/ProductsPage";
import { Link } from "react-router-dom";

export const ProductItem = React.memo(
    ({
        item,
        listStyle,
    }: {
        item: ProductDataInterface;
        listStyle: string;
    }) => {
        // const [favorite, setFavorite] = useState(false);
        return (
            <div
                key={item.id}
                className={
                    listStyle == "block"
                        ? "product_item_container"
                        : "product_item_container_2"
                }
            >
                <div
                    style={
                        listStyle == "block"
                            ? {
                                  position: "absolute",
                                  top: "7%",
                                  right: "1.5%",
                                  zIndex: 50,
                              }
                            : {
                                  display: "none",
                                  //   position:
                                  //       "absolute",
                                  //   top: "2%",
                                  //   right: "1.5%",
                                  //   zIndex: 50,
                              }
                    }
                >
                    {/* <AiFillStar
                    color={favorite ? "yellow" : "black"}
                    size={35}
                    onClick={() => {
                        setFavorite(!favorite);
                        //add to wishlist i remove
                    }}
                /> */}
                </div>
                <img
                    src={item.images[0].path}
                    alt=""
                    className={
                        listStyle == "block"
                            ? "product_item_image"
                            : "product_item_image_2"
                    }
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
                        {item.discount?.discount && (
                            <h5 className="on_sale_header">SALE</h5>
                        )}
                    </div>
                    <p
                        style={
                            listStyle == "block"
                                ? {
                                      width: "95%",
                                      display: "-webkit-box",
                                      WebkitBoxOrient: "vertical",
                                      WebkitLineClamp: 3,
                                      overflow: "hidden",
                                  }
                                : {
                                      width: "85%",
                                  }
                        }
                    >
                        {item.description}
                    </p>
                    <h3>
                        {item.discount?.discount
                            ? "Discount: "
                            : "Current Price: "}
                        {item.current_price.toFixed(2)}
                        Kn
                    </h3>
                </div>
            </div>
        );
    }
);
