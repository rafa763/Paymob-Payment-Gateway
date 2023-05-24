import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

// Set your Paymob API key
const PAYMOB_API_KEY = process.env.PAY_API;
const PAYMOB_API_BASE_URL = 'https://accept.paymob.com/api';
const PASSWORD = process.env.PASSWORD;
const USERNAME = process.env.USERNAME;

// Function to authenticate and obtain access token
async function authenticate() {
    console.log('PAYMOB_API_KEY', PASSWORD)
    try {
      const url = `${PAYMOB_API_BASE_URL}/auth/tokens`;
      const headers = {
        'Content-Type': 'application/json'
      };
      const data = {
        "api_key": PAYMOB_API_KEY,
        "username": USERNAME,
        "password": PASSWORD
      };
  
      const response = await axios.post(url, data, { headers });
      const accessToken = response.data.token;
  
      // Call the function to get transactions using the access token
      const transactionId = 107828919;
      await getTransactionById(transactionId, accessToken);
    } catch (error) {
      console.error('Error authenticating:', error.response.data);
    }
}

// Function to fetch transaction details by ID
async function getTransactionById(transactionId, accessToken) {
  try {
    const url = `${PAYMOB_API_BASE_URL}/acceptance/transactions/${transactionId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    const response = await axios.get(url, { headers });
    const transaction = response.data;

    // Process the transaction data as needed
    console.log('Transaction:', transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error.response.data);
  }
}

// Call the authentication function to start the process
authenticate();