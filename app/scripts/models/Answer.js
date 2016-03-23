/*global FlyToMars, Backbone*/

FlyToMars.Models = FlyToMars.Models || {};

(function () {
    'use strict';

    FlyToMars.Models.Answer = Backbone.Model.extend({

    	url: function() {
    		return FlyToMars.Urls.postAnswer;
    	},

    	initialize: function() {
        },

        defaults: {
        	'team_id': 0,
            'answer': '',
            'code': ''
        },

        validate: function(attrs, options) {
        	if(_.isEmpty(attrs.answer.trim())) {
        		return "You have to fill answer field";
        	}
        },

        parse: function(response, options)  {
        	return response;
        }
    });

})();
