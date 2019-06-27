---
title: Observables as outputs
author: NothingEverHappens
twitter: kirjs
level: intermediate
tags:
- tip
- outputs
---

# Content
`EventEmitters`  used for `@Output`'s are just Observables with an emit method. 

This means that you can just use `Observable` instance instead, e.g. we can wire up FormControl value changes directly:

```TypeScript
readonly checkbox = new FormControl();
@Output() readonly change = this.checkbox.valueChanges;
```

# file:app.component.ts
```typescript
import { Component, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-child', 
  template: `<input type=checkbox [formControl]="control">`
})
export class ChildComponent {
  readonly control = new FormControl();
  @Output() valueChange = this.control.valueChanges
}

@Component({
  selector: 'my-app',
  template: `
  <h1>{{value}}</h1>
  <my-child (valueChange)="value = $event"></my-child> `
})
export class AppComponent {
  value = 'Check or uncheck';
}
```

# file:app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, ChildComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent, ChildComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
