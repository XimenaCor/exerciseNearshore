'use strict'
var userSchema = require('../models/user');

function save(req, res) {
    var user = new userSchema();
    var params = req.body;

    user.amount = 0;
    user.email = params.email;

    user.save().then(data => {
        res.status(200).send({ user: data });
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
}

function verifyEmail(req, res) {
    var emailUser = req.params.email;
    userSchema.findOne({ 'email': emailUser }).exec().then(data => {
        if (data) {
            res.status(200).send({ user: data });
        }
    }).catch(err => {
        res.status(500).send(err);
    })
}

function updateAmountFirstTime(req, res) {
    var email = req.params.email;
    var user = req.body;
    userSchema.findById(email).exec().then(data => {
        if (data.amount = 0) {
            userSchema.findByIdAndUpdate(email, user).exec().then(data => {
                res.status(200).send({ user: data });
            }).catch(err => {
                res.status(500).send(err);
            });
        } else {
            res.status(500).send(err);
        }
    }).catch(err => {
        res.status(500).send(err);
    });

}

module.exports = {
    save,
    verifyEmail,
    updateAmountFirstTime
}