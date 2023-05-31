import express from "express";
import { voidTransaction } from "../../utils/voidTrx.js";

const router = express.Router();

// void a transaction
router.post("/", async (req, res, next) => {
  try {
    // Get the transaction id from the request body
    const { transactionId } = req.body;
    // Void the transaction
    const voided = await voidTransaction(transactionId);
    // respond with the voided transaction details
    return res.status(200).json(voided);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
