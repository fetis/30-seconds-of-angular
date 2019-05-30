---
title: Access DOM Element
author: alQlagin
level: intermediate
tags:
- components
- dom
links:
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
> Note: Try avoiding direct DOM monipulation unless the cases when it's the only option, such as interaction with 3rd party libraries.

# ComponentCode
```typescript
import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import Tooltip from 'tooltip.js';
@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy {
  private tooltip: Tooltip;
  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit() {
    this.tooltip = new Tooltip(this.elementRef.nativeElement, {
      title: 'hi!!'
    });
  }

  ngOnDestroy() {
    if (this.tooltip) {
      this.tooltip.dispose();
    }
  }
}
```
