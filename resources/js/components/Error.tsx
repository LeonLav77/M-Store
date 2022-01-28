import React from "react";

export const Error = ({ showError }: { showError: boolean }) => {
    return (
        <>
            {showError && (
                <h3 style={{ marginInline: "auto" }}>
                    Something went wrong! Try again later...
                </h3>
            )}
        </>
    );
};
