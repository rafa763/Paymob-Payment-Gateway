import axios from "axios";
import { authenticate } from "./authenticate.js";

const PAYMOB_URL = "https://accept.paymob.com/api";

// Function to fetch transaction details by ID from Paymob servers
export async function getTransactionById(transactionId) {
  try {
    // Authentication Request -- step 1 in the docs
    const accessToken = await authenticate();
    const url = `${PAYMOB_URL}/acceptance/transactions/${transactionId}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error("Error fetching transaction:", error.response.data);
  }
}
