import express from "express";
import { pay } from "../../utils/checkout.js";

const server = express.Router();

server.post("/", async (req, res, next) => {
  try {
    // Get the order_cart, billing_data, amount_cents from the request body
    const { order_cart, billing_data, amount_cents } = req.body;

    // get the payment token for this order
    const token = await pay(order_cart, billing_data, amount_cents);

    // create the payment link
    const link = `https://accept.paymob.com/api/acceptance/iframes/416800?payment_token=${token}`;

    // respond with the payment link
    return res.status(200).json(link);
  } catch (error) {
    return res.status.json(error);
  }
});

export default server;
