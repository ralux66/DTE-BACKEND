const { v4: uuidv4 } = require('uuid');

const bill = require('../models').bills;
//const customers = require('../models').customers;
const { httpClient } = require('../utility')
const { ObjectBillDte } = require('../Entitys');

module.exports = {
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
        let workbook_response = utility.readExcelProcess();
        workbook_response.forEach(element => {
            if (typeof element.RecLoc !== "undefined") {
                return bill.create({
                    customerguid: 1,
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
                )
                    .then(bill => res.status(200).send(bill.ID))
                    .catch(error => res.status(400).send(error));
            }
        });
        //return 'Ok';
    },

    listBill(_, req, res) {
        // #swagger.tags = ['Games'];
        // #swagger.description = 'List all the games'
        return bill
            .findAll({})
            .then(bill => res.status(200).send(bill))
            .catch(error => res.status(400).send(error))
    },

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

    async submitBill(req, res, customer) {
        return await bill
            .findAll({
                where: {
                    Status: 'P',
                    customerguid: customer.customerguid,

                }
            })
            .then(bill => {
                const dteSend = [];

                for (let index = 0; index < bill.length; index++) {
                    const element = bill[index];
                    dteSend.push(ObjectBillDte(customer, element));
                    //console.log(element);
                }

                console.log(JSON.stringify(dteSend));

                httpClient.post('https://apitest.dtes.mh.gob.sv/seguridad/auth',
                    {
                        params: {
                            user: req.body.user,
                            pwd: req.body.password
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
                        }
                    }).then((result) => {
                        const headerDTE = {
                            Authorization: result.body.token,
                            'Content-Type': 'application/json',
                            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
                        };

                        const bodyDTE = {
                            ambiente: '00',
                            idEnvio: uuidv4(),
                            version: 1,
                            tipoDte: '01',
                            nitEmisor: customer.nit,
                            documento: JSON.stringify(dteSend),
                            codigoGeneracion: uuidv4()
                        }
                        /*
                        Header-->
                        Authorization
                        User-Agent
                        content-Type - application/JSON
        
                        Body-->
                        ambiente 00 Prueba 01 Prod
                        idEnvio
                        version
                        tipoDte
                        documento JSON DTE
                        codigoGeneracion
                        */
                        //https://apitest.dtes.mh.gob.sv/fesv/recepcionlote/
                        //httpClient.post('https://apitest.dtes.mh.gob.sv/fesv/recepciondte', { params: bodyDTE },
                        httpClient.post('https://apitest.dtes.mh.gob.sv/fesv/recepcionlote/', { params: bodyDTE },
                            {
                                headers: {
                                    headerDTE
                                    //Authorization: result.body.token,
                                }
                            }).then((res) => {
                                console.table({ res });
                            }).catch(error => { console.log({ error }) });
                    }).catch(error => console.log({ error }));

            })
        //.catch(error => res.status(400).send(error));

    },

    async createBill(element) {
        const response = await bill
            .findOrCreate({
                where: {
                    RecLoc: element.RecLoc ?? "",
                },
                defaults: {
                    customerguid: element.customerguid,
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
