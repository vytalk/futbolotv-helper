'use strict';

$(document).ready(function() {
	
	var fth = new FootballTvHelper();

	fth.scrollToComingGames();
    fth.generateClickableTeamsList();
    
});

var FootballTvHelper = function() {

	this.scrollToComingGames = function() {
		var element = $(".so_not_played")[0];
		if (element) {
			$('html, body').animate({
		      scrollTop: $(element).offset().top
			}, 10);	
		}
	};

	this.generateClickableTeamsList = function() {
		var teams = extractTeams();
		generateList(teams);
	};

	this.showTeamMatches = function(teamName) {
		$.each($(".match-day tr"), function(index, element) {
			if (doHaveElementHaveTeam(teamName, element)) {
				$(element).show();
			} else {
				$(element).hide();
			}
		});
	};

	var self = this;

	var Team = function(name, img) {
		this.name = name;
		this.img = img;
	};

	var extractTeams = function() {
		var result = [];
		var teamsPushed = [];
		$.each($(".match-day .team-embl img"), function(index, element) {
			var teamName = $(element).attr("alt");
			var img = $(element).attr("src");

			if ($.inArray(teamName, teamsPushed) == -1) {
				teamsPushed.push(teamName);
				result.push(new Team(teamName, img));
			}
		});
		return result;
	};

	var generateList = function(teams) {
		$.get(chrome.extension.getURL("tmpl/teambox.html"), function(data) {

			var template = Handlebars.compile(data);
			var html = template({list : teams});
			$("body").append(html);

			$(".box-team").click(function() {
				var teamName = $(this).find("img").attr("alt");
				self.showTeamMatches(teamName);
			});
		});
	};

	var doHaveElementHaveTeam = function(teamName, element) {
		var currentTeams = $(element).find(".team-embl img");
		if (currentTeams.length > 0) {
			var has = false;
			$.each(currentTeams, function(index, team) {
				if ($(team).attr("alt") === teamName) {
					has = true;
					return false;
				} 
			});
			return has;
		} else {
			return false;
		}
	}
}
