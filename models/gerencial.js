
var debug = require('debug')('gerencial:model');
var config = require('config');
var sql = require('mssql'); 



var GerencialModel = {

	find: function(query, callback){


		var connection = new sql.Connection(config, function(err) {
		    
		    var request = new sql.Request(connection); // or: var request = connection.request(); 

		    request.query('select * from teste_gerencial', function(err, recordset) {
		        
				callback(err, recordset);

		    });
		    
		});
		 
		connection.on('error', function(err) {

		});


		// callback(null, { name: 'Estou na Model Gerencial find:'});

	}


};


module.exports = GerencialModel;