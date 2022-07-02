const { Op } = require("sequelize");
const { sequelize } = require('../model');

const { dateFilter } = require('../utils/dateFilter')

module.exports = {
    getBestProfession: async (req, res, next) => {
        try {
            const { Contract, Profile, Job } = req.app.get('models');
            let result = undefined;
        
            let { start, end } = req.query;
        
            try { 
                ({ startDate: start, endDate: end } = dateFilter(start, end));
            } catch (e) {
                return res.status(400).send(e.message);
            }

            const jobs = await Job.findAll({
                where: {
                    paid: true,
                    paymentDate: { // if paymentDate does not exist?
                        [Op.between]: [start, end],
                    }
                },
                attributes: [
                    'Contract.Contractor.profession',
                    [sequelize.fn('sum', sequelize.col('price')), 'totalAmount'],
                ],
                group: ['Contract.Contractor.profession'],
                include: [
                    {
                        model: Contract,
                        include: [
                            {
                                model: Profile,
                                as: 'Contractor',
                            }
                        ],
                    }
                ],
                raw: true,
                nest: true,
            });

            // Possibly this could be done directly inside the query
            // At the moment I am not sure if that would be more efficient or not
            jobs.forEach((j) => {
                if (!result || j.totalAmount > result.totalAmount) {
                    result = {};
                    result.totalAmount = j.totalAmount;
                    result.profession = j.Contract.Contractor.profession;
                }
            })
        
            res.json(result)
        } catch (e) {
            next(e);
        }

    },

    getBestClients: async (req, res, next) => {
        try {
          
        } catch (e) {
            next(e);
        }
    },
}