var path = require('path');
var router = require('express').Router();

router.get('/*', function(req, res) {
    return res.end('OAUTH 2');
});

module.exports = router;
