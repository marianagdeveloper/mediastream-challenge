const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Json2csvParser = require('json2csv').Parser;
// mongoose.connect('mongodb://localhost:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

// console.log(Cat.find());

//----------------------------------------------------------------------------------

// Setup Express.js app
const app = express();

app.get('/cats', async (req, res) => {
    let fileName   = "cats.csv";

    Cat.find({}).lean().exec({}, (err, result) =>{
        if (err) return res.status(404).send("Error");

        // Choose fields
        const csvFields = [{
            label: 'Name',
            value: 'name'
        }];

        const json2csvParser = new Json2csvParser({fields: csvFields});
        const csv = json2csvParser.parse(result);

        res.header('Content-Type', 'text/csv');
        res.attachment(fileName);
        return res.send(csv);
    });
});

app.listen(4000);

// const fs = require('fs');
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/test";
// const Json2csvParser = require('json2csv').Parser;

// // Create a connection to the MongoDB database
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;
  
//   let dbo = db.db("gkzdb");
  
//   dbo.collection("customers").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
// 	/**
// 		[ { _id: 1, name: 'Jack Smith', address: 'Massachusetts', age: 23 },
// 		  { _id: 2, name: 'Adam Johnson', address: 'New York', age: 27 },
// 		  { _id: 3, name: 'Katherin Carter', address: 'Washington DC', age: 26 },
// 		  { _id: 4, name: 'Jack London', address: 'Nevada', age: 33 },
// 		  { _id: 5, name: 'Jason Bourne', address: 'California', age: 36 } ]	
// 	*/
	
// 	// -> Convert JSON to CSV data
// 	const csvFields = ['_id', 'name', 'address', 'age'];
// 	const json2csvParser = new Json2csvParser({ csvFields });
// 	const csv = json2csvParser.parse(result);

// 	console.log(csv);
// 	/**
// 		"_id","address","age","name"
// 		1,"Jack Smith",23,"Massachusetts"
// 		2,"Adam Johnson",27,"New York"
// 		3,"Katherin Carter",26,"Washington DC"
// 		4,"Jack London",33,"Nevada"
// 		5,"Jason Bourne",36,"California"
// 	*/
	
// 	fs.writeFile('customer.csv', csv, function(err) {
// 		if (err) throw err;
// 		console.log('file saved');
// 	});
// 	// -> Check 'customer.csv' file in root project folder
	
//     db.close();
//   });
// });