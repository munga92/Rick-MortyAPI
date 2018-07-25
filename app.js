'use strict'

// init of express(http requests) & bodyParser (request middleware)

var express = require('express');
var bodyParser = require('body-parser');


var app = express();

//load routes

var character_routes = require('./routes/character');
var location_routes = require('./routes/location');
var episode_routes = require('./routes/episode');
var log_routes = require('./routes/log');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//config http headers
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//base routes

app.use('/api', character_routes);
app.use('/api', location_routes);
app.use('/api', episode_routes);
app.use('/api', log_routes);



module.exports = app;