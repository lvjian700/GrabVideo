var express = require('express');
var app = express();
var timeout = require('connect-timeout');

var finder = require('./finders/M3U8Finder').finder;

app.use(timeout('15s'));
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
		console.log('the video src found');
		console.log(videoSrc);

		res.json({
			m3u8: videoSrc
		});
	}, function(err) {
		
	});		
});

var server = app.listen(process.env.PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
