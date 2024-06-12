var express = require('express');
var router = express.Router();
const { findUser } = require('../controller');
var md5 = require('js-md5');

/* router.get('/api/user/create', async function (req, res) {
    req.body.nit = '06140307821050';
    await createCustomer(req)
        .then(customer => res.status(200).send(customer.customerguid))
        .catch(error => res.status(400).send(error));
}); */

router.post('/api/user/getUserByPassword', function (req, res) {
    // console.log(req.body.password);
    findUser(req)
        .then((user) => {
            if (user) {
                if (md5(user.password) === req.body.password) {
                    user.password = md5(user.password);
                    res.status(200).send(user)
                } else {
                    res.status(200).send(null)
                }
            }

        })
        .catch(error => res.status(400).send(error));
});

/* router.get('/api/user/list', async function (req, res) {
    req.body.nit = '06140307821050';
    await listCustomer(req)
        .then(customer => res.status(200).send(customer))
        .catch(error => res.status(400).send(error));
});
 */

/* router.post('/api/user/allCustomer', function (req, res) {
    //req.body.nit = '06140307821050';
    listCustomer(req)
        .then(customer => res.status(200).send(customer))
        .catch(error => res.status(400).send(error));
}); */

module.exports = router;



