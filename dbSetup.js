var mongo = require("mongodb");

var mongoClient = mongo.mongoClient;

var url = 'mongodb://localhost:27017/spiderWeb';
mongoClient.connect(url, function (err, db) { // make connection
	if(err) { // error check
		console.log("unable to connect to database", err);
	} else {
		console.log("Connection established to: ", url);
		// TODO build the tables/collections with validation/restiction	

		db.close();
	}
});