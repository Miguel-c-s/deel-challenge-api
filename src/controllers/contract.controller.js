
module.exports = {
    getContract: async (req, res) => {
        const {Contract} = req.app.get('models');
        const {id} = req.params;
        const contract = await Contract.findOne({where: {id}});
        if(!contract) return res.status(404).end();
        res.json(contract);
    },

    getNonTerminatedContracts: async (req, res) => {
        
    },
}