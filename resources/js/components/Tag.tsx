import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/components/Tag.css";

export const Tag = React.memo(
    ({ title, navigateTo }: { title: string; navigateTo: string }) => {
        const navigate = useNavigate();
        return (
            <div
                className="tag_container"
                onClick={() => navigate(`/${navigateTo}`)}
            >
                <h5 style={{ margin: 0, letterSpacing: 1 }}>{title}</h5>
            </div>
        );
    }
);
