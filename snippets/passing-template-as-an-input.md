---
title: Passing template as an input
author: fetis
level: intermediate
tags:
  - template
---
# Content
It's possible to pass a tempplate as parameter for a component to customize the render

```typescript
@Component({
  template: `
    <nav>
      <ng-container *ngTemplateOutlet="template"></ng-container>
    </nav>
  `,
})
export class SiteMenuComponent  {
  @Input() template: TemplateRef<any>
}

...

<site-menu [template]="menu1"></site-menu>

<ng-template #menu1>
  <div><a href="#">item1</a></div>
  <div><a href="#">item2</a></div>
</ng-template>
```

# Links
https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet/

# ComponentCode
```typescript
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'site-menu',
  template: `
    <nav>
      <ng-container *ngTemplateOutlet="template"></ng-container>
    </nav>
  `,
})
export class SiteMenuComponent  {
  @Input() template: TemplateRef<any>
}

@Component({
  selector: 'my-app',
  template: `
<site-menu [template]="menu1"></site-menu>

<ng-template #menu1>
  <div><a href="#">item1</a></div>
  <div><a href="#">item2</a></div>
</ng-template>  
  `
})
export class AppComponent {}
````

````

# ModuleCode
```typescript
// This section is optional, remove it if the code below is good.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, SiteMenuComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, SiteMenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
