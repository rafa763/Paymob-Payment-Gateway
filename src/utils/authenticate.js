import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Set your Paymob API token
const API_TOKEN = process.env.PAY_API;
const PAYMOB_URL = "https://accept.paymob.com/api";
const PASSWORD = process.env.PASSWORD;
const USERNAME = process.env.USERNAME;

// Authenticate with Paymob to get an access token
export async function authenticate() {
  try {
    const url = `${PAYMOB_URL}/auth/tokens`;
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      api_key: API_TOKEN,
      username: USERNAME,
      password: PASSWORD,
    };
    const response = await axios.post(url, data, { headers });
    const accessToken = response.data.token;
    return accessToken;
  } catch (error) {
    console.error("Error authenticating:", error.response.data);
  }
}
