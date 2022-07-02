const express = require('express');

const { getBestProfession, getBestClients } = require('../controllers/admin.controller');

const adminRouter = express.Router();

// Could add admin accounts, admin auth middleware, ...

adminRouter.get('/best-profession', getBestProfession);
adminRouter.get('/best-clients', getBestClients);

module.exports = adminRouter;