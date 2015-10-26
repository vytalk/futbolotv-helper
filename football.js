$(document).ready(function() {
	var element = $(".so_not_played")[0];
	if (element) {
		$('html, body').animate({
		      scrollTop: $(element).offset().top
		}, 10);
	}
});