//const utility = require("../utility/readExcel")

const customer = require('../models').customers;
const { httpClient } = require('../utility')
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
    list(_, req, res) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'List all the games'
        return customer
            .findAll({})
            .then(customer => res.status(200).send(customer))
            .catch(error => res.status(400).send(error))
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
    async find(req, res) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'Find a game'
        return customer
            .findOne({
                where: {
                    Status: req.body.Status,
                }
            })
            .then(customer => res.status(200).send(customer))
            .catch(error => res.status(400).send(error))
    },

    async submitBill(req, res) {
        customers.findOne({
            where: {
                Status: req.body.Status,
                customerguid: req.body.customerguid
            }
        })
            .then(customers =>
                customer
                    .findOne({
                        where: {
                            Status: 'P',
                            CompanyId: customers.id
                        }
                    })
                    .then(customer => console.log('Objeto: >>>>>' + crearBillDte(customers, customer)))
                    .catch(error => res.status(400).send(error))
            )
            .catch(error => res.status(400).send(error));
    },

    async create(element) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'Create a new game'
        const response = await customer
            .findOrCreate({
                where: {
                    RecLoc: element.RecLoc ?? "",
                },
                defaults: {
                    CompanyId: 1,
                    RecLoc: element.RecLoc,
                    SegSeqNbr: element.SegSeqNbr,
                    RecLoc: element.RecLoc,
                    SegSeqNbr: element.SegSeqNbr,
                    NbrOfPax: element.NbrOfPax,
                    ArcIata: element.ArcIata,
                    FirstName: element.FirstName,
                    LastName: element.LastName,
                    Email: 'ralux.zepeda@gmail.com',
                    BookingDate: element.BookingDate,
                    FlightDate: element.FlightDate,
                    SegmentOrigin: element.SegmentOrigin,
                    SegmentDest: element.SegmentDest,
                    Base: element.Base.toFixed(2),
                    CurrencyBase: element.CurrencyBase,
                    SV: element.SV.toFixed(2),
                    Status: 'P'
                }
            });
        //throw new Error('Error al crear el registro');
        return response;
        /* .then((bill) =>  bill)
        .catch((error) => error) */
    },
}
