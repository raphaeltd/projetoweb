//@file Model: models/gerencial/contratos.por.carteira.js

var debug = require('debug')('gerencial:model');
var config = require('config');
var sql = require('mssql'); 



var GerencialModel = {

	find: function(query, callback){


		var connection = new sql.Connection(config, function(err) {
		    
		    var request = new sql.Request(connection); // or: var request = connection.request(); 

		    // request.query('select * from teste_gerencial', function(err, recordset) {

				request.query('select c.*, e.nom_abrev,f.dsc_faixa, g.nom_grupo from teste_carteira as c inner join empresas as e on e.id_cgc_empresa = c.id_cgc_empresa inner join faixas_de_atraso as f on f.id_faixa = c.id_faixa inner join grupos_financeiros as g on g.id_grupo = c.id_grupo', function(err, recordset) {

				callback(err, recordset);

		    });
		    
		});
		 
		connection.on('error', function(err) {

		});


		// callback(null, { name: 'Estou na Model Gerencial find:'});

	}


	// findId: function(query, callback){

	// 	var _dataPosicao = query.params._id;

	// 	var connection = new sql.Connection(config, function(err) {
		    
	// 	    var request = new sql.Request(connection); // or: var request = connection.request(); 

	// 	    // request.query('select * from teste_gerencial', function(err, recordset) {

	// 			request.query('select c.*, e.nom_abrev,f.dsc_faixa, g.nom_grupo from teste_carteira as c inner join empresas as e on e.id_cgc_empresa = c.id_cgc_empresa inner join faixas_de_atraso as f on f.id_faixa = c.id_faixa inner join grupos_financeiros as g on g.id_grupo = c.id_grupo where dt_posicao = ' + _dataPosicao, function(err, recordset) {

	// 			callback(err, recordset);

	// 	    });
		    
	// 	});
		 
	// 	connection.on('error', function(err) {

	// 	});


	// 	// callback(null, { name: 'Estou na Model Gerencial find:'});

	// }

};


module.exports = GerencialModel;