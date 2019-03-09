---
title: Route navigate
tags:
  - tips
  - good-to-know
---
# Content

Route navigation in template: 

Basic:
```html
<a routerLink="/first/details">link</a>
```

With segments in array:
```html
<a [routerLink]="['/', 'first', 'details']">link</a>
```

Navigate to up:
```html
<a [routerLink]="['../', 'second', 'details']">link</a>
```

Navigate to fragment:

the router will navigate to `/first/details#anchor`
```html
<a [routerLink]="['../', 'second', 'details']"
  fragment="anchor">
  Anchor
</a>
```

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


Navigate with matrix params:

the router will navigate to `/first;name=foo/details`
```html
<a [routerLink]="['/', 'first', {name: 'foo'}, 'details']">
  link with params
</a>
```

Navigate with outlets:

```html
<a [routerLink]="['/', 'first', { outlets: { header: ['full'], footer: ['small'] } }]">
  link with outlets
</a>
```


# Bonus
I'm amazing bonus, I should be expandeable and collapseable

# Links
