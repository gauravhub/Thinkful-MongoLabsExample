var http = require('http');
var url = require('url');
var items = [];

var isFound = function(i, res) {
	if (isNaN(i)) {
		res.statusCode = 400;
		res.end('Item id not valid');
	}
	else if (!items[i]) {
		res.statusCode = 404;
		res.end('Item not found');
	}
	else {
		return true;
	}
};

var server = http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	var i = parseInt(pathname.slice(1), 10);
	var item = '';

	req.on('data', function (chunk) {
		item += chunk;
	});

	switch (req.method) {
	case 'GET':
		items.forEach(function (item, i) {
			res.write(i + '. ' + item + '\n');
		});
		res.end();
		break;
	case 'POST':
		req.on('end', function () {
			items.push(item);
			res.end('Item added\n');
		});
		break;
	case 'PUT':
		req.on('end', function () {
			if (isFound(i, res)) {
				items[i] = item;
				res.end('Item updated successfully');
			}
		});
		break;
	case 'DELETE':
		if (isFound(i, res)) {
			items.splice(i, 1);
			res.end('Item deleted successfully');
		}
		break;
	}
});

var port = process.env.PORT || 5000;
server.listen(port, function () {
	console.log('listening on '+port);
});
