/*global FlyToMars, Backbone, JST*/

FlyToMars.Views = FlyToMars.Views || {};

(function () {
    'use strict';

    FlyToMars.Views.Progress = Backbone.View.extend({

        el: '#progress-container',

        template: JST['app/scripts/templates/progress.ejs'],

        events: {
            'mouseover .team': function(e) {
                this.uncoverTeamsList(e);
            },
            'mouseout .team': function() {
                if(!this.$el.find('#teams-uncovered-list').is('hover')) {
                    this.coverTeamsList();
                }
            }
        },

        initialize: function () {
            this.render();
            this.listenTo(this.collection, 'reset', this.showProgressLevels, this);
            this.listenTo(this.collection, 'change', this.showProgressLevels, this);
            this.collection.fetch({reset: true});
            this.managedCollection = [];
        },

        uncoverTeamsList: function(e) {
            var view = this;
            var iconWidth = 60;
            var targetElement = this.$(e.currentTarget).find(".more-icons-number");
            var numberOfIcons = parseInt(targetElement.text());
            if(!isNaN(numberOfIcons)) {
                var tooltipPosition = targetElement.position();
                this.$el.find('#teams-uncovered-list')
                    .empty()
                    .css({
                        'top': tooltipPosition.top,
                        'left': tooltipPosition.left
                    })
                    .stop()
                    .animate({
                        width: iconWidth * numberOfIcons,
                        opacity: 1
                    }, 250);
                var taskNumber = targetElement.data('task');
                var taskTeams = _.find(this.managedCollection, function(level) {
                    return level.get('task') === taskNumber
                });
                _.each(taskTeams.get('teams'), function(team) {
                    if([targetElement.data('notshow'), 
                        window.localStorage.getItem('myTeam')].indexOf(team) == -1) {
                        var icon = $("<div></div>", {
                            class: 'icon ' + team.toLowerCase(),
                            title: team
                        });
                        view.$el.find('#teams-uncovered-list').append(icon);
                    }
                });
            }
        },

        coverTeamsList: function(e) {
            this.$el.find('#teams-uncovered-list')
                .stop()
                .animate({
                    width: 0,
                    opacity: 0
                }, 150, function() {
                    $(this).empty().css({
                        'width': 'auto',
                        'opacity': 1
                    });
                });
        },

        showProgressLevel: function(progressLevel) {
            var view = new FlyToMars.Views.ProgressLevel({model: progressLevel});
            this.$('#progress').append(view.render().el);
        },

        showProgressLevels: function() {
            var view = this;
            this.managedCollection = this.manageCollection();
            this.$("#mars").hide(0);
            this.$("#earth").hide(0);
            this.$('#progress').fadeOut(function() {
                view.$('#progress').empty();
                _.each(view.managedCollection, function(level) {
                    view.showProgressLevel(level); 
                });
                view.$("#mars").fadeIn();
                view.$("#earth").fadeIn();
                view.$('#progress').fadeIn();
            });
        },

        manageCollection: function() {
            var result = [];
            for(var i = FlyToMars.Constants.TOTAL_TASKS; i > 0; i--) {
                var teams = [];
                _.each(this.collection.where({current_task: i}), function(level) {
                    teams.push(level.get('name'));
                });
                result.push(new FlyToMars.Models.ProgressLevel({
                    task: i,
                    teams: teams
                }));
            }
            return result;
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

})();
