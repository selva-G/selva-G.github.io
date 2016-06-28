var $ = function(selector) {
  if (!(this instanceof $)) {
    return new $(selector);
  }
  this.push(...Array.prototype.slice.apply(document.querySelectorAll(selector)));
  return this;
}

// Array-like
$.prototype = {
  length: 0,
  splice: Array.prototype.splice,
  push: Array.prototype.push,
  pop: Array.prototype.pop
};

$.prototype.addClass = function(className) {
  this.each(function(element) {
    element.classList.add(className);
  });
  return this;
}

$.prototype.removeClass = function(className) {
  this.each(function(element) {
    element.classList.remove(className);
  });
  return this;
}

$.prototype.toggleClass = function(className) {
  this.each(function(element) {
    element.classList.toggle(className);
  });
  return this;
}

$.prototype.each = function(iteratee, callback) {
  var index;
  if (Array.isArray(iteratee)) { //TODO: should check for array-like
    for (index=0, length=iteratee.length; index<length; index++) {
      callback.call(iteratee[index], index, iteratee[index]);
    }
  } else {
    for (index in iteratee) {
      callback.call(iteratee[index], index, iteratee[index]);
    }
  }
}
