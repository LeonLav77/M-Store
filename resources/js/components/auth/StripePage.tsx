import React from "react";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { StripeChild } from "./StripeChild";
const stripePromise = loadStripe('pk_test_51Jw50WDB0ZXzzlRgrPMcKbe72z3tlRuuOCikk9pfHRennyyvIh8ztZEOtG8shUKaxWbuU4Bfc5FPipBAy8ZYAh9P007llCXJzS');

export const StripePage = () => {

    return (
        <div>
            <Elements stripe={stripePromise}>
                <StripeChild />
            </Elements>
        </div>
    );
};
