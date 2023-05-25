import axios from "axios";
import dotenv from "dotenv";
import { authenticate } from "./authenticate.js";

dotenv.config();

// Set your Paymob API token
const PAYMOB_TOKEN = process.env.PAY_API;
const PAYMOB_URL = "https://accept.paymob.com/api";

// Function to void a transaction
export async function voidTransaction(transactionId) {
  try {
    const accessToken = await authenticate();
    const url = `${PAYMOB_URL}/acceptance/void_refund/void?token=${PAYMOB_TOKEN}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      transaction_id: transactionId,
    };

    const response = await axios.post(url, data, { headers });

    return response.data;
  } catch (error) {
    console.error("Error voiding transaction:", error);
  }
}
