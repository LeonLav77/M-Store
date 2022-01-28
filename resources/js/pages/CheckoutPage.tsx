import React, { useEffect, useRef, useState } from "react";
import { StripePage } from "../components/auth/StripePage";
import { ReactCountryDropdown } from "react-country-dropdown";
import ReactPhoneInput from "react-phone-input-2";
import { Cart } from "../components/Cart";
import flags from "react-phone-number-input/flags";
import "../../css/CheckoutPage.css";

export const CheckoutPage = () => {
    const [value, setValue] = useState("");
    const handleSelect = (country) => {
        console.log(country);
        /* returns the details on selected country as an object
            {
              name: "United States of America", 
              code: "US", 
              capital: "Washington, D.C.", 
              region: "Americas", 
              latlng: [38, -97]
            }
        */
    };
    return (
        <div>
            <Cart />
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
                        Estimated delivery: Feb 18 – Mar 18Est. delivery: Feb 18
                        – Mar 18 Economy Shipping from outside US US $4.10
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
            <h2
                style={{
                    marginLeft: 40,
                    backgroundColor: "rgb(212, 212, 212, 0.3)",
                    padding: 10,
                    width: 1000,
                }}
            >
                Ship To
            </h2>
            <div className="user_info_form">
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                    }}
                >
                    <div style={{ width: "50%" }}>
                        <h5>First Name</h5>
                        <input type="text" placeholder="First Name" />
                    </div>
                    <div style={{ width: "50%" }}>
                        <h5>Last Name</h5>
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <div style={{ width: "50%" }}>
                        <h5>Email</h5>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div style={{ width: "50%" }}>
                        <h5>Confirm Email</h5>
                        <input type="email" placeholder="Confirm Email" />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <div style={{ width: "33.3%" }}>
                        <h5>Street</h5>
                        <input type="street" placeholder="Street" />
                    </div>
                    <div style={{ width: "33.3%" }}>
                        <h5>City</h5>
                        <input type="city" placeholder="City" />
                    </div>
                    <div style={{ width: "33.3%" }}>
                        <h5>Zip</h5>
                        <input type="zip" placeholder="Zip" />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <div style={{ width: "33.3%" }}>
                        <h5>State</h5>
                        <input type="state" placeholder="State" />
                    </div>
                    <div style={{ width: "33.3%" }}>
                        <h5>County</h5>
                        <input type="county" placeholder="County" />
                    </div>
                    <div style={{ width: "33.3%" }}>
                        <h5>Country</h5>
                        <input type="country" placeholder="Country" />
                    </div>
                </div>
            </div>
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
            {/* <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    onChange={(e: string) => setValue(e)}
                    width={150}
                    height={150}
                    flags={flags}
                /> */}
            <StripePage />
        </div>
    );
};
