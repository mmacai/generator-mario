'use strict';

define([
  'backbone',
  'marionette',
  'templates',
  'underscore'
], function (Backbone, Marionette, JST, _) {
  return Marionette.ItemView.extend({
    template: JST['<%= templatePath %>'],
    ui: {
      remove: 'button.remove',
      save: 'button.save'
    },
    triggers: {
      'click @ui.remove': '<%= featureName %>:removeItem'
    },
    events: {
      'click @ui.save': 'save',
      'change input, textarea': function (event) {
        var $el = $(event.target);
        var id = $el.attr('id');
        var value = $el.val();

        this.model.set(id, value);
      }
    },
    templateHelpers: function () {
      this.model = this.model || new Backbone.Model({});
      return {
        validation: this.model.validate()
      };
    },
    modelEvents: {
      'change': function () {
        this.render();
      }
    },
    save: function (e) {
      e.preventDefault();

      if (!this.model.validate()) {
        var data = _.object(_.map(this.$('form').serializeArray(), _.values));
        this.model.unset('isPublished');
        this.model.set(data);
        this.trigger('<%= featureName %>:save', {view: this, model: this.model});
      }
    }
  });
});
