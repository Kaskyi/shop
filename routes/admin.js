var path = require('path');
var router = require('express').Router();

router.get('/*', function(req, res) {
    return res.sendFile(path.join(__dirname ,'../private/index.html'));
});

module.exports = router;
