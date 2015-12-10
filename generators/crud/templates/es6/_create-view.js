import _ from 'underscore';
import Marionette from 'marionette';
import * as JST from 'templates';

export default Marionette.ItemView.extend({
  template: JST['<%= templatePath %>'],

  events: {
    'click button.create': 'createItem',
    'change input, textarea': function (event) {
      let $el = $(event.target);
      let id = $el.attr('id');
      let value = $el.val();

      this.model.set(id, value);
    }
  },

  initialize() {
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

  createItem(e) {
    e.preventDefault();

    if (!this.model.validate()) {
      let data = _.object(_.map(this.$('form').serializeArray(), _.values));
      this.model.set(data);

      this.trigger('<%= featureName %>:createItem', this.model);
    }
  }
});
