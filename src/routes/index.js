
const express = require('express');
const router = express.Router();

const contractRoutes = require('./contract.routes');
const jobRoutes = require('./job.routes');
const balanceRoutes = require('./balance.routes');
const adminRoutes = require('./admin.routes');

router.use('/contracts', contractRoutes);
router.use('/jobs', jobRoutes);
router.use('/balances', balanceRoutes);
router.use('/admin', adminRoutes);

module.exports = router;