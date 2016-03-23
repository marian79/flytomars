/*global FlyToMars, Backbone, JST*/

FlyToMars.Views = FlyToMars.Views || {};

(function () {
    'use strict';

    FlyToMars.Views.Team = Backbone.View.extend({

        template: JST['app/scripts/templates/team.ejs'],

        tagName: 'li',

        className: 'team',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }

    });

})();
