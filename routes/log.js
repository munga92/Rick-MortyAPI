'use strict'

var express = require('express');
var LogController = require('../controllers/log');

var api = express.Router();

api.get('/log', LogController.getLogs);


module.exports = api;