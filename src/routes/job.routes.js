const express = require('express');

const { getUnpaidJobs, payJob } = require('../controllers/job.controller');
const { getProfile } = require('../middleware/getProfile');

const jobRouter = express.Router();

jobRouter.get('/unpaid',getProfile, getUnpaidJobs);
jobRouter.post('/:job_id/pay', getProfile, payJob);

module.exports = jobRouter;