import { pool } from "../db.js";
import Stripe from "stripe";
import { sendEmails } from "./helpers/nodemailer.js";
import { EmailSend } from "./helpers/nodemailer2.0.js";

export const buyGet = (req, res) => {
  res.send("compra");
};

export const buyPost = async (req, res) => {
const stripe=new Stripe ("sk_test_51MyDPuD7xwBecERvs5KLjTQJdhDvdJeCoDTTZRrLRvIl1ABbeILF9j2aGc9HOUO1qiTN6eR476D8Qgjpb0CY3dbU002EzWIZGw")
  
  try {
    const { id, amount, nombre, cc, email } = req.body;
    console.log(nombre, cc, email);
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Pan",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    console.log({ message: "Succesfull payment" });
    await EmailSend(email, 7, nombre, cc, amount);
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
    console.log(error);
  }
};
