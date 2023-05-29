import axios from "axios";
import dotenv from "dotenv";
import { authenticate } from "./authenticate.js";

dotenv.config();

const PAYMOB_URL = "https://accept.paymob.com/api";

export async function pay(order_cart, billing_data, amount_cents) {
  // Authentication Request
  const accessToken = await authenticate();

  // Order Registration API
  const orderUrl = `${PAYMOB_URL}/ecommerce/orders`;
  const headers = {
    "Content-Type": "application/json",
  };
  const orderData = {
    auth_token: accessToken,
    delivery_needed: "false",
    amount_cents,
    currency: "EGP",
    items: order_cart,
  };
  const order = await axios.post(orderUrl, orderData, { headers });
  const orderId = order.data.id;

  // Payment Key Request
  const paymentKeyUrl = `${PAYMOB_URL}/acceptance/payment_keys`;

  const paymentKeyData = {
    auth_token: accessToken,
    amount_cents,
    expiration: 3600,
    order_id: orderId,
    billing_data,
    currency: "EGP",
    integration_id: 2329228,
  };
  const paymentKey = await axios.post(paymentKeyUrl, paymentKeyData, headers);
  return paymentKey.data.token;
}
