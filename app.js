//@file app.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var debug = require('debug')('servidor:app');

var path = require('path');
// var swig = require('swig');

// app.set('view engine','html');
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html',swig.renderFile);


app.use(function(request, response, next){
	debug(request.url);
	next();
});


//server config
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(request, response, next){
	if(request.url == '/favicon.ico'){
		response.writeHead(200,{'Content-Type': 'image/x-icon'});
		response.end('');
	}else{
		next();
	}
});

//router
app.use('/', require('./routes'));


//erro handling
app.use(function(request, response, next){
	var err = new Error('Rota não encontrada :(');
		err.status = 404;
	next(err);
});

app.use(function(request, response, next, err){
	// debug (err.stack);
	console.log(err.status);
	response.status(err.status || 500);
	response.json({err : err.massage});
});

//server listener
module.exports = app;