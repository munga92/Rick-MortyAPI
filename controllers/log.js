'use strict'

var express = require('express');
var router = express.Router();
var Request = require("request");
var Log = require('../models/log')
var mongoosePaginate = require('mongoose-pagination');

function getLogs(req,res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var page = req.params.page;
    var itemsPerPage = 99;

    Log.find().sort('name').paginate(page, itemsPerPage, function(err, logs, total){
        if(err){
            res.status(500).send({message: 'Error en la petición'});

        }else{
            if(!logs){
                res.status(404).send({message:'No hay logs'}); 

            }else{
                return res.status(200).send({
                    total_items: total,
                    logs: logs
                }); 
            }
        }
    });
}

module.exports = {
    getLogs
}