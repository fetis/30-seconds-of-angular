---
title: Two-way binding any property
author: NothingEverHappens
twitter: kirjs
level: intermediate
tags:
- tip
- binding
---

# Content
Similar to how you can two-way bind `[(ngModel)]` you can two-way bind custom property on a component, for example `[(value)]`. To do it use appropriate Input/Output naming:

```typescript
@Component({
  selector: 'super-input', 
  template: `...`,
})
export class AppComponent {
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();
}
```

Then you can use it as:
```html
<super-input [(value)]="value"></super-input>
```

# ComponentCode
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'super-input', 
  template: `
    Select the value:
    <button (click)="valueChange.emit('1')">Set to 1</button>
    <button (click)="valueChange.emit('2')">Set to 2</button>
  `,
})
export class SuperInputComponent {
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'my-app',
  template: `
    <h1>{{value}}</h1>
    <super-input [(value)]="value"></super-input>
  `
})
export class AppComponent {
  value = '0';
}
```

# ModuleCode
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, SuperInputComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, SuperInputComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
