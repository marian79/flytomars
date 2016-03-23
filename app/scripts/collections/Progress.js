/*global FlyToMars, Backbone*/

FlyToMars.Collections = FlyToMars.Collections || {};

(function () {
    'use strict';

    FlyToMars.Collections.Progress = Backbone.Collection.extend({
    	url: FlyToMars.Urls.getTeams,
    	model: FlyToMars.Models.Progress
    });

})();
