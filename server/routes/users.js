const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            res.status(200).json(user);
        });
});

router.post('/', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(result => {
            console.log('User is saved');
        });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, {email: ''})
        .then( ()=> {
            console.log('User is updated');
        });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then( ()=> {
            console.log('User is removed');
        });
});

module.exports = router;