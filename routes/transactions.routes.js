const express = require('express');
const router = express.Router();
const { Transaction } = require('../models/Transaction');


// Get All
router.get('/', async (_, res) => {
    await Transaction.find().then(
        transactions => {
            return (
                transactions ? 
                    res.status(200).json( transactions ) :
                    res.status(404).json({ 'message': 'Could not get transactions.' })
            );
        },
        reason => {
            return res.status(500).json({ 'message': reason.message });
        }
    );
});

// Get Transactions from seller
router.get('/seller/:seller', async (req, res) => {
    const seller = req.params.seller;
    await Transaction.find({ seller: seller }, null, null)
    .then(
        docs => {
            return res.status(200).json( docs );
        },
        err => {
            return res.status(404).json({ 'message': `Could not find transactions from seller ${seller}` });
        }
    );
});

// Get Transactions from credit
router.get('/balance/:credit', async (req, res) => {
    let credit = req.params.credit.toLowerCase();
    if (['credit', 'debit'].includes(credit)) {
        credit = (credit === 'credit');
    } else {
        return res.status(404).json({'message': `Acceptable input: [credit, debit] not ${credit}` });
    }
    await Transaction.find({ credit: credit }, null, null)
    .then(
        transaction => {
            return res.status(200).json( transaction );
        },
        reason => {
            return res.status(500).json({ 'message': reason.message });
        }
    );
});

router.post('/save', async (req, res) => {
    await Transaction.create( req.body )
    .then(
        transaction => {
            return res.status(201).json( transaction );
        },
        reason =>{
            return res.status(500).json({ 'message': reason.message });
        }
    );
});

router.delete('/delete/:id', (req, res) => {
    Transaction.findByIdAndDelete(req.params.id, null, (err, docs) => {
        if (err) return res.status(500).json({ 'message': err.message });
        return (
            docs ?
                res.status(201).json( docs ) :
                res.status(404).json({ 'message': `Could not find transaction id: ${id}` })
        );
    });
});

router.patch('/update/:id', async (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body, null, (err, docs) => {
        if (err) return res.status(500).json({ 'message': err.message });
        return (
            docs ?
                res.status(201).json( docs ) :
                res.status(404).json({ 'message': `Could not find transaction id: ${id}` })
        );
    })
});

module.exports = router;