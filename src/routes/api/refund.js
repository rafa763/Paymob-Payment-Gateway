import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Refund route');
    }
);

router.post('/refund', (req, res) => {
    res.send('Refund route');
    }
);

export default router;