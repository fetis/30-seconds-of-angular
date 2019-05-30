---
title: Dynamic Components
author: safinalexey
twitter: safinalexey
level: advanced
tags:
- tip
---

# Content
TBD Dynamic Components

# ComponentCode
```typescript
import { Component } from '@angular/core';
import { ComponentFactoryResolver, ViewChild, ViewContainerRef
 } from '@angular/core'


@Component({
  selector: 'my-widget',
  template: `<div>I'm widget</div>`
})
export class Widget {
}
  
@Component({
  selector: 'my-app',
  template: `<button (click)="addWidget()">Add component</button>
<div #container></div>`
})
export class AppComponent  {
  @ViewChild('container', {read: ViewContainerRef}) container: any;


  constructor(private crf: ComponentFactoryResolver) {}


  addWidget() {
    let factory = this.crf.resolveComponentFactory(Widget)
    this.container.createComponent(factory)
  }
}

```

# ModuleCode
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, Widget } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, Widget],
  bootstrap: [AppComponent],
  entryComponents: [ Widget ]
})
export class AppModule {}
```
