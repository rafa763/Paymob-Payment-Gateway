<p align="center">
  <img src="https://ecp.yusercontent.com/mail?url=https%3A%2F%2Fattachment.freshdesk.com%2Finline%2Fattachment%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgxOTIyNDk1ODQsImRvbWFpbiI6IndlYWNjZXB0YXNzaXN0LmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoxMTk3ODQzfQ.PG-_-eyKjVywB6dbCykLcdGY9kaUhePRUNB0qMTW4pU&t=1685401528&ymreqid=eeb0cb28-60d7-63f5-2f2c-5a000a01c000&sig=dIFv6_ZC8OFW.AE0CW0gAQ--~D" alt="GIF">
</p>

# PayMob Integration for Node.js Application

This project provides integration with the PayMob payment gateway in a Node.js application, allowing you to process payments, retrieve transactions, and perform void and refund operations.

## Features

- Process payments securely using PayMob payment gateway
- Retrieve transaction details for analysis and reporting
- Perform void and refund operations on transactions
- Easy integration into Node.js applications with clean and readable code

## Installation

1. Clone the repository or download the source code.
2. Install the required dependencies by running the following command:

```shell
npm install
```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

```shell
PAY_API
HMAC_KEY
PASSWORD
USERNAME
MONGO_URI
PORT
```

4. Run the application using the following command:

```shell
npm start
```

## Project flow

### `src/utils/authenticate.js`

This file contains the `authenticate` function, which is used to authenticate the application with the PayMob payment gateway. It takes the following parameters:

- `username`: The username of the PayMob account
- `password`: The password of the PayMob account
- `api_key`: The API key of the PayMob account

The function returns a promise that resolves to an object containing the following properties:

- `token`: The token to be used for authentication aka `access token`

### `src/utils/checkout.js`

This file contains the `checkout` function, which is used to register an order to Accept's database and obtain payment_key token for this order, think of it as a wrapper around the payment flow found in paymob documentation It takes the following parameters:

- `order_cart`: An array of objects containing the items to be purchased
- `amount_cents`: The total amount to be paid in cents
- `billing_data`: An object containing the billing details of the customer

and returns a promise that resolves to an object containing the following properties:

- `id`: The ID of the order

the function then proceeds to create the payment key token for this order and returns a promise that resolves to an object containing the following properties:

- `token`: The payment key token

this token is then used in the iframe to redirect the user to the payment page

### `void, get_transaction, refund`

These functions are used to perform void, get transaction details, and refund operations respectively. all of them need to be authenticated first using the `authenticate` function then continue with the operation.

## Rest Examples

in the rest folder you can find examples of how to use the routes in the project, take a look at them to get a better understanding of how to use the project but in general the flow is as follows:

- create an order using the `checkout`
- Do any the following operations:
  - get the transaction details using `get_transaction`
  - get the order status using `orders`
- if the payment is not captured yet, you can void it using `void`
- if the payment is captured, you can refund it using `refund`

## Acknowledgements

This project was inspired by the need to integrate PayMob payment gateway into Node.js applications, making it easier to handle payments and related operations especially in Egypt.

Special thanks to the PayMob team for providing the support for integrating with their payment gateway.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code.
