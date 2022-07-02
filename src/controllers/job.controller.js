const { Op } = require("sequelize");

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

    },
}