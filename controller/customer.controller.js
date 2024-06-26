//const utility = require("../utility/readExcel")

const customer = require('../models').customers;

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
    listCustomer(req) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'List all the games'
        return customer.findAll({
            where: {
                customerguid: req.body.customerguid,
            }
        });
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
    findCustomer(req) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'Find a game'
        return customer
            .findOne({
                where: {
                    customerguid: req.body.customerguid,
                }
            });

    },



    async createCustomer(req) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'Create a new game'
        const response = await customer
            .findOrCreate({
                where: {
                    RecLoc: element.RecLoc ?? "",
                },
                defaults: {
                    customerguid: req.body.customerguid,
                    nombre: req.body.nombre,
                    nombreComercial: req.body.nombreComercial,
                    nit: req.body.nit,
                    nrc: req.body.nrc,
                    tipoEstablecimiento: req.body.tipoEstablecimiento,
                    tipoMoneda: req.body.tipoMoneda,
                    telefono: req.body.telefono,
                    correo: req.body.correo,
                    codActividad: req.body.codActividad,
                    descActividad: req.body.descActividad,
                    departamento: req.body.departamento,
                    municipio: req.body.municipio,
                    complemento: req.body.complemento,
                    codEstableMH: req.body.codEstableMH,
                    codEstable: req.body.codEstable,
                    codPuntoVentaMH: req.body.codPuntoVentaMH,
                    codPuntoVenta: req.body.codPuntoVenta
                }
            });

        return response;
    },

    tokenDteLogin(customer) {
        const postAUTH_DTE = {
            method: 'post',
            url: process.env.AUTH_DTE,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
                user: customer.userapi,
                pwd: customer.passwordauth
            }
        };
        httpClient.postplus(
            postAUTH_DTE
        ).then((authdte) => {
            if (authdte) {
                return authdte;
            } else {
                return null;
            }
        });
    }


}
