import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../css/CheckoutPage.css";
import { StripePage } from "../components/auth/StripePage";
// import { Cart } from "../components/Cart";
import { CartSummary } from "../components/CartSummary";
import { CheckoutCart } from "../components/CheckoutCart";
import { CheckoutForm } from "../components/CheckoutForm";
import { Navbar } from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { setLastDomainPath } from "../slices/dataSlice";

export const CheckoutPage = () => {
    // const handleSelect = (country) => {
    //     console.log(country);
    //     /* returns the details on selected country as an object
    //         {
    //           name: "United States of America",
    //           code: "US",
    //           capital: "Washington, D.C.",
    //           region: "Americas",
    //           latlng: [38, -97]
    //         }
    //     */
    // };
    const { user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate("/login");
        dispatch(setLastDomainPath("checkout"));
    }, []);
    return (
        <div style={{ backgroundColor: "whitesmoke" }}>
            {/* <Cart /> */}
            <Navbar />
            <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: "60%" }}>
                    <CheckoutCart />
                </div>

                <div
                    style={{
                        width: "40%",
                        backgroundColor: "rgb(240,240, 240)",
                        border: "2px solid #dedede",
                        marginBlock: 10,
                        marginRight: 40,
                    }}
                >
                    <h3
                        style={{
                            backgroundColor: "rgb(212, 212, 212, 0.3)",
                            padding: 10,
                        }}
                    >
                        Subtotal
                    </h3>
                    <CartSummary />
                    <div className="delivery_options">
                        <h3>Delivery Options</h3>
                        <div style={{ display: "flex" }}>
                            <input
                                type="radio"
                                id="html"
                                name="fav_language"
                                value="HTML"
                            />
                            <h5>
                                Estimated delivery: Feb 18 – Mar 18Est.
                                delivery: Feb 18 – Mar 18 Economy Shipping from
                                outside US US $4.10
                            </h5>
                        </div>
                        <div style={{ display: "flex" }}>
                            <input
                                type="radio"
                                id="css"
                                name="fav_language"
                                value="CSS"
                            />
                            <h5>UPS 2nd Day Air US $24.00</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: 1000,
                    backgroundColor: "#f0f0f0",
                    marginLeft: 40,
                    border: "2px solid #dedede",
                }}
            >
                <h3
                    style={{
                        backgroundColor: "rgb(212, 212, 212, 0.3)",
                        marginBottom: 0,
                        padding: 10,
                    }}
                >
                    Ship To
                </h3>
                <CheckoutForm />
            </div>
            <br />
            {/* <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    onChange={(e: string) => setValue(e)}
                    width={150}
                    height={150}
                    flags={flags}
                /> */}
        </div>
    );
};
