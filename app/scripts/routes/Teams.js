/*global FlyToMars, Backbone*/

FlyToMars.Routers = FlyToMars.Routers || {};

(function () {
    'use strict';

    FlyToMars.Routers.Teams = Backbone.Router.extend({
    	routes: {
            'score': 'showTeamsScore'
    	}
    });

    var teamsRouter = new FlyToMars.Routers.Teams();

    teamsRouter.on('route:showTeamsScore', function() {
        $("#modal").hide();
    	new FlyToMars.Views.Teams({
            collection: new FlyToMars.Collections.Teams()
        });
    	vent.trigger('teams:showScore');
    });

})();
