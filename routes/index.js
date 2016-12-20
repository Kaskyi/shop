var router = require('express').Router();
var path = require('path');

router.get('/*', function(req, res) {
    return res.sendFile(path.join(__dirname ,'../public/index.html'));
});

module.exports = router;
