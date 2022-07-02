const { Op } = require("sequelize");
const { sequelize } = require('../model');

module.exports = {
    getUnpaidJobs: async (req, res, next) => {
        try {
            const { Contract, Job } = req.app.get('models');
            const { id: profileId } = req.profile;

            const jobs = await Job.findAll({
                where: { paid: { [Op.or]: { [Op.eq]: false, [Op.eq]: null } } },
                include: [{
                    model: Contract,
                    attributes: [],
                    where: {
                        [Op.or]: [
                            { ContractorId: profileId },
                            { ClientId: profileId },
                        ],
                        status: 'in_progress',
                    }
                }],
            });

            res.json(jobs);
        } catch (e) {
            next(e);
        }

    },

    payJob: async (req, res, next) => {
        try {
            const { Contract, Job, Profile } = req.app.get('models');
            const { job_id } = req.params;

            const { id: profileId, balance } = req.profile;

            const job = await Job.findOne({
                where: { id: job_id },
                include: [{
                    model: Contract,
                    required: true,
                    where: { ClientId: profileId },
                }]
            });

            if (!job){
                return res.status(404).send('Job not found');
            }

            if (job.paid){
                return res.status(400).send('Job already paid');
            }
            if (balance < job.price) {
                return res.status(400).send('Your balance is too low to pay for this job. Please top up your balance.');
            }

            try {
                await sequelize.transaction(async (t) => {
                    const results = await Promise.all([
                        Profile.decrement({ balance: job.price }, { where: { id: job.Contract.ClientId } }, { transaction: t }),
                        Profile.increment({ balance: job.price }, { where: { id: job.Contract.ContractorId } }, { transaction: t }),
                        Job.update({ paid: true, paymentDate: new Date() }, { where: { id: job_id } }, { transaction: t })
                    ]);
                });
            } catch (e) {
                res.status(500).send('Your payment could not be processed at this time. Please try again later.');
            }

            res.send(`Job with title \"${job.description}\" was paid successfully. The total value was ${job.price}€.`) // or send job altertively
        } catch (e) {
            next(e);
        }
    },
}