const express = require('express');

const { depositMoney } = require('../controllers/balance.controller');
const { getProfile } = require('../middleware/getProfile');

const balanceRouter = express.Router();

balanceRouter.post('/deposit/:userId', getProfile, depositMoney);

module.exports = balanceRouter;