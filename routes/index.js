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
		}
	});
});
router.get('/initdb', function (req, res) {
	var mongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/spiderWeb';
	var sDrop = false;
	mongoClient.connect(url, function (err, db) { // make connection
		if(err) { // error check
			console.log("unable to connect to database", err);
		} else {
			db.dropCollection("Story", function (err, result) {
				if(null == err) {
					console.log("Story dropped");
					sDrop = true;
				} else {
					console.log("Story drop failed");
				}
			});
			db.createCollection("Story", {
				// validationLevel: "strict",
				// validationAction: "error",
				// validator: {
					
				// 		"xAxis": {
				// 			$type: "int",
				// 			$exists: true,
				// 		}
				// 	,
					
				// 		"yAxis": {
				// 			$type: "int",
				// 			$exists: true,
				// 		}
				// 	,
					
				// 		"storyText": {
				// 			$type: "string",
				// 			$exists: true,
				// 		}
				// 	,
					
				// 		"keywords": {
				// 			$type: "string",
				// 			$exists: true,
				// 		}
				// 	,
				// }
			}, function (err, col) {
				col.insertOne({
					xAxis: 0,
	 				yAxis: 0,
	 				storyText: "testing",
			 		keywords: "test"
	 			}, {}, function (err, r) {
	 				db.close();
	 				res.render("dbsetup", {col: sDrop});
	 			});
			});
		}
	});
});

router.get("/insertOne", function (req, res) {
	var mongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/spiderWeb';
	mongoClient.connect(url, function (err, db) {
		var col = db.collection('Story');
		col.insertOne({
			xAxis: 2,
	 		yAxis: 2,
	 		storyText: "testing2",
			keywords: "test2"
	 		}, {}, function (err, r) {
	 			var insert = false;
	 			if(err == null) {
	 				insert = true;
	 			}
	 			db.close();
	 			res.render("insertOne", {col: insert});
	 		}
	 	);
	});
});
module.exports = router;