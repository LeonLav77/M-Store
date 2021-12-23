import React, { useState, useEffect } from "react";
import { ImCog } from "react-icons/im";
import { Button } from "./Button";
import "../../css/components/Navbar.css";

export const Navbar = () => {
    const getScreenDimensions = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        return { screenHeight, screenWidth };
    };
    const [screenDimensions, setScreenDimensions] = useState(
        getScreenDimensions()
    );
    useEffect(() => {
        function handleResize() {
            setScreenDimensions(getScreenDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [screenDimensions]);
    return (
        <div className="navbar_container">
            {screenDimensions.screenWidth >= 1250 ? (
                <img
                    src="https://thumbs.dreamstime.com/b/online-shop-logo-ecommerce-design-vector-187896714.jpg"
                    alt="store_logo"
                    width={200}
                    height={200}
                />
            ) : null}
            <div className="search_bar">
                <input placeholder="Search for products..."></input>
                <Button
                    title="Submit"
                    type="submit"
                    onClick={() => {}}
                    style={{
                        padding: 10,
                        width: 100,
                        height: 50,
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                        borderLeft: 0,
                    }}
                />
                {/* <button type="submit">Submit</button> */}
            </div>
            {/* tu je size a ne widht i heihgt */}
            {screenDimensions.screenWidth >= 600 ? <ImCog size={25} /> : null}
        </div>
    );
};
