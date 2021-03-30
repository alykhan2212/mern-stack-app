const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
let User = require('../models/user.model');


//Get users
router.get('/', function (req, res, next) {
    User.find()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: err }))

});

//Find specific user
router.get('/:userId', function (req, res, next) {

    User.findById(req.params.userId)
        .then(response => {
            if (response) {
                res.status(200).json(response)
            } else {
                res.status(400).json({
                    message: "no results found"
                })
            }
        })
        .catch(err => res.status(404).json({ error: err }))
});


//Add user
router.post('/', function (req, res, next) {

    const newUser = new User({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        email: req.body.email
    });
    newUser.save()
        .then(() => res.status(200).json({
            message: 'user has been created successfully',
            createdUser: newUser
        }))
        .catch(err => res.status(400).json({ error: err }));
});

//update user
router.patch('/:userId', function (req, res, next) {
    User.findById(req.params.userId)
        .then(response => {
            response.username = req.body.username;
            response.email = req.body.email;

            response.save()
                .then(() => res.status(200).json({
                    message: 'user data has been updated successfully'
                }))
                .catch(err => res.status(400).json({ error: err }))
        })
        .catch(err => res.status(404).json({ error: err }));
});

//Delete user
router.delete('/:userId', function (req, res, next) {
    User.deleteOne({ _id: req.params.userId })
        .then(resp => {
            if (resp.deletedCount > 0) {
                res.status(200).json({
                    message: 'user has been deleted successfully'
                })
            } else {
                res.status(400).json({
                    message: 'you are trying to delete non existing data'
                })
            }

        })
        .catch(err => res.status(400).json({ error: err }));
});




module.exports = router;