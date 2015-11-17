// @file Controller: controllers/gerencial/acionamentos.por.carteira.js

var Promise = require('bluebird');
var AcionamentosModel = Promise.promisifyAll(require('../models/acionamentos.por.carteira'));

var debug = require('debug')('gerencial:controller');


debug(AcionamentosModel);

function _handleNotFound(data){
	if(!data){
		var err = new Error('Acionamentos Gerenciais não encontrado =[');
		err.status = 404;
		throw err;
	}

	return data;
}

var AcionamentosController = {
	find: function(request, response, next){

		AcionamentosModel.findAsync({})
			.then(function(data){
			response.json(data);

		})
			.catch(next);

	}

};

module.exports = AcionamentosController;