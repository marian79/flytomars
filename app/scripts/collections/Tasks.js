/*global FlyToMars, Backbone*/

FlyToMars.Collections = FlyToMars.Collections || {};

(function () {
    'use strict';

    FlyToMars.Collections.Tasks = Backbone.Collection.extend({
    	url: FlyToMars.Urls.getTasks,
        model: FlyToMars.Models.Tasks
    });

})();
