'use strict'

var express = require('express');
var router = express.Router();
var Request = require("request");

function getCharacters(req,res){

   var characters;
   var statusCode;
   var date;
   var method;
   var consulted;

    Request.get("https://rickandmortyapi.com/api/character", (err, response, requestedCharacters) => {
        if(err) {
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!requestedCharacters){
                res.status(404).send({message: 'La consulta no existe'});
            }else{
                characters = JSON.parse(requestedCharacters);
                statusCode = response.statusCode
                date = response.headers.date
                method = response.request.method
                consulted = response.request.headers.referer
                res.status(200).send({characters, statusCode, date, method, consulted});
               
                console.log('statusCode:', response && response.statusCode);
                console.log('date:', response && response.headers.date);
                console.log('method:', response && response.request.method);
                console.log('consulted:', response && response.request.headers.referer);

                
            }      
        }          
    });

    
}

function getCharacter(req, res){
    var character_id = req.params.id
    var character;
    var statusCode;
    var date;
    var method;
    var consulted;

    Request.get("https://rickandmortyapi.com/api/character/"+character_id, (err, response, requestedCharacter) => {
        if(err) {
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!requestedCharacter){
                res.status(404).send({message: 'La consulta no existe'});
            }else{
                character = JSON.parse(requestedCharacter);
                statusCode = response.statusCode
                date = response.headers.date
                method = response.request.method
                consulted = response.request.headers.referer
                res.status(200).send({character, statusCode, date, method, consulted});
               
                console.log('statusCode:', response && response.statusCode);
                console.log('date:', response && response.headers.date);
                console.log('method:', response && response.request.method);
                console.log('consulted:', response && response.request.headers.referer);
            }      
        }          
    });

}



module.exports = {
    getCharacters,
    getCharacter
    
};