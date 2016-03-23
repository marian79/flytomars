/*global FlyToMars, Backbone*/

FlyToMars.Models = FlyToMars.Models || {};

(function () {
    'use strict';

    FlyToMars.Models.Task = Backbone.Model.extend({

        initialize: function() {
        },

        defaults: {
            'title': 'temp title',
            'description': 'temp description',
            'active': false
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
