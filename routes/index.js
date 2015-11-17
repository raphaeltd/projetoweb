//@file Route: routes/index.js

var express = require('express');
var router = express.Router();

router.get('/', function(request, response){
	response.status(201);
	response.json({rota: 'Rota não informada'});

});


// router.use('/gerencial', require('./gerencial'));

router.use('/gerencial/contratos', require('./gerencial/contratos.por.carteira'));
router.use('/gerencial/acionamentos', require('./gerencial/acionamentos.por.carteira'));


module.exports = router;