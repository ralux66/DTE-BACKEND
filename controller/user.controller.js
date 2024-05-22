//const utility = require("../utility/readExcel")

const user = require('../models').users;
 
//const { crearBillDte } = require('../Entitys');

module.exports = {
    /**
     * Create a new juego
     * 
     * Methoud: POST
     * Headers: -
     * Body: -
     * 
     * @param {*} req 
     * @param {*} res 
     */


    /**
     * Find all games
     * 
     * Example: SELECT * FROM usuarios
     * 
     * Methoud: GET
     * Headers: -
     * Body: -
     * 
     * @param {*} _ 
     * @param {*} res 
     */
     listCustomer(_, req, res) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'List all the games'
        return  user.findAll({});
           /*  .then(customer => res.status(200).send(customer))
            .catch(error => res.status(400).send(error)) */
    },

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
    findUser(req) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'Find a game'
        return user
            .findOne({
                where: {
                    password: req.body.password,
                    email: req.body.email,
                }
            });
          
    },



  
}
