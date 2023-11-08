//const utility = require("../utility/readExcel")

const bill = require('../models').bills;
const customers = require('../models').customers;
const { httpClient } = require('../utility')
const { crearBillDte } = require('../Entitys');

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
    findOrCreateBill(req, res) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'Create a new game'


        const workbook_response = readExcel();
        workbook_response.forEach((element, index) => {
            //console.log(element);
            if (typeof element.RecLoc !== "undefined") {
                // Creamos el registro en la base de datos               
                return bill.findOrCreate(
                    {
                        where: { RecLoc: element.RecLoc ?? "" },
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
                    }
                ).then((bill) => bill.json());
            }
        });
        //return billObject ? res.status(200).send('OK'): res.status(400).send('Bad');
        //console.table('OTRO CONSOLE');
    },

    BulkCreateBill(req, res) {
        const workbook_response = utility.readExcelProcess();
        let objBill = [];
        var billsToCreate = [];
        //console.table(billsToCreate);

        /*  workbook_response.forEach((element, index) => {
             if (typeof element.RecLoc !== "undefined")
                 objBill[index] = {
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
         }); */





        //console.log(result);

        // Validate bill existence before bulk creating
        workbook_response.forEach((item, index) => {
            if (typeof item.RecLoc !== "undefined")
                objBill[index] =
                    bill.findOne({
                        where: {
                            //CompanyId: item.CompanyId,
                            RecLoc: item.RecLoc
                        }
                    }).then(element => {
                        // console.log(element);

                        if (element === null)
                            return ({
                                CompanyId: 1,
                                RecLoc: item.RecLoc,
                                SegSeqNbr: item.SegSeqNbr,
                                RecLoc: item.RecLoc,
                                SegSeqNbr: item.SegSeqNbr,
                                NbrOfPax: item.NbrOfPax,
                                ArcIata: item.ArcIata,
                                FirstName: item.FirstName,
                                LastName: item.LastName,
                                Email: 'ralux.zepeda@gmail.com',
                                BookingDate: item.BookingDate,
                                FlightDate: item.FlightDate,
                                SegmentOrigin: item.SegmentOrigin,
                                SegmentDest: item.SegmentDest,
                                Base: item.Base.toFixed(2),
                                CurrencyBase: item.CurrencyBase,
                                SV: item.SV.toFixed(2),
                                Status: 'P'
                            });
                    });
            // console.log(objBill);
        });
        /* console.log(billExists === null);
        return billExists === null; */

        //return !(await billExists(filterbill));

        //return ();




        console.log({ objBill });

        //create bulk
        return bill.bulkCreate(billsToCreate)
            .then(bill => res.status(200).send(bill))
            .catch(error => res.status(400).send(error));
    },

    createOneBill(req, res) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'Create a new game'
        let workbook_response = utility.readExcelProcess();
        workbook_response.forEach(element => {
            //console.log(element);
            if (typeof element.RecLoc !== "undefined") {
                return bill.create(
                    /* .findOrCreate({
                        where: {
                            RecLoc: element.RecLoc ?? "",
                        }, */
                    {
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
                ).then(bill => res.status(200).send(bill.ID));
                //.catch(error => res.status(400).send(error))
            }
        });
        //return 'Ok';
    },
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
    listBill(_, req, res) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'List all the games'
        return bill
            .findAll({})
            .then(bill => res.status(200).send(bill))
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
    async findBill(req, res) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'Find a game'
        return bill
            .findOne({
                where: {
                    Status: req.body.Status,
                }
            })
            .then(bill => res.status(200).send(bill))
            .catch(error => res.status(400).send(error))
    },

    async submitBill(req, res) {
        customers.findOne({
            where: {                 
                customerguid: req.body.customerguid
            }
        })
            .then(customers =>
                bill
                    .findOne({
                        where: {
                            Status: 'P',
                            customerguid: customers.customerguid
                        }
                    })
                    .then(bill =>{
                        console.log('Objeto: >>>>>' + crearBillDte(customers, bill))
                    })
                    .catch(error => res.status(400).send(error))
            )
            .catch(error => res.status(400).send(error));
    },

    async createBill(element) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'Create a new game'
        const response = await bill
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
