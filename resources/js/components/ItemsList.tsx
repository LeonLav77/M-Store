import React, { useEffect } from "react";

export const ItemsList = ({ data, title }) => {
    return (
        <>
            <h1>{title}</h1>
            <div className="related_categories">
                <div className="related_categories_items">
                    {data.map((item, id) => {
                        return (
                            <div
                                key={id}
                                style={{
                                    margin: 10,
                                    width: "350px",
                                    height: "150px",
                                    backgroundColor: "grey",
                                    display: "flex",
                                }}
                            >
                                <img
                                    src={item.images && item.images[0].path}
                                    alt=""
                                    height={"90%"}
                                    width={150}
                                    style={{ margin: "2%" }}
                                />
                                <div style={{ marginBlock: "auto" }}>
                                    <h1>{item.name}</h1>
                                    {item.current_price && (
                                        <h3>
                                            {item.current_price.toFixed(2)} Kn
                                        </h3>
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
