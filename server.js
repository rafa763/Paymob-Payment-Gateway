import express from 'express'
import pay from './helpers.js'
import { createHmac } from 'crypto'


const PORT = 3000
const server = express()
server.use(express.json());

server.get('/index', (req, res, next) => {
    res.sendFile('/payments/index.html') 
})

server.get('/pay', async (req, res, next) => {
    try {
        // Perform the payment
        const token = await pay();
        console.log(token)
        const link = `<a href="https://accept.paymob.com/api/acceptance/iframes/416800?payment_token=${token}">Payment Link</a>`
        res.send(link)
      } catch (error) {
        res.send('error');
      }
})

server.get('/state', async (req, res, next) => {
    let success = req.query.success
    if (success === 'true') {
        res.send('success')
    } else {
        res.send('failed')
    }
})

server.post('/processed', async (req, res, next) => {

    const amount_cents = req.body.obj.amount_cents
    const created_at = req.body.obj.created_at
    const currency = req.body.obj.currency
    const error_occured = req.body.obj.error_occured
    const has_parent_transaction = req.body.obj.has_parent_transaction
    const id = req.body.obj.id
    const integration_id = req.body.obj.integration_id
    const is_3d_secure = req.body.obj.is_3d_secure
    const is_auth = req.body.obj.is_auth
    const is_capture = req.body.obj.is_capture
    const is_refunded = req.body.obj.is_refunded
    const is_standalone_payment = req.body.obj.is_standalone_payment
    const is_voided = req.body.obj.is_voided
    const order_id = req.body.obj.order.id
    const owner = req.body.obj.owner
    const pending = req.body.obj.pending
    const source_data_pan = req.body.obj.source_data.pan
    const source_data_sub_type = req.body.obj.source_data.sub_type
    const source_data_type = req.body.obj.source_data.type
    const success = req.body.obj.success
    
    let lexogragical = amount_cents + created_at + currency + error_occured + has_parent_transaction + id + integration_id + is_3d_secure + is_auth + is_capture + is_refunded + is_standalone_payment + is_voided + order_id + owner + pending + source_data_pan + source_data_sub_type + source_data_type + success
    let hash = createHmac('sha512', process.env.HMAC_KEY).update(lexogragical).digest('hex')
    if (hash === req.query.hmac) {
        // store in the db
    } else {
        //altered data and ignore
    }
    // console.log(hash, '\n', req.query.hmac)
    return
})



server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})