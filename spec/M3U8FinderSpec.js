var expect = require('chai').expect;
var finder = require('../finders/M3U8Finder').finder;


describe('M3U8Finder.js', function() {
	var url = 'http://v.pptv.com/show/g1W0MpoAcK4Rjicc.html';
	var reg = /^http:\/\/web-play.pptv.com\/web-m3u8-\d*\.m3u8\?type=m3u8\.web.\pad&playback=0&kk=.*&o=v\.pptv\.com$/

	it('should find pptv m3u8 video stream', function(done) {
		this.timeout(5000);
		finder.find(url, function(videoSrc) {
			expect(reg.test(videoSrc))
				.to.be.true;
			done();	
		});			
	});
});

