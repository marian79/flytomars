/*global FlyToMars, Backbone, JST*/

FlyToMars.Views = FlyToMars.Views || {};

(function () {
    'use strict';

    FlyToMars.Views.ProgressLevel = Backbone.View.extend({

        template: JST['app/scripts/templates/progressLevel.ejs'],

        tagName: 'li',

        className: 'progress-level',

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
