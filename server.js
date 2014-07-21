var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var myitems = require('./items');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
}));

// gets all items, ie http GET localhost:5000
app.get('/', myitems.retrieveAll);

// gets a single item, ie the second item http GET localhost:5000/id
app.get('/:mongoId', myitems.retrieveOne);

// adds and item, ie http --form POST localhost:5000 item='oranges'
app.post('/', myitems.create);

// updates an item, ie http --form PUT localhost:5000/id item='chocolate'
app.put('/:mongoId', myitems.update);

// deletes an item, ie http DELETE localhost:5000/id
app.delete('/:mongoId', myitems.delete);

var port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log('listening on '+port);
});

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	// yay!
});

// Error handler
mongoose.connection.on('error', function (err) {
	console.log(err)
})

