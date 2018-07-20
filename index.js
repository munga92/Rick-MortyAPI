'use strict'

// init of MongoDB ORM, app.js & desired port.

var mongoose = require('mongoose'); 
var app = require('./app');
var port = process.env.PORT || 3977;

// DB connection

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/rick_and_morty').then(
    (ready) => {console.log('Connected')
        app.listen(port, function(){
                     console.log("Rick & Morty API Rest server listening on localhost:" +port);
                 });
    
},
    (error) => {console.log(error)} 
)