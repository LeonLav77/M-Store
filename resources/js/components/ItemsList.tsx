import React, { useEffect } from "react";

export const ItemsList = ({ data, title, dataType }) => {
    return (
        <>
            <h2 style={{ margin: 10, color: "#ebebeb" }}>{title}</h2>
            <div className="related_categories">
                <div className="related_categories_items">
                    {data.map((item, id) => {
                        return (
                            <div
                                key={id}
                                style={
                                    dataType == "categories"
                                        ? {
                                              margin: 10,
                                              width: "300px",
                                              height: "150px",
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "flex-start",
                                              justifyContent: "flex-end",
                                              position: "relative",
                                              // background: `url(${item.images[0].path})`,
                                          }
                                        : {
                                              margin: 10,
                                              width: "350px",
                                              height: "150px",
                                              border: "2px solid #d3d3d3",
                                              display: "flex",
                                              padding: "20px",
                                              minWidth: "370px",
                                              flexWrap: "wrap",
                                              flexDirection: "column",
                                              borderRadius: 15,
                                              backgroundColor: "#ebebeb",
                                              // background: `url(${item.images[0].path})`,
                                          }
                                }
                            >
                                <img
                                    src={item.images && item.images[0].path}
                                    alt=""
                                    height={"100%"}
                                    width={
                                        dataType == "categories"
                                            ? "100%"
                                            : "50%"
                                    }
                                    style={
                                        dataType == "categories"
                                            ? {
                                                  margin: "2%",
                                                  position: "absolute",
                                                  top: 0,
                                                  left: 0,
                                                  backgroundColor: "lightgray",
                                              }
                                            : null
                                    }
                                />
                                <div
                                    style={
                                        dataType == "categories"
                                            ? {
                                                  marginBlock: "auto",
                                                  position: "relative",
                                                  zIndex: 10,
                                                  marginLeft: 20,
                                                  marginBottom: 5,
                                              }
                                            : null
                                    }
                                >
                                    {dataType == "categories" ? (
                                        <h3>{item.name}</h3>
                                    ) : (
                                        <>
                                            <h4 style={{ margin: 5 }}>
                                                {item.name}
                                            </h4>
                                            {item.current_price && (
                                                <h5 style={{ margin: 5 }}>
                                                    Price:{" "}
                                                    {item.current_price.toFixed(
                                                        2
                                                    )}{" "}
                                                    Kn
                                                </h5>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
