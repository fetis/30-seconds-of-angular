---
title: Route navigate with matrix params
level: beginner
tags:
  - route
---
# Content

Navigate with matrix params:

the router will navigate to `/first;name=foo/details`
```html
<a [routerLink]="['/', 'first', {name: 'foo'}, 'details']">
  link with params
</a>
```
