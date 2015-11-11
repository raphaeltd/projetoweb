//@file Route: routes/gerencial/contratos-por-carteira.js

var express = require('express');
var router = express.Router();
var GerencialContratosController = require ('../../controllers/contratos.por.carteira');
var debug = require('debug')('gerencial:controller');


debug("Rota... gerencial");

router.get('/', GerencialContratosController.find);


module.exports = router;