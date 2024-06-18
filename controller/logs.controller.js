//const utility = require("../utility/readExcel")

const logs = require('../models').logs;
 
//const { crearBillDte } = require('../Entitys');

module.exports = {
   

    /**
     * Find one user in the table games
     * 
     * Example: SELECT * FROM juegos WHERE name = 'Pac Man'
     * 
     * Methoud: GET
     * Headers: -
     * Body: -
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async listlogsbycompanyguid(req) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'Find a game'
        return await logs
            .findAll({
                where: {
                    companyguid: req.body.companyguid,
                },
                order: [
                    ['fecha_hora', 'DESC']
                ]
            });
          
    },
}
