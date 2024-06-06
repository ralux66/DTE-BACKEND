//const { v4: uuidv4 } = require('uuid');
const bill = require('../models').bills;
const logs = require('../models').logs;
const config = require('../config/config');
const { httpClient, uuid } = require('../utility')
const { ObjectBillDte } = require('../Entitys');
const axios = require('axios');



module.exports = {
    /*   uploadFile(req, res){
          const storageData = multer.diskStorage({
              destination: function (req, file, cb) {
                cb(null, 'public/FileExcel')
              },
              filename: function (req, file, cb) {
                cb(null, file.originalname)
              }
            });
            
            const upload = multer({ storageData: storage });
            return upload.single('file').res.status(200).json({ message: 'File uploaded successfully' });
      }, */
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
        const workbook_response = utility.readExcelProcess(); //read excel public File
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




        //console.log({ objBill });

        //create bulk
        return bill.bulkCreate(billsToCreate)
            .then(bill => res.status(200).send(bill))
            .catch(error => res.status(400).send(error));
    },

    createOneBill(req, res) {
        let workbook_response = utility.readExcelProcess(); //read excel public file
        workbook_response.forEach(element => {
            if (typeof element.RecLoc !== "undefined" && element.Base > 0) {
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
                ).then(bill => res.status(200).send(bill.ID))
                    .catch(error => res.status(400).send(error));
            }
        });
        //return 'Ok';
    },

    findAndCountAllBill(customer) {
        return bill
            .findAndCountAll({
                where: {
                    customerguid: customer.customerguid,
                }
            });
    },

    findBillByCompany(req, res) {
        return bill
            .findAll({
                where: {
                    Status: req.body.status,
                    customerguid: req.body.customerguid
                },
                order: [
                    ['NumeroControl', 'DESC'],
                    ['createdAt', 'DESC']
                ]
            })
            .then(bill => res.send(bill))
            .catch(error => res.status(400).send(error))
    },

    submitBill(req, res, customer) {
        return bill
            .findAll({
                where: {
                    Status: req.body.status,
                    customerguid: customer.customerguid,
                    NumeroControl: req.body.NumeroControl
                }
            })
            .then(billResult => {
                if (billResult) {
                    for (let index = 0; index <= billResult.length - 1; index++) {
                        const element = billResult[index];
                        const json_value_dte = ObjectBillDte(customer, element, index + 1);

                        const postFIRMADTE = {
                            method: 'post',
                            url: process.env.FIRMADOR_LOCAL,
                            headers: { 'Content-Type': 'application/json' },
                            data: {
                                nit: customer.nit,
                                passwordPri: req.body.passwordfirmardocumento,
                                dteJson: json_value_dte //dteSend
                            }
                        };

                        httpClient.postplus(
                            postFIRMADTE
                        ).then((FirmaAut) => {
                            const postAUTH_DTE = {
                                method: 'post',
                                url: process.env.AUTH_DTE,
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                data: {
                                    user: req.body.userapi,
                                    pwd: req.body.passwordauth
                                }
                            };
                            httpClient.postplus(
                                postAUTH_DTE
                            ).then((authdte) => {

                                // console.log('auth-->' + authdte.body.token);
                                if (authdte) {
                                    axios({
                                        method: 'post',
                                        url: process.env.RECEPCION_DTE, //config.RECEPCION_DTE,config.LOTE_DTE
                                        headers: { Authorization: authdte.body.token, 'Content-Type': 'application/json' },
                                        data: {
                                            ambiente: '00',
                                            idEnvio: Math.floor(Math.random() * 10),
                                            version: 1,
                                            tipoDte: '01',
                                            documento: FirmaAut.body,
                                            //nitEmisor: customer.nit,
                                            //documentos: FirmaAut.body,
                                            codigoGeneracion: uuid()
                                        }
                                    }).then(async resp => {
                                        // console.log('response-->' + resp);

                                        element.Status = 'E';
                                        element.SubmitDte = new Date();
                                        element.save();
                                        //updateBill(element, customer); //UPDATE BILL
                                    }).catch((error) => {
                                        let observacionesDTE = '';
                                        //se crea el log del error.
                                        //warning del caso
                                        error.response?.data?.observaciones?.forEach(item => {
                                            observacionesDTE += item + ", ";
                                            //console.log(item)
                                        });

                                        logs.create({
                                            companyguid: customer.customerguid,
                                            fecha_hora: new Date(),
                                            nive: 'RECEPCION_DTE',
                                            origen: 'DTE-SUBMIT', //JSON.stringify(json_value_dte),
                                            mensaje: observacionesDTE.length > 0 ? observacionesDTE : error?.response?.data?.descripcionMsg ?? error,
                                            datos: element.NumeroControl
                                        });

                                        console.log(error.response?.data?.descripcionMsg);
                                        console.log(error.response?.data);
                                    });
                                } else {
                                    logs.create({
                                        companyguid: customer.customerguid,
                                        fecha_hora: new Date(),
                                        nive: 'AUTH_DTE',
                                        origen: 'authdte.body.token', //JSON.stringify(json_value_dte),
                                        mensaje: 'Token null no se autentico',
                                        datos: element.NumeroControl
                                    });
                                }
                            })
                            //.catch(error => res.status(400).send({ error }));
                        })
                        //.catch(error => res.status(500).send(error))
                    };
                } else {
                    logs.create({
                        companyguid: customer.customerguid,
                        fecha_hora: new Date(),
                        nive: 'find bill',
                        origen: 'DTE-FIND-BILL', //JSON.stringify(json_value_dte),
                        mensaje: 'Bill no encontrados-- > billResult ' + billResult.length,
                        datos: 'NA'
                    });
                };
            })
        //.catch(error => res.status(500).send(error))
    },

     submitAllBill(req, res, customer) {
        return  bill
            .findAll({
                where: {
                    Status: req.body.status,
                    customerguid: customer.customerguid,
                    // NumeroControl: req.body.NumeroControl
                }
            })
            .then(billResult => {
                if (billResult) {
                    for (let index = 0; index <= billResult.length - 1; index++) {
                        const element = billResult[index];
                        const json_value_dte = ObjectBillDte(customer, element, index + 1);

                        const postFIRMADTE = {
                            method: 'post',
                            url: process.env.FIRMADOR_LOCAL,
                            headers: { 'Content-Type': 'application/json' },
                            data: {
                                nit: customer.nit,
                                passwordPri: req.body.passwordfirmardocumento,
                                dteJson: json_value_dte //dteSend
                            }
                        };

                        httpClient.postplus(
                            postFIRMADTE
                        ).then((FirmaAut) => {
                            const postAUTH_DTE = {
                                method: 'post',
                                url: process.env.AUTH_DTE,
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                data: {
                                    user: req.body.userapi,
                                    pwd: req.body.passwordauth
                                }
                            };
                            httpClient.postplus(
                                postAUTH_DTE
                            ).then((authdte) => {

                                // console.log('auth-->' + authdte.body.token);
                                if (authdte) {
                                    axios({
                                        method: 'post',
                                        url: process.env.RECEPCION_DTE, //config.RECEPCION_DTE,config.LOTE_DTE
                                        headers: { Authorization: authdte.body.token, 'Content-Type': 'application/json' },
                                        data: {
                                            ambiente: '00',
                                            idEnvio: Math.floor(Math.random() * 10),
                                            version: 1,
                                            tipoDte: '01',
                                            documento: FirmaAut.body,
                                            //nitEmisor: customer.nit,
                                            //documentos: FirmaAut.body,
                                            codigoGeneracion: uuid()
                                        }
                                    }).then(async resp => {
                                        //console.log('response-->' + resp);

                                        element.Status = 'E';
                                        element.SubmitDte = new Date();
                                        element.save();
                                        //updateBill(element, customer); //UPDATE BILL
                                    }).catch((error) => {
                                        let observacionesDTE = '';
                                        //se crea el log del error.
                                        //warning del caso
                                        error.response?.data?.observaciones?.forEach(item => {
                                            observacionesDTE += item + ", ";
                                            //console.log(item)
                                        });

                                        logs.create({
                                            companyguid: customer.customerguid,
                                            fecha_hora: new Date(),
                                            nive: 'RECEPCION_DTE',
                                            origen: 'DTE-SUBMIT', //JSON.stringify(json_value_dte),
                                            mensaje: observacionesDTE.length > 0 ? observacionesDTE : error?.response?.data?.descripcionMsg ?? error,
                                            datos: element.NumeroControl
                                        });

                                        /*  console.log(error.response?.data?.descripcionMsg);
                                         console.log(error.response?.data); */
                                    });
                                } else {
                                    logs.create({
                                        companyguid: customer.customerguid,
                                        fecha_hora: new Date(),
                                        nive: 'AUTH_DTE',
                                        origen: 'authdte.body.token', //JSON.stringify(json_value_dte),
                                        mensaje: 'Token null no se autentico',
                                        datos: element.NumeroControl
                                    });
                                }
                            })
                            //.catch(error => res.status(400).send({ error }));
                        })
                        //.catch(error => res.status(500).send(error))
                    };
                } else {
                    logs.create({
                        companyguid: customer.customerguid,
                        fecha_hora: new Date(),
                        nive: 'find bill',
                        origen: 'DTE-FIND-BILL', //JSON.stringify(json_value_dte),
                        mensaje: 'Bill no encontrados-- > billResult ' + billResult.length,
                        datos: 'NA'
                    });
                };
            })
        //.catch(error => res.status(500).send(error))
    },

    async updateBill(element, customer) {
        await User.update(
            { Status: 'E' },
            {
                where: {
                    NumeroControl: element.NumeroControl,
                    CodigoGeneracion: element.CodigoGeneracion,
                    customerguid: customer.customerguid
                },
            },
        );
    },
    createBill(element, email) {
        const response = bill
            .findOrCreate({
                where: {
                    //RecLoc: element.RecLoc ?? "",
                    CodigoGeneracion: element.CodigoGeneracion ?? "",
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
                    Email: email, //customer correo
                    BookingDate: element.BookingDate,
                    FlightDate: element.FlightDate,
                    SegmentOrigin: element.SegmentOrigin,
                    SegmentDest: element.SegmentDest,
                    Base: element.Base,
                    CurrencyBase: element.CurrencyBase,
                    SV: element.SV,
                    Status: 'P', // pendiente de enviar hacienda
                    NumeroControl: element.NumeroControl,
                    CodigoGeneracion: element.CodigoGeneracion,
                    SubmitDte: null,
                    BatchTransaction: element.BatchTransaction
                }
            });
        //throw new Error('Error al crear el registro');
        return response;
        /* .then((bill) =>  bill)
        .catch((error) => error) */
    },
}
