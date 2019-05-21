---
title: Reusing existing custom pipes
author: kirjs
twitter: kirjs
level: intermediate

tags:
- tip
- pipes
- library

links:
- https://github.com/danrevah/ngx-pipes
---

# Content
If you need a custom `pipe`, before creating one, consider checking out the [NGX Pipes package](https://github.com/danrevah/ngx-pipes) which has 70+ already implemeted custom pipes.

Here are some examples:

```html
<p>{{ date | timeAgo }}</p> 
<!-- Output: "last week" -->

<p>{{ 'foo bar' | ucfirst }}</p>
<!-- Output: "Foo bar" -->

<p>3 {{ '3 Painting' | makePluralString: 3 }}</p>
<!-- Output: "3 Paintings" -->

<p>{{ [1, 2, 3, 1, 2, 3] | max }}</p>
<!-- Output: "3" -->
```

