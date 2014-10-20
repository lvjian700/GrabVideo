var phantom = require('phantom');

var url = 'http://v.pptv.com/show/g1W0MpoAcK4Rjicc.html';
var ua = 'Mozilla/5.0 (iPad; CPU OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A501 Safari/9537.53';
var jqueryCDN = 'http://upcdn.b0.upaiyun.com/libs/jquery/jquery-1.10.2.min.js';


function evaluateFindPlayerURL() {
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

function evaluateVideoURL () {
	return document.querySelector('video').src;
}

function onOpenPlayerPage(page, ph) {
	return function() {
		page.includeJs(jqueryCDN, function() {
			page.evaluate(evaluateFindPlayerURL, function (result) {
				console.log(result);

				page.open(result, function(status) {
					page.evaluate(evaluateVideoURL, function(videoSrc) {
						console.log(videoSrc);
					});
					ph.exit();
				});

			});
		});
	};
}

function searchVideoSrc(page, ph) {
	return function() {
		page.open(url, onOpenPlayerPage(page, ph));
	};
}

phantom.create(function (ph) {
	ph.createPage(function (page) {
		page.set('settings.userAgent', ua, searchVideoSrc(page, ph));
	});
});
