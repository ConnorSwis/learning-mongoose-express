const express = require('express');
const router = express.Router();
const { Transaction } = require('../models/Transaction');


// Get All
router.get('/', async (req, res) => {
    const trans = Transaction.create({
        seller: 'Connor',
        amount: 35,
        comment: 'ooga booga',
    });
    if (trans) {
        res.status(200).json('ooga booga');
    } else {
        res.status(404).json('booga ooga');
    };
});

// Get Transactions from seller
router.get('/seller/:seller', async (req, res) => {
    const seller = req.params.seller;
    const transaction = await Transaction.find({ seller: seller }, null, null)
    .then(
        (docs) => {
            return res.status(200).json( docs );
        },
        (err) => {
            return res.status(404).json({ 'message': `Could not find transactions from seller ${seller}` });
        }
    );
    // .then( (error) => {
    //     if (error) {
            // return res.status(404).json({ 'message': `Could not find transactions of seller: ${req.params.seller}`});
    //     }
    // });

    // if ( transaction ) {
    //     return res.status(200).json( transaction );
    // } else {
    //     return res.status(404).json( transaction );
    // };
});

// Create Transaction
router.get('/create', async (req, res) => {
    const trans = await Transaction.create({
        seller: 'Connor',
        amount: 35,
        credit: true,
        comment: 'ooga booga',
    });
    await trans.save();
    res.status(201).json('created');
})

router.post('/save', async (req, res) => {
    const trans = await Transaction.create( req.body )
    .then(
        () => {
            return res.status(201).json({ 'message': 'Saved' });
        },
        (reason) =>{
            return res.status(404).json({ 'message': 'Could not save transaction.' });
        }
    );
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const trans = Transaction.findByIdAndDelete(id, null, (err, docs) => {
        if(err) {
            return res.status(404).json(`Could not find transaction id: ${id}`);
        };
    });
    

})

module.exports = router;