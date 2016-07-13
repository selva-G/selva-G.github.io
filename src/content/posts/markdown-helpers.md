---
layout: post.hbs
pageTitle: Markdown hbs helpers - Metalsmith
title: Markdown HBS helpers
collection: posts
date: 2016-06-28
---

## Callouts

Provides more weightage to the content

#### Usage
```text
```callout-success
Callouts are cool & simple
``````

#### Example

```callout-success
This post is cool
```

```callout-info
This post is informative
```

```callout-warning
This post is not informative
```

```callout-error
This post is outdated
```

---

## iframe

Used to embed iframe

#### Usage

```hbs
{{escape-hbs '{{iframe src="http://jsfiddle.net/selvaG/4kgwP/6/embedded/result/" height="400"}}'}}
```

#### Example

{{iframe src="http://jsfiddle.net/selvaG/4kgwP/6/embedded/result/" height="400"}}
