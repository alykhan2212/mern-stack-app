const express = require('express');
var router = express.Router();

//Get posts
router.get('/', function (req, res, next) {

    res.status(200).json({
        message: "Welcome to the API"
    });

});

module.exports = router;