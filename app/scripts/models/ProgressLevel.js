/*global FlyToMars, Backbone*/

FlyToMars.Models = FlyToMars.Models || {};

(function () {
    'use strict';

    FlyToMars.Models.ProgressLevel = Backbone.Model.extend({

        initialize: function() {
        },

        defaults: {
            'task': 0,
            'teams': []
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
