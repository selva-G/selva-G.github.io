import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', { path: '/' });

  this.route('demos', function() {
    this.route('carousel');
    this.route('fbvideo');
    this.route('magnifier');
  });

  this.route('codeworks');
});

export default Router;
