import React, { useState, useEffect } from "react";
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import axios from "axios";
import $ from "jquery";


export const StripeChild = () => {
    const [Total, setTotal] = useState({});
    const [Intent, setIntent] = useState<string|any>({});
    const [Order, setOrder] = useState({});
    const [User, setUser] = useState({});

    useEffect(() => {
        getOrderData();
    }, []);
    const getOrderData = async () => {
        const response = await axios.post('/api/orderData');
        setIntent(response.data.clientSecret);
        setTotal(response.data.order.price);
        setOrder(response.data.order);
        setUser(response.data.user);
        };

    const elements = useElements();
    const stripe = useStripe();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(Total);
        console.log(Intent);
        console.log(User);
        if(!stripe || !elements) {
            return;
        }
        stripe.confirmCardSetup(Intent, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: User['name'],
                },
            },
        }).then(result => {
            console.log(result);
            if(result.error) {
                console.log(result.error);
            } else {
                console.log(result.setupIntent);
                $('#payment-method').val(result.setupIntent.payment_method);
                console.log(Order);
                $('#payment-form').submit();
            }
        });
    };
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card Details</h5>
                                <div className="card-text">
                                    <form id="payment-form" onSubmit={handleSubmit} action="/api/pay" method="POST">
                                            <CardElement id="card" />
                                            <input type="hidden" id="payment-method" name="payment-method" value="" />
                                            <button className="btn btn-primary">Pay</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
