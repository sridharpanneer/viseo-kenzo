'use strict';


exports.initalizeNewsletter = function () {
	$('#newsletter-form').on('submit', function(e) {
		
		e.preventDefault();
		
		$.ajax({
			url : $(this).attr('action'),
			type : 'post',
			data : $(this).serialize(),
			success : function (data) {
				$('#newsletter-form').find('span.message-newsletter').html(data.message);
			}
		});
	});
}

