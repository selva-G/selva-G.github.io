import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src'],

  email: '',
  size: 200,

  src: function() {
    var email = this.get('email');
    var size = this.get('size');

    return !Ember.isEmpty(email)? "http://www.gravatar.com/avatar/" + md5(email) + "&s=" + size : '';
  }.property('email', 'size')
});
