//@file Model: models/gerencial/acionamentos.por.carteira.js

var debug = require('debug')('gerencial:model');
var config = require('config');
var sql = require('mssql'); 



var GerencialModel = {

	find: function(query, callback){


		var connection = new sql.Connection(config, function(err) {
		    
		    var request = new sql.Request(connection); // or: var request = connection.request(); 
			var stringQuery = "";

				stringQuery = "select c.*, e.nom_abrev,f.dsc_faixa, g.nom_grupo, ct.dsc_cart_empresa from posicao_diaria_acionamentos_por_empresa as c";
				stringQuery = stringQuery + " inner join empresas as e on e.id_cgc_empresa = c.id_cgc_empresa";
				stringQuery = stringQuery + " inner join carteiras as ct on ct.id_Carteira = c.id_Carteira and ct.id_cgc_empresa = c.id_cgc_empresa";
				stringQuery = stringQuery + " inner join faixas_de_atraso as f on f.id_faixa = c.id_faixa";
				stringQuery = stringQuery + " inner join grupos_financeiros as g on g.id_grupo = c.id_grupo";
				
				request.query(stringQuery, function(err, recordset) {
		        
				callback(err, recordset);

		    });
		    
		});
		 
		connection.on('error', function(err) {

		});


		// callback(null, { name: 'Estou na Model Gerencial find:'});

	}


};


module.exports = GerencialModel;