const { Op } = require("sequelize");
const { sequelize } = require('../model');

module.exports = {
    depositMoney: async (req, res, next) => {
        try {
            const { Contract, Profile, Job } = req.app.get('models')
            const { userId } = req.params;

            let { amount } = req.body;

            if (isNaN(amount) || amount < 0) {
                return res.status(400).send('Amount must be a positive value');
            }

            await sequelize.transaction(async (t) => {

                const client = await Profile.findOne({ where: { id: userId } }, { transaction: t });
                if (!client) {
                    return res.status(404).send('Client not found');
                }

                // Not sure if "jobs to pay" are jobs that are already terminated, or can also be in progress or new. We would need to add a filter in the former case.
                const totalUnpaid = await Job.sum('price', {
                    where: {
                        paid: { [Op.or]: { [Op.eq]: false, [Op.eq]: null } },
                        '$Contract.ClientId$': userId,
                    },
                    include: [Contract]
                }, { transaction: t });


                const maxDeposit = totalUnpaid / 4;
                if (amount > maxDeposit) {
                    return res.status(400).send(`You can only deposit up to ${maxDeposit}€, which is 25% of the total for your unpaid jobs.`);
                }
                await client.increment('balance', { by: amount }, { transaction: t });
                await client.reload({ transaction: t });
                
                return res.send(`Sucessfully deposited ${amount}€ to user ${client.firstName} ${client.lastName}. Current balance: ${client.balance}€`);
            });


        } catch (e) {
            console.log(e)
            next(e);
        }

    },
}