import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const toggleStyle = useSelector(
        (state: any) => state.productsData.toggleStyle
    );
    useEffect(() => {
        if (!user) navigate("/login");
        dispatch(setLastDomainPath("checkout"));
    }, []);
    return (
        <div
            className={`checkout_main_container ${
                toggleStyle ? "styleToggled" : ""
            }`}
        >
            {/* <Cart /> */}
            <Navbar />
            <div className="checkout_cart_info_container">
                <div className="checkout_cart">
                    <CheckoutCart />
                </div>

                <div className="order_summary_container">
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
            <div className="checkout_user_form_container">
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
