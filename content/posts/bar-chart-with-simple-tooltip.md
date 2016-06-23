---
layout: post.jade
pageTitle: Simple Tooltip - D3
title: Bar Chart with Simple Tooltip
drafts: true
---

D3js is such an awesome framework that helps out in manipulating the DOM based on data. The data is bound to the nodes and is made available on every operators (.style(), .attr() , etc).

I just found damn easy to build basic charts with d3. In this post, i will just show you building an basic bar chart with simple tooltip implementation without using any external library for tooltips.

I make use of the DOM API  `Element.getBoundingClient()`. The above api seems very useful in many cases (atleast for me) and found it be compatible with all latest browsers. Moz definition for `getBoundingClientRect()`

> Returns a text rectangle object that encloses a group of text rectangles.

You might have a quick look on [John Resig's post on getBoundingClientRect](http://ejohn.org/blog/getboundingclientrect-is-awesome/).

I just skip on building of bar chart with d3 as there are tons of examples available out there.
I have build a [bar chart](http://jsfiddle.net/selvaG/4kgwP/3/) with some sample data.

Now onto the next step of implementing tooltip that has to be shown on mouseover of the rect bars. I used the bootstrap (css alone) for the tooltips. All we need to do is to append the tooltip div to the body and position it on mouseover and clear them on mouseout.

We can register a `mouseover` and `mouseout` event listeners on the rect bars using `.on` operator.
The listener function gets called with the current datum bound with the bar , current index and this being the current DOM element. [Reference](https://github.com/mbostock/d3/wiki/Selections#wiki-on)

Using the getBoundingClientRect(), we can get the dimensions of the rect bar.  Thereby we can pass the left and top position to the tooltip function along with the data to be displayed.

```javascript

.on('mouseover', function(d) {
  var clientRect = this.getBoundingClientRect();
  toolTip.show( {top: clientRect.top, left: clientRect.left + clientRect.width/2 }, d );
})
.on('mouseout', function(d) {
  toolTip.cleanup();
});

```

You could view the end result [here](http://jsfiddle.net/selvaG/4kgwP/6/).

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="500" src="http://jsfiddle.net/selvaG/4kgwP/6/embedded/result/" width="100%"></iframe>
