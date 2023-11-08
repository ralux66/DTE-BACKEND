
const express = require('express');
const router = express.Router();
const { readExcel } = require("../utility");
const { submitBill, listBill, findBill, createOneBille, BulkCreateBille, createBill, findBill, createOneBill, BulkCreateBill } = require('../controller');

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
        const workbook_response = await readExcel();

        for (const element of workbook_response) {
            if (typeof element.RecLoc !== "undefined") {
                await createBill(element);
            }
        }

        res.send('Fin del proceso');
    } catch (error) {
        console.log({ error });
        res.status(500).send('Error al crear los registros');
    }
});


router.get('/api/bill/submitbill', async function (req, res) {
    req.body.nit = '06140307821050';
    await findCustomer(req)
        .then(customer => {
            if (customer) {
                req.body.customerguid = customer.customerguid;
                submitBill(req, res);
            } else {
                res.status(200).send('No se encontro el customer');
            }
        })
        .catch(error => res.status(400).send(error));

});



module.exports = router;
