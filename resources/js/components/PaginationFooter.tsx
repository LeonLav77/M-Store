import React, { useState, useEffect } from "react";

export const PaginationFooter = ({
    nextPage,
    prevPage,
    lastPage,
    firstPage,
    currentPage,
}) => {
    return (
        <div
            style={{
                display: "flex",
                gap: 10,
                justifyContent: "space-around",
                alignItems: "center",
                marginInline: 25,
                marginBlock: 20,
            }}
        >
            <div
                style={{
                    paddingInline: 20,
                    height: 50,
                    backgroundColor: "#eeefef",
                    borderRadius: 10,
                    fontSize: 32,
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "3px 3px 6px rgb(0, 0, 0, .5)",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                }}
            >
                First Page
            </div>
            <div style={{ display: "flex", gap: 25 }}>
                <div
                    style={
                        prevPage == null
                            ? { display: "none" }
                            : {
                                  width: 50,
                                  height: 50,
                                  backgroundColor: "#eeefef",
                                  borderRadius: 10,
                                  fontSize: 32,
                                  display: "grid",
                                  placeItems: "center",
                                  boxShadow: "3px 3px 6px rgb(0, 0, 0, .5)",
                                  border: "1px solid rgba(0, 0, 0, 0.5)",
                              }
                    }
                >
                    {currentPage - 1}
                </div>
                <div
                    style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#333",
                        color: "white",
                        borderRadius: 10,
                        fontSize: 32,
                        display: "grid",
                        placeItems: "center",
                        boxShadow: "3px 3px 6px rgb(0, 0, 0, .5)",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                    }}
                >
                    {currentPage}
                </div>
                <div
                    style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#eeefef",
                        borderRadius: 10,
                        fontSize: 32,
                        display: "grid",
                        placeItems: "center",
                        boxShadow: "3px 3px 6px rgb(0, 0, 0, .5)",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                    }}
                >
                    {currentPage + 1}
                </div>
            </div>
            <div
                style={{
                    height: 50,
                    backgroundColor: "#eeefef",
                    borderRadius: 10,
                    fontSize: 32,
                    display: "grid",
                    margin: 10,
                    placeItems: "center",
                    paddingInline: 20,
                    boxShadow: "3px 3px 6px rgb(0, 0, 0, .5)",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                }}
            >
                Last Page
            </div>
        </div>
    );
};

// export const PaginationFooter = ({ currentPage, lastPage }) => {
//     const [showWithIds, setShowWithIds] = useState<any>([]);
//     const [currentId, setCurrentId] = useState(currentPage);
//     const calculatePages = (currPage, lastPage) => {
//         let firstPage = 1;
//         for (let i = firstPage; i < lastPage; i++) {
//             if (
//                 (currPage == firstPage || currPage - 1 == firstPage) &&
//                 i == firstPage
//             ) {
//                 console.log([i, i + 1, i + 2]);
//                 return setShowWithIds([i, i + 1, i + 2]);
//             } else if (
//                 (currPage == lastPage || currPage + 1 == lastPage) &&
//                 i == lastPage
//             ) {
//                 console.log([i, i - 1, i - 2]);
//                 return setShowWithIds([i, i - 1, i - 2]);
//             } else if (currPage == i) {
//                 console.log([i - 1, i, i + 1]);
//                 return setShowWithIds([i - 1, i, i + 1]);
//             }
//         }
//     };
//     useEffect(() => {
//         calculatePages(currentId, lastPage);
//     }, [currentId]);
//     return (
//         <div style={{ display: "flex" }}>
//             <button
//                 onClick={() =>
//                     currentId > 1 ? setCurrentId(currentId - 1) : null
//                 }
//             >
//                 back
//             </button>
//             <h5>first page</h5>
//             {showWithIds.map((num, id) => {
//                 return (
//                     <h1
//                         key={id}
//                         style={
//                             (currentId == 1 && id == 0) ||
//                             (lastPage == currentId && id == 2) ||
//                             (id == 1 && currentId != 1 && currentId != lastPage)
//                                 ? { backgroundColor: "red", width: 50 }
//                                 : { backgroundColor: "blue", width: 50 }
//                         }
//                     >
//                         {num}
//                     </h1>
//                 );
//             })}
//             <h5>last page</h5>
//             <button
//                 onClick={() =>
//                     currentId != lastPage ? setCurrentId(currentId + 1) : null
//                 }
//             >
//                 next
//             </button>
//         </div>
//     );
// };
