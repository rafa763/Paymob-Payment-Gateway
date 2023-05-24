import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

// Set your Paymob API token
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const PAYMOB_API_TOKEN = process.env.PAY_API;
const PAYMOB_API_BASE_URL = 'https://accept.paymob.com/api';

async function authenticate(transactionId, refundAmount) {
    console.log('PAYMOB_API_KEY', PASSWORD)
    try {
      const url = `${PAYMOB_API_BASE_URL}/auth/tokens`;
      const headers = {
        'Content-Type': 'application/json'
      };
      const data = {
        "api_key": PAYMOB_API_TOKEN,
        "username": USERNAME,
        "password": PASSWORD
      };
  
      const response = await axios.post(url, data, { headers });
      const accessToken = response.data.token;
  
      // Call the function to get transactions using the access token
        
    //   await getTransactionById(transactionId, accessToken);
        await refundTransaction(transactionId, refundAmount, accessToken);
    } catch (error) {
      console.error('Error authenticating:', error.response.data);
    }
}

// Function to refund a transaction
async function refundTransaction(transactionId, refundAmount, accessToken) {
  try {
    const url = `${PAYMOB_API_BASE_URL}/acceptance/void_refund/refund`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
    const data = {
      "auth_token": PAYMOB_API_TOKEN,
      "transaction_id": transactionId,
      "amount_cents": refundAmount
    };

    const response = await axios.post(url, data, { headers });

    console.log('Refund transaction successful.');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error refunding transaction:', error.response.data);
  }
}
const transactionId = 107829529;
const refundAmount = 1000;
authenticate(transactionId, refundAmount)