const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/posts.model');
const User = require('../models/user.model');

//Get posts
router.get('/', (req, res, next) => {
    Post.find()
        .select('-__v -updatedAt')
        .populate('user', '-_id username email')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: err }))

});

//Find post by id
router.get('/:postId', (req, res, next) => {
    Post.findById(req.params.postId)
        .select('-__v -updatedAt')
        .populate('user', '-_id username email')
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

//Add post
router.post('/', (req, res, next) => {

    User.findById(req.body.userId)
        .then(userResponse => {
            if (userResponse) {
                const newPost = new Post({
                    _id: mongoose.Types.ObjectId(),
                    user: req.body.userId,
                    title: req.body.title,
                    category: req.body.category,
                    description: req.body.description
                });

                newPost.save()

                    .then(response => res.status(201).json({
                        message: 'post has been created successfully',
                        createdPost: {
                            _id: response._id,
                            userId: response.user,
                            title: response.title,
                            category: response.category,
                            description: response.description
                        }
                    }))
                    .catch(err => res.status(400).json({ error: err }));

            } else {
                res.status(400).json({ message: 'invalid user id' })
            }
        })
        .catch(err => res.status(400).json({ error: err }));

});

//update post
router.patch('/:postId', (req, res, next) => {
    Post.findById(req.params.postId)
        .then(response => {
            response.title = req.body.title ? req.body.title : response.title;
            response.category = req.body.category ? req.body.category : response.category;
            response.description = req.body.description ? req.body.description : response.description;

            response.save()
                .then(() => res.status(200).json({ message: 'post has been updated' }))
                .catch(err => res.status(400).json({ error: err }))
        })
        .catch(err => res.status(400).json({ error: err }));

});

//Find and delete post by id
router.delete('/:postId', (req, res, next) => {
    Post.findByIdAndDelete(req.params.postId)
        .then(() => res.status(200).json({ message: 'post has been deleted' }))
        .catch(err => res.status(400).json({ error: err }));

});

module.exports = router;