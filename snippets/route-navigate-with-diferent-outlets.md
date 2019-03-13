---
title: Route navigate with diferent outlets
level: intermediate
author: Jamaks
tags:
  - route
---
# Content

Navigate with diferent outlets:

```html
<a [routerLink]="['/', 'first', { outlets: { header: ['full'], footer: ['small'] } }]">
  link with outlets
</a>
```