var cheerio = require('cheerio');
var request = require('request');
var util = require('util');


var TOKEN_ID = '0213159c6174ac35fffce20da3b6ec37';
var UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36';

var URL = 'http://v.youku.com/v_show/id_XODA3MTAzODA4.html?f=22951727&ev=1&from=y1.1-2.10001-0.1-1';


function _encodeApiUrl (url) {
	var replaced = url.replace(/^(https?:)\/\//, '$1##')
		.replace('+/', '-_');

	return new Buffer(replaced).toString('base64');
}

function buildApiUrl (url) {
	return util.format('http://api.flvxz.com/token/%s/url/%s/jsonp/purejson',
			TOKEN_ID, _encodeApiUrl(url));
}

function buildOptions (url, ua) {
	return {
		method: 'GET',
		url: buildApiUrl(url),
		headers: {
			'User-Agent': ua
		}
	};
}

request(buildOptions(URL, UA), function(error, response,body) {
	if (!error && response.statusCode == 200) {
		var json = JSON.parse(body);
		console.log(json);
	}
});


