require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.handler = async (event) => {
    
    try{
        // const { amount } = JSON.parse(event.body);
      const { amount, currency = 'usd' } = JSON.parse(event.body);

      const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        });

        console.log(`Successfully created the paymentIntent.`)
         return{
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }),
         };
    }

    catch(error){
    //    console.log({ error });
        return{
            status: 400,
            body: JSON.stringify({ error }),
        };
    }
}