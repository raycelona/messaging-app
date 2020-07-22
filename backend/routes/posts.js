const express = require("express");
const router = express.Router();
const Post = require('../models/post');

router.post('', (req, res, next) => {
    const post = new Post({
       title: req.body.title,
       body: req.body.body
    });
    post.save().then(result => {
        res.status(201).json({
            message: post,
            id: result._id
        })
    });
});

router.get('', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Success',
            posts: documents
        });
    });
});

router.put('/:id', (req, res, next) => {
    const updatedPost = new Post({
        _id: req.body.id,
        title: req.body.title,
        body: req.body.body
    })
    Post.updateOne({_id: req.params.id}, updatedPost).then(result => {
        res.status(200).json({message: 'updated', updatedPost});
    })
})

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: 'Post not found'});
        }
    })
})

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'deleted'});
    })
});

module.exports = router;