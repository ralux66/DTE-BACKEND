//const { v4: uuidv4 } = require('uuid');
const bill = require('../models').bills;
const config = require('../config/config');
const { httpClient, uuid } = require('../utility')
const { ObjectBillDte } = require('../Entitys');
const axios = require('axios');
const { json } = require('body-parser');
const { stringify } = require('uuid');

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
            .findOne({
                where: {
                    Status: 'P',
                    customerguid: customer.customerguid,

                }
            })
            .then(bill => {
                //const dteSend = [];

                /* for (let index = 0; index < bill.length; index++) {
                    const element = bill[index];
                    dteSend.push(ObjectBillDte(customer, element));
                    //console.log(element);
                } */
                const dteSend = ObjectBillDte(customer, bill);

                //console.log(JSON.stringify(dteSend));
                /*  axios({
                     method: 'post',
                     url: config.FIRMADOR_LOCAL,
                     headers: { 'Content-Type': 'application/json' },
                     data: {
                         nit: customer.nit,
                         passwordPri: req.body.passwordPri,
                         dteJson: dteSend// This is the body part
                     }
                 }).then(resp => { console.log(resp) }).catch(error=>{console.log(error)}); */

                const postFIRMADTE = {
                    method: 'post',
                    url: config.FIRMADOR_LOCAL,
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        nit: customer.nit,
                        passwordPri: req.body.passwordPri,
                        dteJson: dteSend
                    }
                };

                httpClient.postplus(
                    postFIRMADTE
                ).then((FirmaAut) => {
                    const postAUTH_DTE = {
                        method: 'post',
                        url: config.AUTH_DTE,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: {
                            user: req.body.user,
                            pwd: req.body.password
                        }
                    };
                    httpClient.postplus(
                        postAUTH_DTE
                    ).then((authdte) => {
                        /*  const bodyDTE = {
                             ambiente: '00',
                             idEnvio: uuid(),
                             version: 1,
                             tipoDte: '01',
                             nitEmisor: customer.nit,
                             documento: FirmaAut.body, //DTE FIRMADO DGI
                             codigoGeneracion: uuid()
                         }; */

                        const postDTE = {
                            method: 'post',
                            url: config.RECEPCION_DTE,
                            headers: { Authorization: authdte.body.token, 'Content-Type': 'application/json' },
                            data: {
                                ambiente: '00',
                                idEnvio: Math.floor(Math.random() * 10),
                                version: 1,
                                tipoDte: '01',
                                //nitEmisor: customer.nit,
                                documento: FirmaAut.body, //DTE FIRMADO DGI
                                codigoGeneracion: uuid()
                            }
                        };


                        //console.log(JSON.stringify(postDTE));

                        /*  httpClient.postplus(
                             postDTE
                         ) */

                        httpClient.postplus(
                            JSON.stringify(postDTE)
                        ).then((lotedte) => {
                            console.log({ lotedte });
                        }).catch(error => { console.log({ error }) });


                    }).catch(error => console.log({ error }));
                });
            }).catch(error => res.status(400).send({ error }));
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
