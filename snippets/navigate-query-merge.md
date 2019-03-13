---
title: Route navigate with merging query params
level: intermediate
tags:
  - route
---
# Content

Navigate with query params:

the router will navigate to `/first/details?filter=new`
```html
<a [routerLink]="['/', 'first', 'details']"
   [queryParams]="{ filter: 'new' }">
  filter: new
</a>
```
with merge old query params:

the router will navigate to `/first/details?filter=new&sort=asc`
```html
<a [routerLink]="['/', 'first', 'details']"
   [queryParams]="{ sort: 'asc' }"
   queryParamsHandling="merge">
  sorting
</a>
```

