'use strict'

var express = require('express');
var router = express.Router();
var Request = require("request");
var Log = require('../models/log')

function getEpisodes(req,res){

   var episodes;
   
    Request.get("https://rickandmortyapi.com/api/episode", (err, response, requestedEpisodes) => {
        var log = new Log();
        log.date = response.headers.date;
        log.status = response.statusCode;
        log.method = response.request.method;
        log.url_consulted = req.protocol + '://' + response.request.host + req.originalUrl;

        log.save((err,logStored) => {
            if(err) {
                res.status(500).send({message: 'Error en la petición'});
            }else{
                if(!requestedEpisodes){
                    res.status(404).send({message: 'La consulta no existe'});
                }else{
                    episodes = JSON.parse(requestedEpisodes);
                    res.status(200).send({episodes});
                
                }      
            }
        });             
    });

    
}

function getEpisode(req, res){
    var episode_id = req.params.id
    var episode;
    var statusCode;
    var date;
    var method;
    var consulted;

    Request.get("https://rickandmortyapi.com/api/episode/"+episode_id, (err, response, requestedEpisode) => {
        if(err) {
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!requestedEpisode){
                res.status(404).send({message: 'La consulta no existe'});
            }else{
                episode = JSON.parse(requestedEpisode);
                statusCode = response.statusCode
                date = response.headers.date
                method = response.request.method
                consulted = response.request.headers.referer
                res.status(200).send({episode, statusCode, date, method, consulted});
               
                console.log('statusCode:', response && response.statusCode);
                console.log('date:', response && response.headers.date);
                console.log('method:', response && response.request.method);
                console.log('consulted:', response && response.request.headers.referer);
            }      
        }          
    });

}

module.exports = {
    getEpisodes,
    getEpisode
    
};