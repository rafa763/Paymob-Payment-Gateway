import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    amount_cents: Number,
    created_at: String,
    currency: String,
    error_occured: Boolean,
    has_parent_transaction: Boolean,
    id: Number,
    integration_id: Number,
    is_3d_secure: Boolean,
    is_auth: Boolean,
    is_capture: Boolean,
    is_refunded: Boolean,
    is_standalone_payment: Boolean,
    is_voided: Boolean,
    order_id: Number,
    owner: Number,
    pending: Boolean,
    source_data_pan: String,
    source_data_sub_type: String,
    source_data_type: String,
    success: Boolean,
    transaction_processed_callback_sent: Boolean,
    updated_at: String
});

module.exports = mongoose.model('paymentDetails', schema);