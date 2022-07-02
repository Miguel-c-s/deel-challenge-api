const { Op } = require("sequelize");

module.exports = {
    getContract: async (req, res) => {
        const { Contract } = req.app.get('models');
        const { id } = req.params;
        const { id: profileId } = req.profile
        const contract = await Contract.findOne({ where: { id, [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }], } });
    
        if (!contract) return res.status(404).send('Contract not found');
    
        res.json(contract);
    },

    getNonTerminatedContracts: async (req, res) => {

    },
}