
const express = require('express');
const router = express.Router();
const { readExcel, GenerateCorrelativoDTE, GenerateCodigo, readExcelByName } = require("../utility");
const { submitBill, findBillByCompany,
    findAndCountAllBill, createBill,
    createOneBill, BulkCreateBill, findCustomer,submitAllBill } = require('../controller');
const path = require('path');
const multer = require('multer');
const { Console } = require('console');

const storage = multer.diskStorage({
    destination: 'public/FileExcel/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
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

router.post('/api/bill/findBillByCompany', async function (req, res) {
    //req.body.status = 'E';
    //res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    await findBillByCompany(req, res);
});

router.post('/api/bill/findAllPendingBillByCompany', async function (req, res) {
    //req.body.Status = 'E';

    await findBillByCompany(req, res);
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
router.post('/api/bill/submitbill', async function (req, res) {
    //console.log(req);
    /*   req.body.companynit = '94501110101012';
      req.body.user = '94501110101012';
      req.body.password = 'SpiritAirline@2023';
      req.body.passwordPri = 'impuestos2016'; */

    await findCustomer(req)
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

router.post('/api/bill/submitAllbill', async function (req, res) {
    //console.log(req);
    /*   req.body.companynit = '94501110101012';
      req.body.user = '94501110101012';
      req.body.password = 'SpiritAirline@2023';
      req.body.passwordPri = 'impuestos2016'; */

    await findCustomer(req)
        .then((customer) => {
            if (customer) {
                submitAllBill(req, res, customer)
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
    try {
        req.body.companynit = '94501110101012';
        findCustomer(req).then((customer) => {
            findAndCountAllBill(customer).then((bill) => {
                let lastBill = bill.count ?? 0;
                if (customer) {
                    //console.log('file name-->' + fileName);
                    if (typeof fileName !== "undefined") {
                        const workbook_response = readExcelByName(fileName);
                        for (const element of workbook_response) {
                            if (typeof element.RecLoc !== "undefined" && parseFloat(element.Base) > 0) {
                                lastBill += 1;
                                //const DTE_Control = GenerateCorrelativoDTE(customer.nrc, lastBill);
                                element.customerguid = customer.customerguid;
                                element.NumeroControl = GenerateCorrelativoDTE(customer.nrc, lastBill);
                                element.CodigoGeneracion = GenerateCodigo();
                                element.Base = parseFloat(element.Base);
                                element.SV = parseFloat(element.SV);
                                element.BookingDate =  new Date(element.BookingDate); 
                                element.FlightDate =  new Date(element.FlightDate);
                                //create bill on table
                                createBill(element, customer.correo);
                            }
                        }
                    }
                }
            });
        });

        //res.status(200).send('Fin del proceso');
        res.status(200).send('Fin del proceso');
    } catch (error) {
        console.log({ error });
        res.status(500).send('Error al crear los registros');
    }
    //console.log(req.file, req.body);
    //res.send(HttpEventType.Response);
    //res.status(200).send('Fin del proceso');
});



module.exports = router;
