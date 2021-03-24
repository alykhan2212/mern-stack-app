const express = require('express');
var router = express.Router();
let User = require('../models/user.model');


//Get users
router.get('/', function (req, res) {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err))

});

//Add user
router.post('/add', function (req, res) {
    const email = req.body.email;
    const newUser = User({email});
    
    newUser.save()
        .then(() => res.json('New User Added'))
        .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;