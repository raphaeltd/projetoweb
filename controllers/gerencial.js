
var Promise = require('bluebird');
var GerencialModel = Promise.promisifyAll(require('../models/gerencial'));

var debug = require('debug')('gerencial:controller');


debug(GerencialModel);

function _handleNotFound(data){
	if(!data){
		var err = new Error('Gerencial not found =[');
		err.status = 404;
		throw err;
	}

	return data;
}

var GerencialController = {
	find: function(request, response, next){

		GerencialModel.findAsync({})
			.then(function(data){
			response.json(data);

		})
			.catch(next);

	}

};

module.exports = GerencialController;