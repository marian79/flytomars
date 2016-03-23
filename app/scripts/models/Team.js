/*global FlyToMars, Backbone*/

FlyToMars.Models = FlyToMars.Models || {};

(function () {
    'use strict';

    FlyToMars.Models.Team = Backbone.Model.extend({

        initialize: function() {
        },

        defaults: {
            'name': '',
            'picture': '',
            'score': 0,
            'is_mine': false
        },

        validate: function(attrs, options) {
            if(attr.name === '') {
                return 'Team needs a name!';
            }
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
