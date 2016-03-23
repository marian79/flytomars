/*global FlyToMars, $*/


window.FlyToMars = {
    Constants: {
        'TOTAL_TASKS': 8
    },
    Urls: {
        'getTasks': '/tasks',
        'getTeams': '/images/teams.json',
        'getScore': '/score/yyyy',
        'postAnswer': '/answer/xxxx',
        'getRefereeAnswer': '/już?'
    },
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        // welcome page
        var welcomeView = new FlyToMars.Views.Welcome({
            collection: new FlyToMars.Collections.Teams()
        });        
        //welcomeView.$el.find("#start").trigger('click');

        vent.on('begin', function() {
            // initialize editor
            var editorView = new FlyToMars.Views.Editor();

            // initialize tasks
            var tasksView = new FlyToMars.Views.Tasks({
                collection: new FlyToMars.Collections.Tasks()
            });

            // initialize progress timeline
            var progressView = new FlyToMars.Views.Progress({
            //    collection: new FlyToMars.Collections.ProgressLevels()
                collection: new FlyToMars.Collections.Progress()
            });
        })

        Backbone.history.start();
    }
};

var vent = _.extend({}, Backbone.Events);

$(document).ready(function () {
    'use strict';
    FlyToMars.init();
});
