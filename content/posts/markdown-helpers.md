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
```hbs
{{escape-hbs '{{callout type="success" message="This post is cool"}}'}}
```

#### Example
{{callout type="success" message="This post is cool"}}
{{callout type="info" message="This post is informative"}}
{{callout type="warning" message="This post is not informative"}}
{{callout type="error" message="This post is outdated"}}

---

## iframe

Used to embed iframe

#### Usage

```hbs
{{escape-hbs '{{iframe src="http://jsfiddle.net/selvaG/4kgwP/6/embedded/result/" height="400"}}'}}
```

#### Example

{{iframe src="http://jsfiddle.net/selvaG/4kgwP/6/embedded/result/" height="400"}}
