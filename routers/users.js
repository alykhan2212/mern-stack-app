const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const User = require('../models/user.model');


//Get users
router.get('/', (req, res, next) => {
    User.find()
        .select('-__v -updatedAt')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: err }))

});

//Get users
router.post('/login', (req, res, next) => {
    
    User.findOne({ email: req.body.email })
        .then(response => {
            if (!response) {
                return res.status(401).json({ message: 'Auth failed' });
            }
            bcrypt.compare(req.body.password, response.password, (err, result) => {
                if (err) {
                    return res.status(401).json({ message: 'Auth failed' });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: response.email,
                            userId: response._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }

                    );

                    return res.status(200).json({ message: 'Auth successful', token: token });
                }
                res.status(401).json({ message: 'Auth failed' });
            });
            // res.status(200).json(response)
        })
        .catch(err => res.status(500).json({ error: err }))

});

//Find specific user
router.get('/:userId', (req, res, next) => {

    User.findById(req.params.userId)
        .select('-__v ')
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
router.post('/', (req, res, next) => {
    User.find({ email: req.body.email })
        .then(userFound => {
            if (userFound.length >= 1) {
                return res.status(409).json({
                    message: "email already exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const newUser = new User({
                            _id: mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                        });
                        newUser.save()
                            .then(response => res.status(201).json({
                                message: 'user has been created successfully',
                                createdUser: {
                                    _id: response._id,
                                    username: response.username,
                                    email: response.email,
                                    password: response.password,
                                    createdAt: response.createdAt
                                }
                            }))
                            .catch(err => res.status(400).json({ error: err }));
                    }
                })
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

//update user
// router.patch('/:userId', (req, res, next) => {
//     User.findById(req.params.userId)
//         .then(response => {

//             response.username = req.body.username ? req.body.username : response.username;
//             response.email = req.body.email ? req.body.email : response.email;

//             response.save()
//                 .then(() => res.status(200).json({
//                     message: 'user data has been updated successfully'
//                 }))
//                 .catch(err => res.status(400).json({ error: err }))
//         })
//         .catch(err => res.status(404).json({ error: err }));
// });

//Delete user
router.delete('/:userId', (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .then(response => {
            if (response.deletedCount > 0) {
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