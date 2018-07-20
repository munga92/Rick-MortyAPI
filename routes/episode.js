'use strict'

var express = require('express');
var EpisodeController = require('../controllers/episode');

var api = express.Router();

api.get('/episode', EpisodeController.getEpisodes);
api.get('/episode/:id', EpisodeController.getEpisode);

module.exports = api;