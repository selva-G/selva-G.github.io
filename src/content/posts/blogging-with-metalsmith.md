---
layout: post.hbs
pageTitle: Blogging with Metalsmith
title: Blogging with Metalsmith
collection: posts
date: 2016-07-11
draft: true
---

Metalsmith is a JS static site generator.

## Why Metalsmith?

It all started when exploring Metalsmith for our technical documentation. And, I built this blog to serve as a POC. There are few reasons to opt for Metalsmith though

1. Plugin architecture. At core, metalsmith is merely 200 lines of code. Its architecture is what it gives the flexibility & composability. Similar to gulp, but built with blogging in mind.
2. Its Javascript, my all time favorite playground.

```callout-warning
Many plugins lacks documentation & some are not quite active. Often, you'll find yourself into the plugin's source code to learn the plugin APIs. Hope this changes soon.
```

At core, metalsmith takes files as an input, invokes the plugins on them & transforms them into static assets. Simplest form, would be

```js
Metalsmith(__dirname)
  .source('src/')
  .destination('build/')
  .build(function(err) {
    if (err) throw error;
  })
```

