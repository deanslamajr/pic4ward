var express = require('express');
var mongojs = require('mongojs');

var router = express.Router();

//local db:
//var db = mongojs('localPic4Ward', ['localPic4Ward']);
var db = mongojs( 'heroku_70wln8p7:ckrcrt2u2s98sq78job27md3pk@ds043952.mongolab.com:43952/heroku_70wln8p7', ['PicObjects']);



router.get('/', function (req, res){
	var picId = '557c7ccfe4b00a69307df6d9';

	db.PicObjects.findOne({_id:mongojs.ObjectId(picId)},function(err, doc) {
		if (!err) {
			var picObj = doc;
			var clickables = doc.clickables;
			res.render('index', {'picObj': picObj, 'clickables': clickables, 'newClickables': JSON.stringify(clickables)} );
		} else {
			console.log(err);
			res.send('Whoops!!');
		}
	});
});

router.get('/:id', function (req, res){
	var reqGrabber = req.params.id;
	console.log(reqGrabber);

	db.PicObjects.findOne({grabber: reqGrabber },function(err, doc) {
		if (doc) {
			var picObj = doc;
			var clickables = doc.clickables;
			res.render('index', {'picObj': picObj, 'clickables': clickables, 'newClickables': JSON.stringify(clickables)} );
		} else {
			console.log(err);
			res.send('Whoops!!');
		}
	});
});

module.exports = router;