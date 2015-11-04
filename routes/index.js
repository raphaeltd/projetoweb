//@file dragons.js

var express = require('express');
var router = express.Router();

router.get('/', function(request, response){
	response.status(201);
	response.json({rota: 'Rota não informada'});

});


router.use('/gerencial', require('./gerencial'));


module.exports = router;