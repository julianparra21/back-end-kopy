import { pool } from "../db.js";
import Stripe from "stripe";
import { sendEmails } from "./helpers/nodemailer.js";

export const buyGet = (req, res) => {
  res.send("compra");
};

export const buyPost = async (req, res) => {
  try {
    const { id, amount, nombre, cc, email } = req.body;
    console.log(nombre, cc, email);
    const payment = await Stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Pan",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    console.log({ message: "Succesfull payment" });
    await sendEmails(email, 4, nombre, cc, amount);
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
    console.log(error);
  }
};
