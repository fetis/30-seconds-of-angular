---
title: ng-content
level: beginner
author: thekiba
tags:
  - good-to-know
  - tips
  - components
---

# Content
With `ng-content` you can pass any elements to a component. 
This simplifies creating reusable components.

```typescript
@Component({
  selector: 'wrapper',
  template: `
    <div class="wrapper">
      <ng-content></ng-content>
    </div>
  `,
})
export class Wrapper {}
```

```html
<wrapper>
  <h1>Hello World!</h1>
</wrapper>
```

# Links
https://medium.com/p/96a29d70d11b


# ComponentCode
```typescript
import { Component } from '@angular/core';

function template(useClass: string): string {
  return `
    <div class="${useClass}">
      <ng-content></ng-content>
    </div>
  `;
}

@Component({
  selector: 'card',
  template: template('card')
})
export class Card {}

@Component({
  selector: 'card-header',
  template: template('card-header')
})
export class CardHeader {}

@Component({
  selector: 'card-body',
  template: template('card-body')
})
export class CardBody {}

@Component({
  selector: 'my-app',
  template: `
    <app-card>
      <app-card-header>
        Header
      </app-card-header>
      <app-card-body>
        Body
      </app-card-body>
    </app-card>
  `
})
export class AppComponent {}
```

# ModuleCode
```typescript  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, CardBody, CardHeader, Card } from './app.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, CardBody, CardHeader, Card],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
