const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/featured', (req, res) => {
    Blog
        .find()
        .where('featured')
        .equals(true)
        .then(blog => {
            res.status(200).json(blog);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blog => {
            res.status(200).json(blog);
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/', (req, res) => {
    const newBlog = new Blog(req.body);
    newBlog.save()
    .then(result => {
        res.status(200).json(result);
        console.log('Blog is saved');
    })
    .catch(err => {
        console.log(err);
    });
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, req.body)
        .then( (result)=> {
            res.status(200).json({"Status": "ok"});
            console.log('Blog is updated');
        })
        .catch(err => {
            console.log(err);
        });
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then( (result)=> {
            res.status(200).json(result);
            console.log('Blog is removed or not found');
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;