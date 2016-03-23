/*global FlyToMars, Backbone, JST*/

FlyToMars.Views = FlyToMars.Views || {};

(function () {
    'use strict';

    FlyToMars.Views.Tasks = Backbone.View.extend({

        el: '#task-definition',

        template: JST['app/scripts/templates/tasks.ejs'],

        events: {},

        initialize: function () {
            this.render();
            this.listenTo(this.collection, 'reset', this.addAllTasks);
            
            this.collection.fetch({reset: true});
            this.collection.reset([
                new FlyToMars.Models.Task({title: 'First assignment', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', active: true}),
            ]);
        },

        addTask: function(task) {
            var taskView = new FlyToMars.Views.Task({model: task});
            this.$('#tasks').append(taskView.render().el);
        },

        addAllTasks: function(){
            this.collection.each(function(task) {
                if(task.get('active')) {
                    this.addTask(task);
                }
            }, this);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

})();
