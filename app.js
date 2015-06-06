var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser());

// define routes

app.use(require('./routes'));

// start the server

var port = process.env.PORT || 1337;

app.listen(port, function (){
	console.log('ready on port ' + port);
});