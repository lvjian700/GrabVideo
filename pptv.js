var page = require('webpage').create();
var iframePage = require('webpage').create();

var url = 'http://v.pptv.com/show/g1W0MpoAcK4Rjicc.html';
var ua = 'Mozilla/5.0 (iPad; CPU OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A501 Safari/9537.53';

page.settings.userAgent = ua;

page.open(url, function(status) {
	page.includeJs('http://upcdn.b0.upaiyun.com/libs/jquery/jquery-1.10.2.min.js', function() {
		var playerUrl = page.evaluate(function() {
			var ret = ''

			$('iframe').each(function(i, n) {
				var src = $(n).attr('src');	
				if(src != undefined && src.match(/^http:\/\/player\.aplus\.pptv\.com\/corporate\/proxy\/./) ) {
					ret = src;
					return;
				}
			});

			return ret;
		});

		console.log('find video iframe src...');
		console.log(playerUrl);
	
		page.open(playerUrl, function() {
			console.log('iframe has been open');
			var title = page.evaluate(function() {
				return document.title;
			});
			console.log(title);
		});

		phantom.exit();
	});


});

