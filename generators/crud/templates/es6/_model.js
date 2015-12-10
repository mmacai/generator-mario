import {Model} from 'backbone';
import i18n from 'i18n';

export default Model.extend({
  defaults: {

  },
  validation: {
    author: [{
      required: true,
      msg: function() { return i18n.t('crud.errorMessages.isRequired'); }
    }, {
      authorPattern: { msg: 'crud.errorMessages.authorPattern', params: { pattern: ' §, $, &, * ' } }
    }, {
      minLength: 4,
      msg: function() { return i18n.t('crud.errorMessages.minLength', { numberOfCharacters: '4' }); }
    }],
    difficulty: [{
      required: true,
      msg: function() { return i18n.t('crud.errorMessages.isRequired'); }
    }, {
      range: [1, 5],
      msg: function() { return i18n.t('crud.errorMessages.inRange', { min: '1', max: '5' }); }
    }],
    text: [{
      required: true,
      msg: function() { return i18n.t('crud.errorMessages.isRequired'); }
    }, {
      minLength: 15,
      msg: function() { return i18n.t('crud.errorMessages.minLength', { numberOfCharacters: '15' }); }
    }],
    email: [{
      required: false,
      msg: function() { return i18n.t('crud.errorMessages.isRequired'); }
    }, {
      pattern: 'email',
      msg: function() { return i18n.t('crud.errorMessages.email'); }
    }],
    dateStart: [{
      required: true,
      msg: function() { return i18n.t('crud.errorMessages.isRequired'); }
    }, {
      dateBeforeToday: { msg: 'crud.errorMessages.dateBeforeToday' }
    }],
    dateEnd: [{
      required: true,
      msg: function() { return i18n.t('crud.errorMessages.isRequired'); }
    }, {
      dateBeforeToday: {msg: 'crud.errorMessages.dateBeforeToday'}
    }, {
      dateBeforeStart: [
        { msg: 'crud.errorMessages.dateBeforeStart' },
        { msg: 'crud.errorMessages.dateNotSpecified' }
      ]
    }]
  }
});
