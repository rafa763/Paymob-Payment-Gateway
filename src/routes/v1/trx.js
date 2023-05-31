import express from "express";
import { getTransactionById } from "../../utils/getTrx.js";

const router = express.Router();

// get transaction by id
router.get("/", async (req, res, next) => {
  try {
    // Get the transaction id from the request query
    const transactionId = req.query.transactionId;

    // Get the transaction details from paymob
    const transaction = await getTransactionById(transactionId);

    // respond with the transaction details
    res.status(200).send(transaction);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
