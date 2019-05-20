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
Sometimes you need prefixed inputs and outputs in template

```html
<div 
  pagination 
  paginationShowFirst="true"
  (paginationPageChanged)="onPageChanged($event)">
</div>
```

You can rename input to avoid property name bloating

```typescript
class PaginationComponent {
  @Input('paginationShowFirst') 
  showFirst: boolean = true;

  @Output('paginationPageChanged') 
  pageChanged = new EventEmitter();
}
```
