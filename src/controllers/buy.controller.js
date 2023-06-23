import { pool } from "../db.js";
import Stripe from "stripe";
export const buyGet =(req, res) => {
    res.send("compra")
}

export const buyPost = async (req, res) => {
try {
    const {id, amount} = req.body;
    const payment= await Stripe.paymentIntents.create({
        amount,
        currency:"USD",
        description:"Pan",
        payment_method: id,
        confirm:true
    });
    console.log(payment);
    console.log({message:'Succesfull payment'});
    
    
} catch (error) {
    console.log(error);
    res.json({message:'error'})
    console.log(error );
}
    

  
    
   
}