import React from "react";
import { Slide } from "./Slide";

interface SliderProps {
    sliderRef: React.MutableRefObject<HTMLDivElement | null>;
    currentIndex: number;
    slideWidth: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const Slider = ({
    sliderRef,
    currentIndex,
    setCurrentIndex,
    slideWidth,
}: SliderProps) => {
    return (
        <div>
            <div className="slider_container">
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 700,
                        boxShadow: "inset 0 0 10px 1px rgba(0, 0, 0, 0.7)",
                        background: "transparent",
                        borderRadius: 15,
                    }}
                ></div>
                <div
                    style={{
                        width: slideWidth + 70,
                        overflow: "hidden",
                        height: 650,
                    }}
                >
                    <div
                        style={{
                            maxWidth: "fit-content",
                            width: slideWidth * 3.5,
                            height: "95%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                height: "100%",
                                transition: "transform 2s",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                zIndex: -10,
                                minWidth: 700,
                            }}
                            ref={sliderRef}
                        >
                            {Array(3)
                                .fill("")
                                .map((_, i: number) => {
                                    return (
                                        <Slide
                                            slideWidth={slideWidth}
                                            key={i}
                                        />
                                    );
                                })}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                maxWidth:
                                    slideWidth + slideWidth * 0.179 >= 1500
                                        ? slideWidth * 0.75
                                        : slideWidth,
                            }}
                        >
                            {Array(3)
                                .fill("")
                                .map((_, id: number) => (
                                    <div
                                        style={
                                            currentIndex - 1 == id
                                                ? {
                                                      backgroundColor: "gray",
                                                      width: 15,
                                                      height: 15,
                                                      borderRadius: "50%",
                                                      margin: 10,
                                                      position: "relative",
                                                      zIndex: 10,
                                                  }
                                                : {
                                                      backgroundColor:
                                                          "lightgray",
                                                      width: 15,
                                                      height: 15,
                                                      borderRadius: "50%",
                                                      margin: 10,
                                                      position: "relative",
                                                      zIndex: 10,
                                                  }
                                        }
                                        key={id}
                                        onClick={() => {
                                            setCurrentIndex(id + 1);
                                            sliderRef.current!.style.transform = `translateX(-${
                                                id * slideWidth
                                            }px)`;
                                        }}
                                    ></div>
                                ))}
                        </div>
                    </div>
                    <button
                        className={currentIndex == 1 ? "smol_id" : "prev_btn"}
                        onClick={() => {
                            if (currentIndex <= 1) return;
                            setCurrentIndex(currentIndex - 1);
                            sliderRef.current!.style.transform = `translateX(-${
                                (currentIndex - 2) * slideWidth
                            }px)`;
                        }}
                    >
                        <h1>&lt;</h1>
                    </button>
                    <button
                        className={currentIndex == 3 ? "big_id" : "next_btn"}
                        onClick={() => {
                            if (currentIndex >= 3) return;
                            setCurrentIndex(currentIndex + 1);
                            sliderRef.current!.style.transform = `translateX(-${
                                currentIndex * slideWidth
                            }px)`;
                        }}
                    >
                        <h1>&gt;</h1>
                    </button>
                </div>
            </div>
        </div>
    );
};
