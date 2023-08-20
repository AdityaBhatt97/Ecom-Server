
const router = require("express").Router();
const {verifyToken} = require('./verifyToken')
// const stripe = require("stripe")(process.env.STRIPE_KEY);
require("dotenv").config();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment",  verifyToken , async(req, res) => {
 return stripe.customers.create({
  email: req.body.token.email,
   source : req.body.token.id,

 }).then(customer => {

   
   stripe.paymentIntents.create(
     {
       amount: req.body.amount,
       currency: "inr",
       customer: customer.id,
      }
    ).then(result => res.status(200).json(result))
    .catch(err =>  {
      res.status(500).json(err)
    })
 
  
});

})

module.exports = router;