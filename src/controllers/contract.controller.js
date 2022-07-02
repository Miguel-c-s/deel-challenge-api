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

    getNonTerminatedContracts: async (req, res) => {

    },
}