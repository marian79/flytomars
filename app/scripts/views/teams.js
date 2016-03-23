/*global FlyToMars, Backbone, JST*/

FlyToMars.Views = FlyToMars.Views || {};

(function () {
    'use strict';

    FlyToMars.Views.Teams = Backbone.View.extend({

        el: '#score-table',

        template: JST['app/scripts/templates/teams.ejs'],

        events: {},

        initialize: function () {
            this.render();
            vent.on('teams:showScore', this.showScore, this);
            this.listenTo(this.collection, 'reset', this.addAllTeams);
        },

        showScore: function() {
            //this.collection.fetch(); // fetch score
            this.collection.reset([
                new FlyToMars.Models.Team({name: 'Superman', score: 28}), // finished 7 tasks
                new FlyToMars.Models.Team({name: 'Wolverine', score: 21}), // finished 6 tasks
                new FlyToMars.Models.Team({name: 'SilverSurfer', score: 21}), // finished 6 tasks
                new FlyToMars.Models.Team({name: 'Batman', score: 10}), // finished task 1, 2, 3 and 4
                new FlyToMars.Models.Team({name: 'Hulk', score: 6}), // finished task 1, 2 and 3
                new FlyToMars.Models.Team({name: 'Thor', score: 6}), // finished task 1, 2 and 3
                new FlyToMars.Models.Team({name: 'Ironman', score: 3}), // finished task 1 and 2
                new FlyToMars.Models.Team({name: 'WonderWoman', score: 1}) // finished task 1
            ]);
        },

        addTeam: function(team) {
            if(_.isEmpty(team.get('picture'))) {
                team.set('picture', team.get('name').toLowerCase());
            }
            var view = new FlyToMars.Views.Team({model: team});
            this.$('#team-score').append(view.render().el);
        },

        addAllTeams: function(){
            this.collection.each(this.addTeam, this);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

})();
