<% if(ecma === 6) { %>import App from './app';
import 'bootstrap';<% if(styles === 'less') { %>
import '../styles/main.less';<% } else { %>
import '../styles/main.scss';<% } %>
import i18n from 'i18n';
import configureApp from 'helpers/configure';
import configureValidation from 'helpers/validation';

configureApp(() => {
  i18n.init({fallbackLng: 'en', debug:true}, (err, t) => {
    configureValidation(t);
    App.start();
  });
});<% } else { %>'use strict';

require([
  'i18n',
  'helpers/configure',
  'helpers/validation',
  'app',<% if(styles === 'less') { %>
  '../styles/main.less',<% } else { %>
  '../styles/main.scss',<% } %>
  'bootstrap'
], function(i18n, configureApp, configureValidation, App) {
    configureApp(function() {
      i18n.init({fallbackLng: 'en', debug:true}, function(err, t) {
        configureValidation(t);
        App.start();
      });
    });
});<% } %>
