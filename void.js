import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

// Set your Paymob API token
const PAYMOB_API_TOKEN = process.env.PAY_API;
const PAYMOB_API_BASE_URL = 'https://accept.paymob.com/api';
const PASSWORD = process.env.PASSWORD;
const USERNAME = process.env.USERNAME;


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
        await voidTransaction(transactionId, accessToken)
    } catch (error) {
      console.error('Error authenticating:', error.response.data);
    }
}



// Function to void a transaction
async function voidTransaction(transactionId, accessToken) {
  try {
    const url = `${PAYMOB_API_BASE_URL}/acceptance/void_refund/void?token=${PAYMOB_API_TOKEN}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
    const data = {
      "transaction_id": transactionId
    };

    const response = await axios.post(url, data, { headers });

    console.log('Void transaction successful.');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error voiding transaction:', error);
  }
}

// Usage: Call the function with the transaction ID you want to void
const transactionId = 107828919;
// voidTransaction(transactionId);
authenticate(transactionId);
