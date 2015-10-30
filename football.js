'use strict';

$(document).ready(function() {
	var element = $(".so_not_played")[0];
	if (element) {
		$('html, body').animate({
		      scrollTop: $(element).offset().top
		}, 10);
	}

	var teams = Utils.extractTeams();
    Utils.generate(teams);
    
});

var Utils = {
	extractTeams : function() {
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
	},

	generate : function(teams) {
		$.get(chrome.extension.getURL("teambox.html"), function(data) {
			var template = Handlebars.compile(data);
			var html = template({list : teams});
			$("body").append(html);
			$(".box-team").click(function() {
				var teamName = $(this).find("img").attr("alt");
				var elementsToShow = [];
				$.each($(".match-day tr"), function(index, element) {
					var currentTeams = $(element).find(".team-embl img");
					if (currentTeams && currentTeams.length > 0 && ($(currentTeams[0]).attr("alt") === teamName || $(currentTeams[1]).attr("alt") === teamName)) {
						$(element).show();
					} else {
						$(element).hide();	
					}
				});
			});
		});
	}
}


var Team = function(name, url, img) {
	this.name = name;
	this.url = url;
	this.img = img;
}