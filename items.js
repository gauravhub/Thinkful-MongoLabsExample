var items = [];

exports.create = function(req, res){
	if (!req.param('item')) {
		res.send('Item not valid');
		res.statusCode = 400;
	} else {
		items.push(req.param('item'));
		res.send("adding " + req.param('item'));
	}
};

exports.retrieveAll = function(req, res){
	items.forEach(function (item, i) {
		res.write(i + '. ' + item + '\n');
	});
	res.end();
};

exports.retrieveOne = function(req, res) {
	if (isNaN(req.params.id)) {
		res.send('Item id not valid');
		res.statusCode = 400;
	}
	else if (items[req.params.id]) {
		res.send("getting "+req.params.id);
	}
	else {
		res.send("item not found");
	}
}

exports.update = function(req, res) {
	if (isNaN(req.params.id)) {
		res.send('Item id not valid');
		res.statusCode = 400;
	}
	else if (items[req.params.id] && req.param('item')) {
		items[req.params.id] = req.param('item');
		res.send("putting "+req.params.id);
	}
	else {
		res.send("item not found");
	}
}

exports.delete = function(req, res) {
	if (isNaN(req.params.id)) {
		res.send('Item id not valid');
		res.statusCode = 400;
	}
	else if (items[req.params.id]) {
		items.splice(req.params.id, 1);
		res.end('Item deleted successfully');
	}
	else {
		res.send("item not found");
	}
}
