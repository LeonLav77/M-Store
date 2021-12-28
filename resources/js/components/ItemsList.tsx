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
                                    width: "250px",
                                    height: "150px",
                                    backgroundColor: "grey",
                                }}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
