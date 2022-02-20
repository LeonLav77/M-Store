import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiMinimize2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDimensions } from "../hooks/useDimensions";
import { RootState } from "../slices/dataSlice";

export const RecentSearches = () => {
    const [showRecents, setShowRecents] = useState(false);
    const dimensions = useDimensions();
    const recentSearches = useSelector(
        (state: RootState) => state.productsData.recents
    );
    return (
        <div className="recent_searches">
            {dimensions.screenWidth <= 1400 && !showRecents ? (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    onClick={() => {
                        setShowRecents(true);
                    }}
                >
                    <h3 style={{ margin: 0 }}>Recents</h3>
                    <FaChevronDown
                        size={20}
                        style={{
                            marginRight: 5,
                        }}
                    />
                </div>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h3>Recents</h3>
                        <FiMinimize2
                            style={{
                                marginRight: 10,
                                marginTop: 5,
                            }}
                            size={25}
                            onClick={() => {
                                setShowRecents(false);
                            }}
                        />
                    </div>
                    <div>
                        {recentSearches.length == 0 ? (
                            <h4>No Recent Searches...</h4>
                        ) : (
                            recentSearches.map((recentSearch, id) => (
                                <h4 key={id}>{recentSearch}</h4>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
