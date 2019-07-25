const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
    .then(result => {
        res.status(200).json(result);
        console.log('User is saved');
    })
    .catch(err => {
        console.log(err);
    });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then( (result)=> {
            res.status(200).json({"Status": "ok"});
            console.log('User is updated');
        })
        .catch(err => {
            console.log(err);
        });
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then( (result)=> {
            res.status(200).json(result);
            console.log('User is removed or not found');
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;