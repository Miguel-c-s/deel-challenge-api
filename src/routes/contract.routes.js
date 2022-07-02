const express = require('express');

const { getContract, getNonTerminatedContracts } = require('../controllers/contract.controller');
const { getProfile } = require('../middleware/getProfile');

const contractRouter = express.Router();

contractRouter.get('/',getProfile, getNonTerminatedContracts);
contractRouter.get('/:id', getProfile, getContract);

module.exports = contractRouter;