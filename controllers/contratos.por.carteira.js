// @file Controller: controllers/gerencial/contratos.por.carteira.js

var Promise = require('bluebird');
var ContratosModel = Promise.promisifyAll(require('../models/contratos.por.carteira'));

var debug = require('debug')('gerencial:controller');


debug(ContratosModel);

function _handleNotFound(data){
	if(!data){
		var err = new Error('Contratos Gerenciais não encontrado =[');
		err.status = 404;
		throw err;
	}

	return data;
}

var ContratosController = {
	find: function(request, response, next){

		ContratosModel.findAsync({})
			.then(function(data){
			response.json(data);

		})
			.catch(next);

	}

};

module.exports = ContratosController;