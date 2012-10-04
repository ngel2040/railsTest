function cb() {
	
}

var aa_view, aa_model;

(function() {

	$.ajax({
		url: 'https://graph.facebook.com/me/friends?access_token=AAAAAAITEghMBACHc0Jr7cLuQ6TsAeJ8PcREJZBHxrGBBwptoDxGujqqBzMF3vAAPrgxM7ZAs4sV3Pt7sr40lwp9Qvt9NIqoZAILgVOUkocYX6CZCE7Lo&callback=cb',
		error: function() {
			console.log(arguments);
		},
		success: function() {
			console.log(arguments);
		}
	});

	aa_model = Backbone.Model.extend({
		
	});

	aa_view = Backbone.View.extend({
		el: $('body')
		, initialize: function() {
		}
		, setOriginData: function(data) {
			console.log(data);
			this.model.set({
				orgin_data: data
			});
			this.temp();
		}
		, temp: function() {
			console.log(this.model.get('orgin_data'));
			this.$el.append(this.model.get('orgin_data'));
		}
	});

})();

