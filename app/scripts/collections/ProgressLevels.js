/*global FlyToMars, Backbone*/

FlyToMars.Collections = FlyToMars.Collections || {};

(function () {
    'use strict';

    FlyToMars.Collections.ProgressLevels = Backbone.Collection.extend({
        model: FlyToMars.Models.ProgressLevels
    });

})();
