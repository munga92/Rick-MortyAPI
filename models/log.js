'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = Schema({
    date: String,
    status: String,
    method: String,
    url_consulted: String
});

module.exports = mongoose.model('Artist', LogSchema);