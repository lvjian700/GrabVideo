var phantom = require('phantom');
var Q = require('q');
var util = require('util');

var ua = 'Mozilla/5.0 (iPad; CPU OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A501 Safari/9537.53';
var jqueryCDN = 'http://upcdn.b0.upaiyun.com/libs/jquery/jquery-1.10.2.min.js';

function _evaluateFindPlayerURL() {
	var ret = ''
	function isPlayerUrl (url) {
		return url != undefined && 
			url.match(/^http:\/\/player\.aplus\.pptv\.com\/corporate\/proxy\/./);
	}

	$('iframe').each(function(i, n) {
		var src = $(n).attr('src');	
		if(isPlayerUrl(src) ) {
			ret = src;
			return
		}
	});

	return ret;

}

function _evaluateVideoURL () {
	return document.querySelector('video').src;
}

function openPlayerPage (context) {
	var player = Q.defer();

	context.page.open(context.url, function(status) {
		if (status !== 'success') {
			console.log('fail to open player page.');
			player.reject(new Error(util.format('can not open url: %s', context.url)));
			return
		}

		context.page.includeJs(jqueryCDN, function() {
			player.resolve(context);	
		});
	});
	
	return player.promise;
}

function findVideoPage (context) {
	var player = Q.defer();

	context.page.evaluate(_evaluateFindPlayerURL, function(result) {
		context.videoPageUrl = result;
		player.resolve(context);
	});

	return player.promise;
}

function openVideoPage (context) {
	var open = Q.defer();

	console.log('open video page');
	console.log(context.videoPageUrl);

	context.page.open(context.videoPageUrl, function(status) {
		if (status !== 'success') {
			console.log(status);
			open.reject(new Error(util.format('can not open url: %s', context.videoPageUrl)));
			return;
		}
		
		open.resolve(context);
	});

	return open.promise; 
}

function findVideoSrc (context) {
	var video = Q.defer();
	
	context.page.evaluate(_evaluateVideoURL, function(result) {
		context.videoSrc = result;
		video.resolve(context);
	});

	return video.promise;
}

function browse (url) {
	var defer = Q.defer();
		
	phantom.create(function (ph) {
		ph.createPage(function (page) {
			page.set('settings.userAgent', ua, function() {
				defer.resolve({
					page: page,
					phantom: ph, 
					url: url
				});
			});
		});
	});

	return defer.promise;
}

var M3U8Finder = {
	find: function(videoPageUrl, success, failure) {
		browse(videoPageUrl)
			.then(openPlayerPage)
			.then(findVideoPage)
			.then(openVideoPage)
			.then(findVideoSrc)
			.then(function(context) {
				success(context.videoSrc);	
				context.phantom.exit();
			})
			.fail(function(error) {
				failure(error)
			})
			.done();
	}
};

exports.finder = M3U8Finder;
