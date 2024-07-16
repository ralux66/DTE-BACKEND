
const express = require('express');
const router = express.Router();
const { readExcel, GenerateCorrelativoDTE, GenerateCodigo, readExcelByName } = require("../utility");
const {
    submitBill,
    findBillByCompany,
    findAndCountAllBill,
    createBill,
    createOneBill,
    BulkCreateBill,
    findCustomer,
    submitAllBill,
    anularDte,
    contingenciaDte } = require('../controller');
const path = require('path');
const multer = require('multer');
const moment = require('moment-timezone');


const storage = multer.diskStorage({
    destination: 'public/FileExcel/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.originalname + '_' + uniqueSuffix);
        //cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage });

router.get('/api', (req, res) => res.status(200).send({
    message: '¡Esta es una buena señal! Nuestro Node.js está funcionando correctamente ;)',
}));

//PASO 2
router.get('/api/bill/create', function (req, res) {
    //create(req, res);
    createOneBill(req, res);
    res.render('index', { title: 'createOne' });
});

/* router.get('/api/bill/list', function (req, res) {
    listBill(undefined, req, res);
}); */


/* router.get('/api/bill/find', async function (req, res) {
    req.body.Status = 'E';
    await findBill(req, res).then(result => {
        return result;
    });
}); */

router.post('/api/bill/findBillByCompany', function (req, res) {
    //req.body.status = 'E';
    //res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    findBillByCompany(req, res);
});

router.post('/api/bill/findAllPendingBillByCompany', function (req, res) {
    //req.body.Status = 'E';

    findBillByCompany(req, res);
});

router.get('/api/bill/BulkCreate', function (req, res) {
    BulkCreateBill(req, res);
});

//CREAR BILL CON NUMERO DTE
router.get('/api/bill/findOrCreate', async function (req, res) {
    try {
        req.body.nit = '94501110101012';
        await findCustomer(req).then((customer) => {
            findAndCountAllBill(customer).then((bill) => {
                //console.log(bill.count);
                let lastBill = bill.count ?? 0;
                if (customer) {
                    const workbook_response = readExcel();
                    for (const element of workbook_response) {
                        if (typeof element.RecLoc !== "undefined" && parseFloat(element.Base) > 0) {
                            lastBill += 1;
                            //const DTE_Control = GenerateCorrelativoDTE(customer.nrc, lastBill);
                            element.customerguid = customer.customerguid;
                            element.NumeroControl = GenerateCorrelativoDTE(customer.nrc, lastBill);
                            element.CodigoGeneracion = GenerateCodigo();
                            element.Base = parseFloat(element.Base);
                            element.SV = parseFloat(element.SV);
                            //create bill on table
                            createBill(element, customer.correo);
                        }
                    }
                }
            });
        });

        res.send('Fin del proceso');
    } catch (error) {
        console.log({ error });
        res.status(500).send('Error al crear los registros');
    }
});

//PASO 3
router.post('/api/bill/submitbill', function (req, res) {
    //console.log(req); submitbill
    /*   req.body.companynit = '94501110101012';
      req.body.user = '94501110101012';
      req.body.password = 'SpiritAirline@2023';
      req.body.passwordPri = 'impuestos2016'; */

    findCustomer(req)
        .then((customer) => {
            if (customer) {
                submitBill(req, res, customer)
                    .then((resp) => { res.status(200).send({ resp }) })
                    .catch(error => { res.status(400).send({ error }) });
            } else {
                res.status(200).send('No se encontro el customer');
            }
        })
    //.catch(error => res.status(400).send(error));

});

router.post('/api/bill/submitAllbill', function (req, res) {
    //console.log(req);
    /*   req.body.companynit = '94501110101012';
      req.body.user = '94501110101012';
      req.body.password = 'SpiritAirline@2023';
      req.body.passwordPri = 'impuestos2016'; */

    findCustomer(req)
        .then(async (customer) => {
            if (customer) {
                let queryOptions = {};
                // Si emailFilter tiene un valor, agregar el filtro
                if (req.body.NumeroControl.length > 0) {
                    queryOptions.where = {
                        Status: req.body.status,
                        customerguid: customer.customerguid,
                        NumeroControl: req.body.NumeroControl
                    };
                } else {
                    queryOptions.where = {
                        Status: req.body.status,
                        customerguid: customer.customerguid
                    };
                }
                await submitAllBill(req, customer, queryOptions)
                    .then((resp) => { res.status(200).send({ resp }) })
                    .catch(error => { res.status(400).send({ error }) });
            } else {
                res.status(200).send('No se encontro el customer');
            }
        })
    //.catch(error => res.status(400).send(error));

});



/* router.post('/api/bill/uploadFile', function (req, res) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    uploadFile(req, res);
}); */

//PASO 1 AND SET ON TABLE
router.post('/api/bill/uploadFile', upload.single('file'), function (req, res, next) {
    const fileName = req.file?.filename;
    const customerguid = fileName.split('_')[0];
    req.body.customerguid = customerguid;
    let contadorFileasDoc = 0;

    try {
        //req.body.companynit = '94501110101012';
        findCustomer(req).then((customer) => {
            findAndCountAllBill(customer).then(async (bill) => {
                //let lastBill = bill.count ?? 0;
                let lastBill = bill ? bill.NumeroControl.split('-')[3] : 0; //DTE-01-02075433-000000000000201
                //console.log('split--> '+lastBill);
                lastBill = +lastBill;


                if (customer) {
                    //console.log('file name-->' + fileName);
                    if (typeof fileName !== "undefined") {
                        const loteTransaction = customer.nrc + '-' + Date.now().toString();
                        const workbook_response = readExcelByName(fileName);
                        for (const element of workbook_response) {
                            if (typeof element.RecLoc !== "undefined" && parseFloat(element.Base) > 0 && lastBill) {
                                contadorFileasDoc += 1;
                                lastBill += 1;

                                let partes = element.BookingDate.split('/'); //26/06/2024
                                let parteFlight = element.FlightDate.split('/');
                                //const DTE_Control = GenerateCorrelativoDTE(customer.nrc, lastBill);
                                element.customerguid = customer.customerguid;
                                element.NumeroControl = GenerateCorrelativoDTE(customer.nrc, lastBill);
                                element.CodigoGeneracion = GenerateCodigo();
                                element.Base = parseFloat(element.Base);
                                element.SV = parseFloat(element.SV);
                                ///YYYY-MM-DD DB new Date(Date.UTC(2018, 11, 1, 0, 0, 0));
                                element.BookingDate = moment.tz(`${partes[2]}-${partes[1]}-${partes[0]}`, 'YYYY-MM-DD', 'America/Mexico_City');
                                element.FlightDate = moment.tz(`${parteFlight[2]}-${parteFlight[1]}-${parteFlight[0]}`, 'YYYY-MM-DD', 'America/Mexico_City');

                                /* element.BookingDate = new Date(element.BookingDate);
                                element.FlightDate = new Date(element.FlightDate); */


                                element.BatchTransaction = loteTransaction;
                                //create bill on table
                                await createBill(element, customer.correo);
                              /*   createBill(element, customer.correo).then(result => {
                                    //console.log('Bill Create' + { result });
                                    resumFile = { "loteTransaction": loteTransaction, "contadorFileasDoc": contadorFileasDoc }
                                }); */
                            }
                        }
                    }
                }
            });
        });


        //res.status(200).send('Fin del proceso');
        res.status(200).send({
            endProces: true,
            reportProgress: true,
            observe: 'events'//now when you will subscribe you will get the events, in his case he neded responseType: 'blob', because from the back end he was receiving the blob too.
        });
    } catch (error) {
        console.log({ error });
        res.status(500).send('Error al crear los registros');
    }
    //console.log(req.file, req.body);
    //res.send(HttpEventType.Response);
    //res.status(200).send('Fin del proceso');
});


router.post('/api/bill/anulardte', function (req, res) {
    findCustomer(req)
        .then((customer) => {
            if (customer) {
                anularDte(req, customer)
                    .then((resp) => { res.status(200).send({ resp }) })
                    .catch(error => { error.status(400).send({ error }) });
            } else {
                res.status(200).send('No se encontro el customer');
            }
        })
});

router.post('/api/bill/contingencia', async function (req, res) {
    await findCustomer(req)
        .then(async (customer) => {
            if (customer) {
                await contingenciaDte(req, customer)
                    .then((resp) => { res.status(200).send({ resp }) })
                    .catch(error => { res.status(400).send({ error }) });
            } else {
                res.status(200).send('No se encontro el customer');
            }
        })
});


module.exports = router;
