import React, { useState } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "../../css/components/CheckoutForm.css";
import { StripePage } from "./auth/StripePage";

export const CheckoutForm = () => {
    const [value, setValue] = useState("");
    return (
        <div className="user_info_form">
            <div className="checkout_form_container_wrapper">
                <h4 style={{ margin: 8 }}>Personal Info</h4>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent: "space-around",
                        minWidth: 300,
                    }}
                >
                    <div className="checkout_form_container">
                        <h5>First Name</h5>
                        <input type="text" placeholder="First Name" />
                    </div>
                    <div className="checkout_form_container">
                        <h5>Last Name</h5>
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <div className="checkout_form_container">
                        <h5>Email</h5>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="checkout_form_container">
                        <h5>Confirm Email</h5>
                        <input type="email" placeholder="Confirm Email" />
                    </div>
                </div>
            </div>
            <div className="checkout_form_container_wrapper">
                <h4 style={{ margin: 8 }}>Adress</h4>
                <div className="address_form_info">
                    <div
                        style={{
                            width: "32%",
                            marginBlock: 10,
                            marginInline: 5,
                        }}
                    >
                        <h5>Street</h5>
                        <input type="street" placeholder="Street" />
                    </div>
                    <div
                        style={{
                            width: "32%",
                            marginBlock: 10,
                            marginInline: 5,
                        }}
                    >
                        <h5>City</h5>
                        <input type="city" placeholder="City" />
                    </div>
                    <div
                        style={{
                            width: "32%",
                            marginBlock: 10,
                            marginInline: 5,
                        }}
                    >
                        <h5>Zip</h5>
                        <input type="zip" placeholder="Zip" />
                    </div>
                </div>
                <div className="address_form_info">
                    <div
                        style={{
                            width: "32%",
                            marginBlock: 10,
                            marginInline: 5,
                        }}
                    >
                        <h5>State</h5>
                        <input type="state" placeholder="State" />
                    </div>
                    <div
                        style={{
                            width: "32%",
                            marginBlock: 10,
                            marginInline: 5,
                        }}
                    >
                        <h5>County</h5>
                        <input type="county" placeholder="County" />
                    </div>
                    <div
                        style={{
                            width: "32%",
                            marginBlock: 10,
                            marginInline: 5,
                        }}
                    >
                        <h5>Country</h5>
                        <input type="country" placeholder="Country" />
                    </div>
                </div>
            </div>
            <div className="checkout_form_container_wrapper">
                <h4 style={{ margin: 8 }}>Phone Number</h4>
                <div style={{ margin: 10 }}>
                    <ReactPhoneInput
                        inputExtraProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                        }}
                        defaultCountry={"hr"}
                        value={value}
                        onChange={(e) => setValue(e)}
                        regions={"europe"}
                    />
                </div>
            </div>
            <div className="checkout_form_container_wrapper">
                <h4 style={{ margin: 8 }}>Card Details</h4>
                <div style={{ margin: 10 }}>
                    <StripePage />
                </div>
            </div>
        </div>
    );
};
