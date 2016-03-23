/*global FlyToMars, Backbone*/

FlyToMars.Collections = FlyToMars.Collections || {};

(function () {
    'use strict';

    FlyToMars.Collections.Teams = Backbone.Collection.extend({
    	url: FlyToMars.Urls.getTeams,
    	model: FlyToMars.Models.Team
    });

})();
