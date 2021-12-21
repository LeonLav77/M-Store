import React from "react";
import { motion } from "framer-motion";

export const TestingUi = () => {
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };
    return (
        <div style={{ width: 200, height: 200 }}>
            <motion.div
                animate={{
                    x: 0,
                    backgroundColor: "#000",
                    boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
                    position: "fixed",
                    transitionEnd: {
                        display: "none",
                    },
                }}
            />
        </div>
    );
};
