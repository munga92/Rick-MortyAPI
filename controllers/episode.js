'use strict'

var express = require('express');
var router = express.Router();
var Request = require("request");

function getEpisodes(req,res){

   var episodes;
   var statusCode;
   var date;
   var method;
   var consulted;

    Request.get("https://rickandmortyapi.com/api/episode", (err, response, requestedEpisodes) => {
        if(err) {
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!requestedEpisodes){
                res.status(404).send({message: 'La consulta no existe'});
            }else{
                episodes = JSON.parse(requestedEpisodes);
                statusCode = response.statusCode
                date = response.headers.date
                method = response.request.method
                consulted = response.request.headers.referer
                res.status(200).send({episodes, statusCode, date, method, consulted});
               
                console.log('statusCode:', response && response.statusCode);
                console.log('date:', response && response.headers.date);
                console.log('method:', response && response.request.method);
                console.log('consulted:', response && response.request.headers.referer);
            }      
        }          
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