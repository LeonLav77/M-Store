import React from "react";

export const CategoriesList = ({ data }) => {
    return (
        <>
            <div className="related_categories_items">
                {data.map((item, id) => {
                    return (
                        <div
                            key={id}
                            style={{
                                margin: 10,
                                width: "175px",
                                height: "150px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={item.images && item.images[0].path}
                                alt=""
                                height={100}
                                width={100}
                                style={{
                                    backgroundColor: "lightgray",
                                    margin: "2%",
                                    borderRadius: "50%",
                                }}
                            />
                            <h4 style={{ margin: 0, marginTop: 10 }}>
                                {item.name}
                            </h4>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
