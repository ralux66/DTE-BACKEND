
const express = require('express');
const router = express.Router();
const { readExcel, GenerateCorrelativoDTE, GenerateCodigo } = require("../utility");
const { submitBill, listBill, findBill, findAndCountAll, findAndCountAllBill, createBill,
    createOneBill, BulkCreateBill, findCustomer } = require('../controller');

router.get('/api', (req, res) => res.status(200).send({
    message: '¡Esta es una buena señal! Nuestro Node.js está funcionando correctamente ;)',
}));

router.get('/api/bill/create', function (req, res) {
    //create(req, res);
    createOneBill(req, res);
    res.render('index', { title: 'createOne' });
});

router.get('/api/bill/list', function (req, res) {
    listBill(undefined, req, res);
});


router.get('/api/bill/find', async function (req, res) {
    req.body.Status = 'P';
    await findBill(req, res);
});



router.get('/api/bill/BulkCreate', function (req, res) {
    BulkCreateBill(req, res);
});

//alternativo
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


router.get('/api/bill/submitbill', async function (req, res) {
    req.body.companynit = '94501110101012';
    req.body.user = '94501110101012';
    req.body.password = 'SpiritAirline@2023';
    req.body.passwordPri = 'impuestos2016';
     
    await findCustomer(req)
        .then((customer) => {
            if (customer) {
                submitBill(req, res, customer)
                    .then((resp) => { res.status(200).send({ resp }) })
                    .catch(error => res.status(400).send({ error }));
            } else {
                res.status(200).send('No se encontro el customer');
            }
        })
        .catch(error => res.status(400).send(error));

});



module.exports = router;
