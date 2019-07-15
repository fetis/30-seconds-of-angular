---
title: Access DOM Element
author: alQlagin
level: intermediate
links:
- https://stackblitz.com/edit/angular-tooltipjs-directive?file=src%2Fapp%2Ftooltip.directive.ts
- https://angular.io/api/core/ElementRef
- https://angular.io/guide/security
tags:
- components
- dom
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

# file:app.component.ts
```typescript
import { Component } from '@angular/core';

import { Attribute, Directive, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import Tooltip from 'https://unpkg.com/popper.js';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy {
  
  private tooltip: Tooltip;
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Attribute('title') private text: string
  ) { }

  ngOnInit() {
    const content = document.createElement('div');
    content.innerText = this.text;
    this.tooltip = new Tooltip(this.elementRef.nativeElement, content);
  }

  ngOnDestroy() {
    if (this.tooltip) {
      document.body.removeChild(this.tooltip.popper);
      this.tooltip.dispose();
    }
  }
  
  @HostListener('mouseover')
  over() {
    document.body.appendChild(this.tooltip.popper);
  }

  @HostListener('mouseout')
  out() {
    document.body.removeChild(this.tooltip.popper);
  }
}

@Component({
  selector: 'my-app',
  template: `<h1 tooltip title="Tooltip content">Hover me</h1>`
})
export class AppComponent {}
```
# file:app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, TooltipDirective } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, TooltipDirective],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
