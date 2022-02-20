import { useState, useEffect } from "react";

export const useDimensions = () => {
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
    return {
        screenWidth: screenDimensions.screenWidth,
        screenHeight: screenDimensions.screenHeight,
    };
};
