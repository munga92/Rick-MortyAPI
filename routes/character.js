'use strict'

var express = require('express');
var CharacterController = require('../controllers/character');

var api = express.Router();

api.get('/character', CharacterController.getCharacters);
api.get('/character/:id', CharacterController.getCharacter);

module.exports = api;