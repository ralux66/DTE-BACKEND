
const express = require('express');
const router = express.Router();
const { readExcel } = require("../utility");
const { submitBill, list, find, createOne, BulkCreate, create } = require('../controller');

router.get('/api', (req, res) => res.status(200).send({
    message: '¡Esta es una buena señal! Nuestro Node.js está funcionando correctamente ;)',
}));

router.get('/api/bill/create', function (req, res) {
    //create(req, res);
    createOne(req, res);
    res.render('index', { title: 'createOne' });
});

router.get('/api/bill/list', function (req, res) {
    list(undefined,req, res);
});


router.get('/api/bill/find', async function (req, res) {
    req.body.Status = 'P';
    await find(req, res);
});

/* router.get('/api/bill/findOrCreate', function (req, res) {
    const workbook_response = readExcel();
    workbook_response.forEach((element) => {
        if (typeof element.RecLoc !== "undefined")
            create(element)
                .then((resp) => console.log({ resp }))
                .catch((error) => console.log({ error }))
               // .finally(() => res.send('Fin del proceso'));
    });
    res.send('Fin del proceso');
   
}); */

router.get('/api/bill/BulkCreate', function (req, res) {
    BulkCreate(req, res);
});

//alternativo
router.get('/api/bill/findOrCreate', async function (req, res) {
    try {
        const workbook_response = await readExcel();

        for (const element of workbook_response) {
            if (typeof element.RecLoc !== "undefined") {
                await create(element);
            }
        }

        res.send('Fin del proceso');
    } catch (error) {
        console.log({ error });
        res.status(500).send('Error al crear los registros');
    }
});


router.get('/api/bill/submitbill', async function (req, res) {
    req.body.Status = 'P';
    req.body.CompanyId = 1;
    await submitBill(req, res);
});



module.exports = router;
