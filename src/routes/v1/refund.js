import express from "express";
import { refundTransaction } from "../../utils/refundTrx.js";
import { getTransactionById } from "../../utils/getTrx.js";

const router = express.Router();

// refund a transaction
router.post("/", async (req, res, next) => {
  try {
    // Get the transaction id from the request body
    const { transactionId } = req.body;

    // Get the transaction details from paymob
    const transaction = await getTransactionById(transactionId);

    // Refund the transaction
    const refunded = await refundTransaction(
      transactionId,
      transaction.amount_cents
    );

    // respond with the refunded transaction details
    return res.status(200).send(refunded);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
