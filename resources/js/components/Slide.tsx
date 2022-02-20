import React from "react";

export const Slide = ({ slideWidth }: { slideWidth: number }) => {
    return (
        <div
            style={{
                width: slideWidth < 800 ? 700 : slideWidth,
            }}
            // className="slide"
        >
            <div
                style={{
                    width: "100%",
                    height: 500,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    zIndex: -1,
                }}
            ></div>
            <div className="slider_info">
                <img
                    src={require("../../images/login_bg1.jpg").default}
                    alt=""
                    width={350}
                    height={500}
                />
                <div
                    style={{
                        width: "30%",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                    }}
                >
                    <h1
                        style={{
                            fontSize: 40,
                            fontWeight: "bold",
                        }}
                    >
                        Footwerar
                    </h1>
                    <h3>veri kull</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nemo veritatis enim laboriosam soluta ratione nostrum,
                        assumenda doloribus ea facere porro!
                    </p>
                </div>
            </div>
        </div>
    );
};
