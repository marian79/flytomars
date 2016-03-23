/*global FlyToMars, Backbone, JST*/

FlyToMars.Views = FlyToMars.Views || {};

(function () {
    'use strict';

    FlyToMars.Views.Welcome = Backbone.View.extend({

        el: '#modal',

        template: JST['app/scripts/templates/welcome.ejs'],

        events: {
            'click #start': function() {
                this.startCompetition();
            }
        },

        initialize: function () {
            this.render();
            this.listenTo(this.collection, 'reset', this.addAllTeams);
            this.collection.fetch({reset: true});
        },

        addTeam: function(team) {
            if(team.get('is_mine')) {
                window.localStorage.setItem('myTeam', team.get('name'));
                this.myTeam = team.get('name');
            }
            var view = new FlyToMars.Views.Team({model: team});
            this.$('#team-selector').append(view.render().el);
        },

        addAllTeams: function() {
            this.collection.each(this.addTeam, this);
            this.markTeamAsActive();
        },

        markTeamAsActive: function() {
            this.$el.find('.team-picture').addClass('disabled');
            this.$el.find('.team-name').addClass('disabled');
            this.$el
                .find('.team-picture.' + this.myTeam.toLowerCase())
                .removeClass('disabled')
                .parent()
                .find('.team-name')
                .removeClass('disabled');
            this.$el.find('.my-team').text(this.myTeam);
        },

        startCompetition: function() {
            this.$el.fadeOut(function() {
                vent.trigger('begin');
            });
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

})();
