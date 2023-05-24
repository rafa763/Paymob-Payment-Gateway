import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

async function Authenticate() {
    // Authenticate Request and get token
    const authenticateUrl = 'https://accept.paymob.com/api/auth/tokens'
    const headers = {
        'Content-Type': 'application/json'
    }
    const authenticateData = {
        "api_key": process.env.PAY_API
    }
    const token = await axios.post(authenticateUrl, authenticateData, { headers })
    // console.log(token.data.token)
    // return token.data.token
    return registerOrder(token.data.token)
}

async function registerOrder(token) {
    // register an order to Accept's database, so that you can pay for it later using a transaction

    const orderUrl = 'https://accept.paymob.com/api/ecommerce/orders'
    const headers = {
        'Content-Type': 'application/json'
    }
    const orderData = {
        "auth_token":  token,
        "delivery_needed": "false",
        "amount_cents": "1000",
        "currency": "EGP",
        "items": [
            {
                "name": "ASC1515",
                "amount_cents": "500000",
                "description": "Smart Watch",
                "quantity": "1"
            }
        ]
    }
    const order = await axios.post(orderUrl, orderData, { headers })

    // console.log(order, order.data.token, order.data.id)
    return paymentKey(token, order.data.id)
}

async function paymentKey(token, id) {
    // obtain a payment_key token. This key will be used to authenticate your payment request
    const paymentKeyUrl = 'https://accept.paymob.com/api/acceptance/payment_keys'

    const headers = {
        'Content-Type': 'application/json'
    }

    const paymentKeyData = {
        "auth_token": token,
        "amount_cents": "1000",
        "expiration": 3600,
        "order_id": id,
        "billing_data": {
          "apartment": "803",
          "email": "claudette09@exa.com",
          "floor": "42",
          "first_name": "Clifford",
          "street": "Ethan Land",
          "building": "8028",
          "phone_number": "+86(8)9135210487",
          "shipping_method": "PKG",
          "postal_code": "01898",
          "city": "Jaskolskiburgh",
          "country": "CR",
          "last_name": "Nicolas",
          "state": "Utah"
        }, 
        "currency": "EGP",
        "integration_id": 2329228
    }
    // console.log(paymentKeyData)
    const paymentKey = await axios.post(paymentKeyUrl, paymentKeyData, { headers })
    // console.log(paymentKey.data.token)
    return paymentKey.data.token
}
    

// console.log(await Authenticate())
export default Authenticate