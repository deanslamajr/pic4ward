var express = require('express');
var mongojs = require('mongojs');

var router = express.Router();
//var dbPath = process.env.MONGOLAB_URI || 27017

//local db:
//var db = mongojs('localPic4Ward', ['localPic4Ward']);
var db = mongojs( 'heroku_70wln8p7:ckrcrt2u2s98sq78job27md3pk@ds043952.mongolab.com:43952/heroku_70wln8p7', ['PicObjects']);

db.PicObjects.find(function(err, docs) {
    console.log(docs); 
    console.log(err);
});

router.get('/', function (req, res){
	

	res.render('index', {
		title: 'My app'
	});
});

module.exports = router;