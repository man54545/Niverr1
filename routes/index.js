const express = require('express');
const routes = express.Router();
const stripe = require('stripe')('sk_test_51Na9tVSI1EYzfXo9FXhdG2OHqxoT0XIA5KkHZADNPcx6IcvImN89DsqTVE5nigKsTTk4uYZyORR4O5aPnrAafQUg00eIrJeRjj');

routes.use('/auth', require('./auth'));
routes.use('/user', require('./user'));
routes.use('/gig', require('./gig'));
routes.use('/order', require('./order'));
routes.use('/review', require('./review'));
routes.use('/chat', require('./chat'));

routes.post('/pay', async (req,res)=>{
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            line_items: 
            [{
                price_data : {
                    currency : 'inr',   
                    product_data: {
                        name: req.body.title,
                    },
                    unit_amount: (req.body.price)*100
                },
                quantity : 1    
            }],
            mode: 'payment',
            success_url: `${"http://localhost:3000/order"}`,
            cancel_url: `${"http://localhost:3000/cancle"}`,
        });
        if(session){
            res.status(200).json({url : session.url});
        }
        else{
            res.status(400).json({msg : 'something wrong.'});
        }
    } catch (error) {
        res.status(400).json({msg : 'something wrong.'});
    }
});

module.exports = routes;