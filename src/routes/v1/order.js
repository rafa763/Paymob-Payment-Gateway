import express from "express";
import payStore from "../../models/payment.js";

const server = express.Router();

server.get("/", async (req, res, next) => {
  try {
    // get the order id from the request query
    const order_id = req.query.orderId;

    // get the orders from the database
    const order = await payStore.find({ order_id });

    // respond with the orders
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default server;
