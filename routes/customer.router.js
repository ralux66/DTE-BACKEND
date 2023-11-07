var express = require('express');
var router = express.Router();

 
router.get('/api/customer/create', function (req, res) {
    //create(req, res);
    createOne(req, res);
    res.render('index', { title: 'createOne' });
});


module.exports = router;



