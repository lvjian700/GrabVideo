var express = require('express');
var app = express();

var finder = require('./finders/M3U8Finder').finder;

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.redirect('/index.html');
});

app.get('/m3u8/:url', function (req, res) {
	var decodedURL = decodeURIComponent(req.params.url);
	console.log('find on url:');
	console.log(decodedURL);

	console.log('find...');
	finder.find(decodedURL, function(videoSrc) {
		res.json({
			m3u8: videoSrc
		});
	});		
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
