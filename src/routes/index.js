import express from 'express';
import pay from './v1/checkout.js';
import refund from './v1/refund.js';
import voidTrx from './v1/void.js';
import trx from './v1/trx.js';
import state from './v1/state.js';
import processed from './v1/callback.js';

const server = express.Router();

server.get('/', (req, res) => {
    return res.render('info', { layout: './layouts/base' });
});

server.use('/checkout', pay);
server.use('/refund', refund);
server.use('/void', voidTrx);
server.use('/trx', trx);
server.use('/state', state);
server.use('/processed', processed);
server.use('*', (req, res) => {
    return res.status(404).json({ error: 'Not Found' });
});

export default server;
