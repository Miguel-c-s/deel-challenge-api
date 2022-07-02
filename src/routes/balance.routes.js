const express = require('express');

const { depositMoney } = require('../controllers/balance.controller');

const balanceRouter = express.Router();

balanceRouter.post('/deposit/:userId', depositMoney);

module.exports = balanceRouter;