var express = require('express');
var mongodb = require('mongodb'); 
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/test2', function (req, res) {
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/test2';

	MongoClient.connect(url, function (err, db) {
		if(err) {
			console.log("unable to connect to server", err);
		} else {
			console.log("connection established to", url);
		}
		var collection = db.collection('test2');
		collection.find({}).toArray(function (err, result) {
			if(err) {
				res.send(err);
			} else if (result.length) {
				res.render('testlist', {
					'testlist' : result
				});
			} else {
				res.send('No documents found');
			}
			db.close();
		});
	});
});
module.exports = router;
