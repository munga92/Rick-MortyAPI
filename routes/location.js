'use strict'

var express = require('express');
var LocationController = require('../controllers/location');

var api = express.Router();

api.get('/location', LocationController.getLocations);
api.get('/location/:id', LocationController.getLocation);

module.exports = api;