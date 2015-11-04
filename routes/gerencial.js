//@file Rota: gerencial.js

var express = require('express');
var router = express.Router();
var GerencialController = require ('../controllers/gerencial');
var debug = require('debug')('gerencial:controller');


debug("Rota... gerencial");

router.get('/', GerencialController.find);


module.exports = router;