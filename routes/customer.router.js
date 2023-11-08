var express = require('express');
var router = express.Router();
const { createCustomer, findCustomer, listCustomer } = require('../controller');

router.get('/api/customer/create', async function (req, res) {
    req.body.nit = '06140307821050';
    await createCustomer(req)
    .then(customer =>res.status(200).send(customer.customerguid))
    .catch(error => res.status(400).send(error));
});

router.get('/api/customer/find', async function (req, res) {
    req.body.nit = '06140307821050';
    await findCustomer(req)
    .then(customer =>res.status(200).send(customer))
    .catch(error => res.status(400).send(error));
});

router.get('/api/customer/list', async function (req, res) {
    req.body.nit = '06140307821050';
    await listCustomer(req)
    .then(customer =>res.status(200).send(customer))
    .catch(error => res.status(400).send(error));
});


module.exports = router;



