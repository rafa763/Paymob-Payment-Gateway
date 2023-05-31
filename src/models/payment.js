import mongoose from 'mongoose';

// Setup schema for whatever data you want to store from the callback

const schema = new mongoose.Schema({
    amount_cents: {
        type: Number,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    error_occured: {
        type: Boolean,
        required: true
    },
    has_parent_transaction: {
        type: Boolean,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    integration_id: {
        type: Number,
        required: true
    },
    is_3d_secure: {
        type: Boolean,
        required: true
    },
    is_auth: {
        type: Boolean,
        required: true
    },
    is_capture: {
        type: Boolean,
        required: true
    },
    is_refunded: {
        type: Boolean,
        required: true
    },
    is_standalone_payment: {
        type: Boolean,
        required: true
    },
    is_voided: {
        type: Boolean,
        required: true
    },
    order_id: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    pending: {
        type: Boolean,
        required: true
    },
    source_data_pan: {
        type: String,
        required: true
    },
    source_data_sub_type: {
        type: String,
        required: true
    },
    source_data_type: {
        type: String,
        required: true
    },
    success: {
        type: Boolean,
        required: true
    }
});

const Store = mongoose.model('paymentDetails', schema);

export default Store;