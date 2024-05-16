var express = require('express');
var router = express.Router();
const { listlogsbycompanyguid } = require('../controller');

router.post('/api/logs/listlogbycompanyguid', async function (req, res) {   
    //req.body.companyguid= '123e4567-e89b-12d3-a456-426655440000';
    await listlogsbycompanyguid(req)
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
});


module.exports = router;



