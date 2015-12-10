import Backbone from 'backbone';
import Marionette from 'marionette';
import * as JST from 'templates';
import _ from 'underscore';

export default Marionette.ItemView.extend({
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
      let $el = $(event.target);
      let id = $el.attr('id');
      let value = $el.val();

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
  save(e) {
    e.preventDefault();

    if (!this.model.validate()) {
      let data = _.object(_.map(this.$('form').serializeArray(), _.values));
      this.model.unset('isPublished');
      this.model.set(data);
      this.trigger('<%= featureName %>:save', {view: this, model: this.model});
    }
  }
});
