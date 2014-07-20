var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var items = [];

app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

app.use(function (req, res, next) {
	console.log(req.body) // populated!
	next()
})

app.get('/', function(req, res){
	items.forEach(function (item, i) {
		res.write(i + '. ' + item + '\n');
	});
	res.end();
});

app.get('/:index', function(req, res){
	if (items[req.params.index]) {
		res.send("getting "+req.params.index);
	}
	else {
		res.send("Item not found");
	}
});

app.post('/', function(req, res){
	if (!req.param('item')) {
		res.send('Item not valid');
		res.statusCode = 400;
	} else {
		items.push(req.param('item'));
		res.send("adding " + req.param('item'));
	}
});

app.put('/:index', function(req, res){
	if (items[req.params.index] && req.param('item')) {
		items[req.params.index] = req.param('item');
		res.send("putting "+req.params.index);
	}
	else {
		res.send("item not found");
	}
});

app.delete('/:index', function(req, res){
	if (items[req.params.index]) {
		items.splice(req.params.index, 1);
		res.end('Item deleted successfully');
	}
	else {
		res.send("item not found");
	}
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log('listening on '+port);
});

