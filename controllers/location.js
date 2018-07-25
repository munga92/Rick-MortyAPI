'use strict'

var express = require('express');
var router = express.Router();
var Request = require("request");
var Log = require('../models/log')

function getLocations(req,res){

   var locations;

    Request.get("https://rickandmortyapi.com/api/location", (err, response, requestedLocations) => {
        var log = new Log();
        log.date = response.headers.date;
        log.status = response.statusCode;
        log.method = response.request.method;
        log.url_consulted = req.protocol + '://' + response.request.host + req.originalUrl;
        
        log.save((err,logStored) => {
            if(err) {
                res.status(500).send({message: 'Error en la petición'});
            }else{
                if(!requestedLocations){
                    res.status(404).send({message: 'La consulta no existe'});
                }else{
                    locations = JSON.parse(requestedLocations);
                    res.status(200).send({locations});
                }      
            }
        });              
    });

    
}

function getLocation(req, res){
    var location_id = req.params.id
    var location;
    var statusCode;
    var date;
    var method;
    var consulted;

    Request.get("https://rickandmortyapi.com/api/location/"+location_id, (err, response, requestedLocation) => {
        if(err) {
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!requestedLocation){
                res.status(404).send({message: 'La consulta no existe'});
            }else{
                location = JSON.parse(requestedLocation);
                statusCode = response.statusCode
                date = response.headers.date
                method = response.request.method
                consulted = response.request.headers.referer
                res.status(200).send({location, statusCode, date, method, consulted});
               
                console.log('statusCode:', response && response.statusCode);
                console.log('date:', response && response.headers.date);
                console.log('method:', response && response.request.method);
                console.log('consulted:', response && response.request.headers.referer);
            }      
        }          
    });

}

module.exports = {
    getLocations,
    getLocation
    
};