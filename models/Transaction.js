const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    seller: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    credit: {
        type: Boolean,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = { Transaction };