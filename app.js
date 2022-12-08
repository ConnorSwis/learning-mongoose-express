require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const transactionsRouter = require('./routes/transactions.routes');

mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log("Connected to DB..."))

app.use(express.json());

app.use('/transactions', transactionsRouter);

app.listen(3000, () => {
    console.log('App started..')
})
