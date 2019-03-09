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

Navigate with object params:

the router will navigate to /first;name=foo/details
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
