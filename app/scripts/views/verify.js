/*global FlyToMars, Backbone, JST*/

FlyToMars.Views = FlyToMars.Views || {};

(function () {
    'use strict';

    FlyToMars.Views.Verify = Backbone.View.extend({

        el: '#modal',

        template: JST['app/scripts/templates/verify.ejs'],

        events: {
            'click #verify-retry': function() {
                this.retryTask();
            },
            'click #verify-go': function() {
                this.nextTask();
            }
        },

        initialize: function() {
            this.render();
        },

        checkAnswer: function() {
            var view = this;
            $.when(this.refereeCall()).then(function(response) {
                if(response.status === 'APPROVED') {
                    view.correctAnswer();
                }
                else if(response.status === 'NOT_APPROVED') {
                    view.wrongAnswer();
                } else {
                    setTimeout(function() {
                        view.checkAnswer();
                    }, 1000);
                }
            });
        },

        refereeCall: function() {
            return $.ajax({
                url: FlyToMars.Urls.getRefereeAnswer,
                data: JSON.stringify({'team_id': 0, 'task': 2})
            });
        },

        wrongAnswer: function() {
            var view = this;
            this.$el.find('.please-wait').fadeOut();
            this.$el.find('#loader').fadeOut(function() {
                view.$el.find('#verifier').show(0).addClass('not-zoomed');
                view.$el.find('#opinion-wrong').show(0);
            });
        },

        correctAnswer: function() {
            var view = this;
            this.$el.find('.please-wait').fadeOut();
            this.$el.find('#loader').fadeOut(function() {
                view.$el.find('#opinion-success').show(0);
            });
        },

        nextTask: function() {
            this.$el.fadeOut(function() {
                vent.trigger('begin');
            });
        },

        retryTask: function() {
            var view = this;
            this.$el.fadeOut(function() {
                view.$el.find("#verifier").hide(0);
                view.$el.find("#loader").hide(0);
            });
        },

        render: function () {
            this.$el.html(this.template());
            this.$el.find("#loader").show();
            this.$el.find('.please-wait').show();
            this.$el.find('.opinion').hide(0);
            
            var view = this;
            setTimeout(function() {
                view.checkAnswer();
            }, 1000);
            return this;
        }

    });

})();
