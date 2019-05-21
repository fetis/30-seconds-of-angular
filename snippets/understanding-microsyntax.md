---
title: Understanding Microsyntax
author: kirjs
twitter: kirjs
level: beginner
tags:
- tip
- structural directive
- microsyntax

links:
- https://angular.io/guide/structural-directives#microsyntax
- https://alexzuza.github.io/ng-structural-directive-expander/
- https://angular.io/guide/structural-directives#inside-ngfor
---

# Content
Under the hood Angular compiles structural directives into ng-template elements, e.g.:

```html
<!-- This -->
<div *ngFor="let item of [1,2,3]">

<!-- Get expanded into this -->
<ng-template ngFor [ngForOf]="[1,2,3]" let-item="$implicit"></ng-template>
```

The value passed to *ngFor directive is written using microsyntax. You can learn about it [in the docs](https://angular.io/guide/structural-directives#microsyntax). 

Also check out an [interactive tool](https://alexzuza.github.io/ng-structural-directive-expander/) that shows the expansion by [Alexey Zuev](https://twitter.com/yurzui)
