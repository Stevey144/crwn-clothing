import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import './payment-form.styles.scss';
import axios from "axios"
import { useState } from 'react';

const  PaymentForm = () => {
    const {success, setSuccess} = useState(false)

    const stripe = useStripe();
    const elements =  useElements();

    const paymentHandler = async (e) => {

     e.preventDefault();

     if(!stripe || !elements){
        return;
     }
     const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
     })

    if(!error){
        try{

            const {id} = paymentMethod
            const response = await axios.post("/.netlify/functions/create-payment-intent", {
                amount: 1000,
                id
                })

                if(response.data.success){
                    console.log("successful payment");
                    setSuccess(true);

                }
                }
                catch(error){
                    console.log(error)

                }

    }
    else{
        console.log(error.message);
    }
    }
    
    return (
        <div className='paydiv'>
            <form onSubmit={paymentHandler}>
                <div className='payForm'>
                    <h2>Credit Card Payment</h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
                </div>
            </form>
        </div>
    )

}

export default PaymentForm;

