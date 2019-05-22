---
title: Access DOM Element
author: Alex Kulagin
level: intermediate
tags:
- components
- dom
links:
- https://angular.io/api/core/ElementRef
- https://angular.io/guide/security
---

# Content
When your 3rd party library needs access to dom element you can provide it with ElementRef. 
```typescript
@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy {
  private tooltip: Tooltip;
  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }
}
```
Be aware! Direct dom manipulations are bad practice

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
