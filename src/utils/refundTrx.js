import axios from "axios";
import { authenticate } from "./authenticate.js";
import dotenv from "dotenv";

dotenv.config();

// Set your Paymob API token
const API_TOKEN = process.env.PAY_API;
const PAYMOB_URL = "https://accept.paymob.com/api";

// Function to refund a transaction
export async function refundTransaction(transactionId, refundAmount) {
  try {
    // Authentication Request -- step 1 in the docs
    const accessToken = await authenticate();
    const url = `${PAYMOB_URL}/acceptance/void_refund/refund`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      auth_token: API_TOKEN,
      transaction_id: transactionId,
      amount_cents: refundAmount,
    };

    const response = await axios.post(url, data, { headers });

    // console.log('Refund transaction successful.');
    // console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error refunding transaction:", error.response.data);
  }
}
