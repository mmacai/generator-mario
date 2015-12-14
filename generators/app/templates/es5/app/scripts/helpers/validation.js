'use strict';

define([
    'underscore',
    'backbone'
], function(_, Backbone) {

  function configureValidation(t) {

    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

    _.extend(Backbone.Validation.validators, {
      dateBeforeToday: function (value, attr, customValue) {
        if (value) {
          var date = value.split('-');
          var today = new Date();
          var newDateFormat = new Date(date[0], date[1] - 1, date[2]);

          if (today < newDateFormat) {
            return t(customValue.msg);
          }
        }
      },
      dateBeforeStart: function (value, attr, customValue, model) {
        var startDate = model.get(customValue[0].dateStartId);

        if (value) {
          if (startDate) {
            var endDate = value.split('-');
            startDate = startDate.split('-');
            var start = new Date(startDate[0], startDate[1] - 1, startDate[2]);
            var end = new Date(endDate[0], endDate[1] - 1, endDate[2]);

            if (end < start) {
              return t(customValue[0].msg);
            }
          } else {
            return t(customValue[1].msg);
          }
        }

      },
      authorPattern: function (value, attr, customValue) {
        if (value) {
          var pattern = /^[^§$&*]+$/;

          if (!pattern.test(value)) {
            return t(customValue.msg, customValue.params);
          }
        }
      }
    });
  }

  return configureValidation;
});
