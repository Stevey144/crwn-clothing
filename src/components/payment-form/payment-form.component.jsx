import { useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import './payment-form.styles.scss';

const  PaymentForm = () => {
    const stripe = useStripe();
    const elements =  useElements();

    const paymentHandler = async (e) => {

     e.preventDefault();

     if(!stripe || !elements){
        return;
     }

     const response = await fetch('/.netlify/functions/create-payment-intent',{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000} ),

     }).then((res) => res.json());

     console.log(response);

     const {
        paymentIntent: {client_secret},
      } = response;
     console.log(client_secret);

     const paymentResult = await stripe.confirmCardPayment(client_secret,{
        payment_method : {
            card : elements.getElement(CardElement),
            billing_details:{
                name : 'stephen'
            }
        }
     })

     if(paymentResult.error){
        alert(paymentResult.error)
     }
     else{
        if(paymentResult.paymentIntent.status === 'succeeded'){
            alert('payment successful');
        }
     }

    };
    
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

