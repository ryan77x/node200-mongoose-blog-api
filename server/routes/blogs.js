const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/featured', (req, res) => {
    Blog
        .find()
        .where('featured')
        .equals(true)
        .then(blogs => {
            res.status(200).json(blogs);
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
            if (!blog){ res.status(404).json({"Status": "Not found" }); }
            else{ res.status(200).json(blog); }
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/', (req, res) => {
    let dbUser = null;

    User
        .findById(req.body.author)
        .then(user => {
            if (!user){ return  null;  }
            else{
                dbUser = user;
                const newBlog = new Blog(req.body);
                newBlog.author = user._id;

                return newBlog.save();
            }
        })
        .then(blog => {
            if (!blog){ 
                res.status(404).json({"Status": "User (author) reference not found" }); 
            }
            else{
                dbUser.blogs.push(blog);
                dbUser.save().then(() => res.status(201).json(blog));
            }
        })
        .catch(err => {
            console.log(err);
        });
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, req.body)
        .then( (blog)=> {
            if (!blog){ res.status(404).json({"Status": "Not found" }); }
            else{ res.status(204).json({"Status": "Update ok"}); }
        })
        .catch(err => {
            console.log(err);
        });
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then( (blog)=> {
            if (!blog){ res.status(404).json({"Status": "Not found" }); }
            else{ res.status(200).json(blog); }
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;