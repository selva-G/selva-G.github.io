import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('journal');
  this.route('blog');
  this.route('archive');
  this.route('playground', function() {
    this.route('ember');
    this.route('d3');
    this.route('css');
  });
});

export default Router;
