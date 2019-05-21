---
title: Renaming inputs and outputs
author: Alex Kulagin
level: beginner
tags:
- components
- templates
links:
- https://angular.io/guide/styleguide#style-05-13
---

# Content
In certain cases `@Input` and `@Output` properties can be named differently than the actual inputs and outputs.

```html
<div 
  pagination 
  paginationShowFirst="true"
  (paginationPageChanged)="onPageChanged($event)">
</div>
```

```typescript
@Directive({ selector: '[pagination]'})
class PaginationComponent {
  @Input('paginationShowFirst') 
  showFirst: boolean = true;

  @Output('paginationPageChanged') 
  pageChanged = new EventEmitter();
}
```
> Note: Use this wisely, see [StyleGuide recommedation](https://angular.io/guide/styleguide#style-05-13)
