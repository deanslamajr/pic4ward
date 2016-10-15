var express = require('express');
var mongojs = require('mongojs');

var envConfig = require('./environment-config');

var router = express.Router();

// setup mongoDB with password sourced from environment variable
var mongoLoginString = envConfig.get('MONGO_USERNAME') + ':' + envConfig.get('MONGO_PASS') + '@' + envConfig.get('MONGO_SUBDOMAIN') + '.mongolab.com:' + envConfig.get('MONGO_PORT') + '/' + envConfig.get('MONGO_USERNAME') + '?authMechanism=SCRAM-SHA-1';
var db = mongojs(mongoLoginString, ['PicObjects'], {authMechanism: 'ScramSHA1'});

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
      console.log('err', err);
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
      console.log('err', err);
      res.send('Whoops!!');
    }
  });
});

module.exports = router;