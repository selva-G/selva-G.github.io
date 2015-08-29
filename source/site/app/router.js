import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', { path: '/' });

  this.route('demos', function() {
    this.route('carousel', function() {
      this.route('simple', { path: '/' });
      this.route('rich');
      this.route('fancy');
    });

    this.route('fbvideo');
  });
  
  this.route('codeworks');
});

export default Router;
