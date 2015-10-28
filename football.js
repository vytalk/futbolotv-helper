'use strict';

$(document).ready(function() {
	var element = $(".so_not_played")[0];
	if (element) {
		$('html, body').animate({
		      scrollTop: $(element).offset().top
		}, 10);
	}

	var teams = Utils.extractTeams();
    console.log(teams);

});

var Utils = {
	extractTeams : {
		var result = [];
		var teamsPushed = [];
		$.each($(".match-day .team-h a"), function(index, element) {
			var teamName = $(element).html();
			if ($.inArray(teamName, teamsPushed) == -1) {
				teamsPushed.push(teamName);
				var href = $(element).attr("href");
				var img = $(element).parent().parent().find(".team-embl img").attr("src");
				result.push(new Team(teamName, href, img));
			}
		});
		return result;
	}
}


var Team = function(name, url, img) {
	this.name = name;
	this.url = url;
	this.img = img;
}