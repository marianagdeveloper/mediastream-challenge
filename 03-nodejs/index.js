'use strict';

console.log(`
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
`);

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Json2csvParser = require('json2csv').Parser;

// Setup database
mongoose.Promise = Promise;
// mongoose.connect('mongodb://localhost/mediastream-challenge');
mongoose.connect('mongodb://localhost:27017/mediastream-challenge');

const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO

app.listen(3000);
console.log('Server on port 3000');


app.get('/users', async (req, res) => {

    User.find({}).lean().exec({}, (err, result) =>{
        if (err) return res.status(404).send("Error");

        const csvFields = [{
            label: 'Name',
            value: 'name'
        }, {
            label: 'Email',
            value: 'email'
        }];

        const json2csvParser = new Json2csvParser({fields: csvFields});
        const csv = json2csvParser.parse(result);

        res.header('Content-Type', 'text/csv');
        res.attachment("collectionUsers.csv");
        return res.send(csv);
    });
});
