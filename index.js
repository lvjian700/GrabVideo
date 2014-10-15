var cheerio = require('cheerio');
var q = require('Q');
var request = require('request');


var youkURL = 'http://v.youku.com/v_show/id_XODAzMDc3ODI4.html?from=y1.1-2.10001-0.1-1';
var UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36';

var args = process.argv;

if (args.length > 2 && args[2] != undefined) {
	youkURL = args[2];
}

function searchVideoURLs (youku) {
	return [
		'http://www.flvcd.com/parse.php?format=&kw=',
		encodeURIComponent(youku)
	].join('');
}

function parseBody (body) {
	$ = cheerio.load(body);
	var videoLinks = $('input[name=inf]').val().split('|');

	videoLinks.forEach(function(item) {
		console.log(item);
	});
}

var targetURL = searchVideoURLs(youkURL);

request({method: 'GET', url: targetURL, headers: {'User-Agent': UA}}, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		parseBody(body);
	}
});

