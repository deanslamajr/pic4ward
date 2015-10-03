var express = require('express');
var mongojs = require('mongojs');

var router = express.Router();

//local db:
//var db = mongojs('localPic4Ward', ['localPic4Ward']);
var db = mongojs( 'heroku_70wln8p7:ckrcrt2u2s98sq78job27md3pk@ds043952.mongolab.com:43952/heroku_70wln8p7?authMechanism=SCRAM-SHA-1', ['PicObjects'], {authMechanism: 'ScramSHA1'}); 

router.get('/', function (req, res){
  var picId = '557c7ccfe4b00a69307df6d9';
  db.PicObjects.findOne({_id:mongojs.ObjectId(picId)}, function(err, doc) {
    if (doc) {
      var name        = doc.name;
      var clickables  = doc.clickables;
      var url         = doc.url;
      var bColor      = doc.bColor;
      res.render('index', {'name': name, 'url': url, 'bColor': bColor, 'newClickables': JSON.stringify(clickables)} );
    } else {
      console.log("hello" + err);
      res.send('Whoops!!');
    }
  });
});

router.get('/:id', function (req, res){
  var reqGrabber = req.params.id;
  db.PicObjects.findOne({grabber: reqGrabber }, function(err, doc) {
    if (doc) {
      var name    = doc.name;
      var clickables  = doc.clickables;
      var url     = doc.url;
      var bColor      = doc.bColor;
      res.render('index', {'name': name, 'url': url, 'bColor': bColor, 'newClickables': JSON.stringify(clickables)} );
    } else {
      console.log("hello" + err);
      res.send('Whoops!!');
    }
  });
});

module.exports = router;