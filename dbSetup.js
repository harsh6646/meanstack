var mongo = require("mongodb");

var mongoClient = mongo.mongoClient;

var url = 'mongodb://localhost:27017/spiderWeb';
mongoClient.connect(url, function (err, db) { // make connection
	if(err) { // error check
		console.log("unable to connect to database", err);
	} else {
		console.log("Connection established to: ", url);
		// TODO build the tables/collections with validation/restiction	
		db.createCollection("Story", {
			validationLevel: "strict",
			validationAction: "error",
			validator: { $and: [
				{
					xAxis: {
						$type: "int",
						$exists: true,
					}
				},
				{
					yAxis: {
						$type: "int",
						$exists: true,
					}
				},
				{
					storyText: {
						$type: "string",
						$exists: true,
					}
				},
				{
					keywords: {
						$type: "string",
						$exists: true,
					}
				},
				]
			},
		});
		db.Story.insert({
			xAxis: 0,
			yAxis: 0,
			storyText: "testing",
			keywords: "test"
		});
		db.close();
	}
});