'use strict';

define([
  'underscore',
  'marionette',
  'templates'
], function (_, Marionette, JST) {
  return Marionette.ItemView.extend({
    template: JST['<%= templatePath %>'],

    events: {
      'click button.create': 'createItem',
      'change input, textarea': function (event) {
        var $el = $(event.target);
        var id = $el.attr('id');
        var value = $el.val();

        this.model.set(id, value);
      }
    },

    initialize: function () {
      this.model.set('created', Date.now());
    },

    templateHelpers: function () {
      return {
        validation: this.model.validate()
      };
    },

    modelEvents: {
      'change': function () {
        this.render();
      }
    },

    createItem: function (e) {
      e.preventDefault();

      if (!this.model.validate()) {
        var data = _.object(_.map(this.$('form').serializeArray(), _.values));
        this.model.set(data);

        this.trigger('<%= featureName %>:createItem', this.model);
      }
    }
  });
});
