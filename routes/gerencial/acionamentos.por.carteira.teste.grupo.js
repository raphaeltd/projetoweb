//@file Route: routes/gerencial/acionamentos-por-carteira.teste.grupo.js

var express = require('express');
var router = express.Router();
var GerencialAcionamentosController = require ('../../controllers/acionamentos.por.carteira.teste.grupo');
var debug = require('debug')('gerencial:controller');


debug("Rota... gerencial");

router.get('/', GerencialAcionamentosController.find);


module.exports = router;