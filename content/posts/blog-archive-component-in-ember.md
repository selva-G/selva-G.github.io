---
layout: post.hbs
pageTitle: Blog Archive - Emberjs
title: A simple Blog Archive using Ember Component
collection: posts
date: 2013-08-13
---

{{callout type="error" message="This post is outdated"}}

In this post, I'll show you how to build a simple blog archive as a component using Em.Component. Before start coding, lets skim at the Ember.Components

- An Ember.Component is an isolated Ember.View whose context and controller properties are set to the view itself. (You can find this at https://github.com/emberjs/ember.js/blob/master/packages/ember-views/lib/views/component.js#LC89-93).  
- The property access and target action in the templates goes to the view by default.
- However, the component inherits a controller from the context in which it is used. We can also send an action to the components' controller by calling `sendAction()` method. You can view the implementation  here.

Lets go with building a simple blog-archive.
When you register a component, the templates are looked into the `components/` structure.

```handlebars
{{!components/blog-archive.hbs}}
{{blog-archive content=content}}
```

Now we can define our `App.BlogArchiveComponent`

```js
App.BlogArchiveComponent = Ember.Component.extend({
  months: [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  archives: function(){
     //code logic to return an tree-like array as year --> months --> posts
  }.property('content.length')
});
```

Now to determine whether each year or month is expanded or not, we need to have a flag for each item. We can make use of itemController (may be an ObjectController) which wraps each item in an array.

```hbs
{{#each archives itemController="yearItem"}}
  <a {{action toggleProperty 'isExpanded'}}>
    <i {{bindAttr class="isExpanded:icon-chevron-down:icon-chevron-right"}}></i>
    {{key}}
  </a>
  <span class="muted"> ({{totalYearPosts}}) </span>
  {{#if isExpanded}}
    {{#each value itemController="monthItem"}}
      <a {{action toggleProperty 'isExpanded'}}>
        <i {{bindAttr class="isExpanded:icon-chevron-down:icon-chevron-right"}}></i>{{key}}
      </a>
      <span class="muted"> ({{value.length}}) </span>
      {{#if isExpanded}}
        {{#each value}}
          {{#linkTo 'post' this}}{{name}}{{/linkTo}}
        {{/each}}
      {{/if}}  
    {{/each}}
  {{/if}}
{{/each}}
```

The itemControllers are defined as,

```js
App.YearItemController = Ember.ObjectController.extend({
  isExpanded: false,
  totalYearPosts: function(){
    var totalPosts = 0;    
    this.get('content.value').forEach(function(post,idx){
      totalPosts += post.get('value.length');
    })
    return totalPosts;
  }.property()
});

App.MonthItemController = Ember.ObjectController.extend({
  isExpanded: false
});
```

You can view it in action in the below fiddle.

{{iframe src="http://jsfiddle.net/selvaG/2Kmx8/3/embedded/" height="400"}}
