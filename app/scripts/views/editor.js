/*global FlyToMars, Backbone, JST*/

FlyToMars.Views = FlyToMars.Views || {};

(function () {
    'use strict';

    FlyToMars.Views.Editor = Backbone.View.extend({

        el: '#editor-container',

        template: JST['app/scripts/templates/editor.ejs'],

        events: {
            'change #ace-mode': function(e) {
                this.setEditorsMode(e);
            },
            'change #ace-theme': function(e) {
                this.setEditorsTheme(e);
            },
            'click #submit-answer': function() {
                this.verifyAnswer();
            }
        },

        initialize: function () {
            this.editor = {};
            this.defaultTheme = 'monokai';
            this.height = $(window).height() - 220;
            this.render();
        },

        verifyAnswer: function() {
            var code = this.editor.getSession().getValue();
            var answer = this.$el.find(".answer").val();
            var answerModel = new FlyToMars.Models.Answer({'team_id': 123});
            answerModel.set({'answer': answer, 'code': code});
            answerModel.save();
            if(!answerModel.isValid()) {
                alert(answerModel.validationError);
            } else {
                var verifyView = new FlyToMars.Views.Verify({model: answerModel});
                verifyView.$el.fadeIn();
            }
        },

        setEditorsMode: function(e) {
            this.editor.getSession().setMode('ace/mode/' + $(e.currentTarget).val().toLowerCase());
        },

        setEditorsTheme: function(e) {
            var oldTheme = this.editor.getTheme().split("/"),
                newTheme = $(e.currentTarget).val().toLowerCase();
            this.editor.setTheme('ace/theme/' + newTheme);
            this.setAnswerTheme(oldTheme[2], newTheme);
        },

        setAnswerTheme: function(oldTheme, newTheme) {
            this.$("input.answer")
                .removeClass('ace-' + oldTheme)
                .addClass('ace-' + newTheme);
        },

        render: function () {
            this.$el.html(this.template());
            this.$el.height(this.height);

            var theme = 'ace/theme/' + this.defaultTheme;
            var mode = 'ace/mode/python';
            this.editor = ace.edit('ace-editorid');
            this.editor.setTheme(theme);
            this.editor.getSession().setMode(mode);
            this.setAnswerTheme('', this.defaultTheme);
            
            return this;
        }

    });

})();
