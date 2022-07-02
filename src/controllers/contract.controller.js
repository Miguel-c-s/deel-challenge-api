const { Op } = require("sequelize");

module.exports = {
    getContract: async (req, res, next) => {
        const { Contract } = req.app.get('models');
        const { id } = req.params;
        const { id: profileId } = req.profile;
        try {
            const contract = await Contract.findOne({ 
                where: { 
                    id, 
                    [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }], 
                } });
        
            if (!contract) return res.status(404).send('Contract not found');
        
            res.json(contract);

        } catch (e) {
            next(e);
        }

    },

    getNonTerminatedContracts: async (req, res, next) => {

        try {
            const { Contract } = req.app.get('models');
            const { id: profileId } = req.profile;
    
            const contracts = await Contract.findAll({
                where: {
                    [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
                    status: { [Op.ne]: 'terminated' }
                }
            });
    
            res.json(contracts);
        } catch (e) {
            next(e);
        }

    },
}