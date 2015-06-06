var express = require('express');

var router = express.Router();

router.get('/', function (req, res){
	res.render('index', {
		title: 'My app'
	});
});

module.exports = router;