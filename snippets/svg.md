---
title: SVG
author: kirjs
twitter: kirjs
level: advanced
tags:
- tip
- SVG
---

# Content
It is possible to use SVG tags in your Angular component, to create beautiful graphs and visualizations. There are 3 things you need to know: 

1. When binding an SVG attribute, use `attr`
```html
<circle [attr.cx]="x" [attr.cy]="y"></circle>
```

2. When creating sub-components, use attribute and not tag selector:
```html
// Not: <child-component></child-component>
<g child-component></g>
```
```typescript
@Component({selector: '[child-component]' })
```

3. When using SVG tags in sub-components use svg prefix:
```typescript
@Component({
  selector: '[child-component]',
  template: `<svg:circle></svg:circle>`
})
```

# file:app.component.ts
```typescript
import { Component, Input } from '@angular/core';

function generateData() {
  return Array.from(new Array(10)).map(index => ({
    index,
    value: Math.round(Math.random() * 80)
  }));
}

@Component({
  selector: '[kirjs-ticks]',
  template: `
    <svg:text
      *ngFor="let item of data; let i = index; trackBy: getIndex"
      [attr.x]="barSpace * (i + 0.3)"
      style="text-anchor: center"
      fill="black"
    >
      {{ i }}
    </svg:text>
  `
})
export class TicksComponent {
  @Input() data;
  @Input() barWidth = 30;
  padding = 10;
  barSpace = this.padding + this.barWidth;

  getIndex(i: number) {
    return i;
  }
}

@Component({
  selector: 'my-app',
  template: `
    <svg style="width:600px; height: 600px">
      <g
        *ngFor="let item of data; let i = index; trackBy: getIndex"
        [style.transform]="
          'translate(' + barSpace * i + 'px, ' + (320 - item.value) + 'px)'
        "
      >
        <rect
          [attr.width]="barWidth"
          [attr.height]="item.value"
          fill="pink"
          stroke="black"
          stroke-width="1"
        ></rect>

        <text [attr.x]="barWidth / 2" y="-10">{{ item.value }}</text>
      </g>
      <g kirjs-ticks style="transform: translate(0, 350px);" [data]="data"></g>
    </svg>
  `
})
export class AppComponent {
  barWidth = 30;
  padding = 10;
  barSpace = this.padding + this.barWidth;
  data = generateData();

  constructor() {
    window.setInterval(() => {
      this.data = generateData();
    }, 1000);
  }

  getIndex(a, b) {
    return a;
  }
}

```

# file:app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, TicksComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, TicksComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
