const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/transaction.model');

// import Transaction from '../transaction';

router.get('/transactions', (req, res) => {
    res.contentType('application/json');
    Transaction.find({})
        .then((transactions) => {
        res.status(200).json(transactions);
})
});

router.post('/transactions', (req, res) => {
    res.contentType('application/json');
    Transaction.create({
        _id: mongoose.Types.ObjectId(),
        from: req.body.from,
        to: req.body.to,
        amount: req.body.amount,
    })
    .then(transaction => res.status(200).send(transaction))
});

module.exports = router;