$(function() {
	$('#btnFind').click(function() {
		var val = $('#urlField').val();
		var url = ['/m3u8/', encodeURIComponent(val)].join('');
		
		var that = $(this);
		that.text('finding ...');

		$.ajax({
			url: url,
			dataType: 'JSON',
			success: function(data) {
				$('#ret').html(data.m3u8);		
				that.text('Go');
			},
			failure: function(error) {
				that.text('Go');
			},
			timeout: 15000
		});
	});		
});
