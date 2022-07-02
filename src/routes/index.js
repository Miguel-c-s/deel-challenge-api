
const express = require('express');
const router = express.Router();

const contractRoutes = require('./contract.routes');
const jobRoutes = require('./job.routes');
const balanceRoutes = require('./balance.routes');

router.use('/contracts', contractRoutes);
router.use('/jobs', jobRoutes);
router.use('/balances', balanceRoutes);

module.exports = router;