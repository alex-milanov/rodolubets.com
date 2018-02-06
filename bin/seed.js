'use strict';

// lib
const mongoose = require('mongoose');
const restApi = require('iblokz-rest-api');
// prompt
const prompt = require('prompt');
prompt.start();
const get = (props) => new Promise((resolve, reject) =>
    prompt.get(props, (err, res) => err ? reject(err) : resolve(res)));

// data
const events = require('../data/events.json');

// db & model
const config = require('../server/config');
const db = mongoose.connect(config.db.uri);
restApi.loadModel(config.rest, db);
const User = require('../server/models/user');

const createAdmin = () => get([{
    name: 'password',
    type: 'string',
    hidden: true,
    replace: '*',
    description: 'Enter password   '
}, {
    name: 'confirmPass',
    type: 'string',
    hidden: true,
    replace: '*',
    description: 'Confirm password '
}])
    .then(({password, confirmPass}) => {
        if (password !== confirmPass) {
            console.log('Passwords mismatch!');
            return createAdmin();
        }
        const user = new User({
            name: 'Admin',
            email: 'admin',
            role: 'admin',
            active: true,
            password
        });
        user.save(function(err, res){
            if (err) console.log('Problem with saving admin', err);
            else console.log('Admin successfuly created', res);
        })
    });


// admin user
// .match(`/(y|yes|Y|Yes|YES)/i`)
get({name: 'addAdmin', description: 'Add admin y/N', default: 'n'})
    .then(
        ({addAdmin}) => (console.log({addAdmin}), (addAdmin === 'y' ? createAdmin() : {})),
        err => console.log(err)
    );