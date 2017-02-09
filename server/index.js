'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// lib
const path = require('path');

// express dep
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// db
const mongoose = require('mongoose');
// rest api
const restApi = require('iblokz-rest-api');
const restMap = require('./config/rest.json');

// init
const app = express();
const db = mongoose.connect('mongodb://localhost:27017/rod');

// express prefs
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.resolve(__dirname, '../dist')));

// loads the models from json schema
restApi.loadModel(restMap, db);

// load additional models
require('./models/user');

// initis rest endpoints
restApi.initRoutes(app, restMap, {}, db);

// Start the app by listening on <port>
app.listen('8080');

// Logging initialization
console.log('Express app started on port 8080');
