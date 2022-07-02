
const express = require('express');
const router = express.Router();

const contractRoutes = require('./contract.routes');
const jobRoutes = require('./job.routes');

router.use('/contracts', contractRoutes);
router.use('/jobs', jobRoutes);

module.exports = router;