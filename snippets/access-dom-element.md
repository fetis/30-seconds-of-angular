---
title: Access DOM Element
author: alQlagin
level: intermediate
tags:
- components
- dom
links:
- https://stackblitz.com/edit/angular-tooltipjs-directive?file=src%2Fapp%2Ftooltip.directive.ts 
- https://angular.io/api/core/ElementRef
- https://angular.io/guide/security
---

# Content
In rare cases when you need to access DOM element directly, you can get it by requiring `ElementRef` in your construtor. 
```typescript
@Directive({selector: '[tooltip]'})
export class TooltipDirective implements OnInit, OnDestroy {
  private readonly tooltip: Tooltip;
  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }
}
```
> Note: Try avoiding direct DOM manipulation except the cases when it's the only option, such as interaction with 3rd party libraries.
