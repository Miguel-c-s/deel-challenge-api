
const express = require('express');
const router = express.Router();

const contractRoutes = require('./contract.routes');

router.use('/contracts', contractRoutes);

module.exports = router;