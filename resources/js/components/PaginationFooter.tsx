import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDimensions } from "../hooks/useDimensions";
import {
    setCurrentPage,
    setFetchingProps,
    toggleListStyle,
} from "../slices/dataSlice";
import { BsGrid1X2Fill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const PaginationFooter = ({
    nextPage,
    prevPage,
    lastPage,
    firstPage,
    currentPage,
}) => {
    const dispatch = useDispatch();
    const listStyle = useSelector((state: any) => state.productsData.listStyle);
    const dimensions = useDimensions();
    const keyword = useSelector((state: any) => state.productsData.searchWord);
    useEffect(() => {}, [keyword]);
    //BsGrid1X2Fill GiHamburgerMenu
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
                    paddingInline: dimensions.screenWidth >= 650 ? 20 : 0,
                    minWidth: dimensions.screenWidth < 500 ? 80 : 130,
                    height: 50,
                    backgroundColor: "#eeefef",
                    borderRadius: 10,
                    fontSize: dimensions.screenWidth >= 650 ? 32 : 20,
                    display: "grid",
                    placeItems: "center",
                    // boxShadow: "3px 3px 6px rgb(0, 0, 0, .5)",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                }}
                onClick={() =>
                    dispatch(
                        setFetchingProps({
                            page: firstPage.split("?")[1].split("=")[1],
                            params: { keyword },
                        })
                    )
                }
            >
                {dimensions.screenWidth < 500 ? (
                    <p style={{ margin: 0, fontSize: 20 }}>First</p>
                ) : (
                    <p style={{ margin: 0, fontSize: 20 }}>First Page</p>
                )}
            </div>
            <div
                style={
                    dimensions.screenWidth >= 650
                        ? { display: "flex", gap: 25 }
                        : { display: "flex", gap: 10 }
                }
            >
                {/* <FaArrowLeft size={20} /> */}
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
                    onClick={() => {
                        if (prevPage == null) return console.log("no more");
                        else
                            dispatch(
                                setFetchingProps({
                                    page: prevPage.split("?")[1].split("=")[1],
                                    params: { keyword },
                                })
                            );
                    }}
                >
                    <p style={{ margin: 0, fontSize: 20 }}>{currentPage - 1}</p>
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
                    <p style={{ margin: 0, fontSize: 20 }}>{currentPage}</p>
                </div>
                <div
                    style={
                        nextPage == null
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
                    onClick={() => {
                        if (nextPage == null) return console.log("no more");
                        else
                            dispatch(
                                setFetchingProps({
                                    page: nextPage.split("?")[1].split("=")[1],
                                    params: { keyword },
                                })
                            );
                    }}
                >
                    <p style={{ margin: 0, fontSize: 20 }}>{currentPage + 1}</p>
                </div>
                {/* <FaArrowRight size={20} /> */}
            </div>
            <div
                style={{
                    height: 50,
                    backgroundColor: "#eeefef",
                    borderRadius: 10,
                    fontSize: dimensions.screenWidth >= 650 ? 32 : 20,
                    display: "grid",
                    placeItems: "center",
                    paddingInline: dimensions.screenWidth >= 650 ? 20 : 0,
                    // boxShadow: "3px 3px 6px rgb(0, 0, 0, .5)",
                    minWidth: dimensions.screenWidth < 500 ? 80 : 130,
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                }}
                onClick={() =>
                    dispatch(
                        setFetchingProps({
                            page: lastPage,
                            params: { keyword },
                        })
                    )
                }
            >
                {dimensions.screenWidth < 500 ? (
                    <p style={{ margin: 0, fontSize: 20 }}>Last</p>
                ) : (
                    <p style={{ margin: 0, fontSize: 20 }}>Last Page</p>
                )}
            </div>
            <div
                style={{
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    borderRadius: 10,
                    padding: 10,
                }}
            >
                {listStyle == "block" ? (
                    <BsGrid1X2Fill
                        size={30}
                        onClick={() => dispatch(toggleListStyle("flex"))}
                    />
                ) : (
                    <GiHamburgerMenu
                        size={30}
                        onClick={() => dispatch(toggleListStyle("block"))}
                    />
                )}
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
