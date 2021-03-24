const express = require('express');
var router = express.Router();
let Post = require('../models/posts.model');


//Get posts
router.get('/', function (req, res) {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error ' + err));

});

//Add post
router.post('/add', function (req, res) {
    const email = req.body.email;
    const description = req.body.description;

    const newPost = Post({ email, description});
    
    newPost.save()
        .then(() => res.json('New Post Added'))
        .catch(err => res.status(400).json('Error ' + err));
});

//Find post by id
router.get('/:id', function (req, res) {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error ' + err));

});

//Find and delete post by id
router.delete('/:id', function (req, res) {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json("Deleted"))
        .catch(err => res.status(400).json('Error ' + err));

});


//update post
router.put('/update/:id', function (req, res) {
    Post.findById(req.params.id)
        .then(posts => {
            posts.description = req.body.description;

            posts.save()
            .then(() => res.json('Post updated'))
            .catch(err => res.status(400).json('Error ' + err))
        })
        .catch(err => res.status(400).json('Error ' + err));
    
});

module.exports = router;