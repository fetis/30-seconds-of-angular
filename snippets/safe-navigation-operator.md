---
title: Safe Navigation Operator
level: beginner
author: alex-bu-93
tags:
  - object property handling
  - tips
  - good to know
links:
  - https://github.com/angular/angular/issues/791
---

# Content
The [Safe Navigation Operator](https://angular.io/guide/template-syntax#the-safe-navigation-operator----and-null-property-paths) helps with preventing null-reference exceptions in component template expressions. It returns object property value if it exists or null otherwise.

```html
<p> I will work even if student is null or undefined: {{student?.name}} </p>
```

# Bonus
```html
{{a?.b?.c}} 
```
Underneath will be compiled to.
```html
(_co.a == null)? null: ((_co.a.b == null)? null: _co.a.b.c));
```

# ComponentCode
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    This code will generate an error:
    <p> {{student.name}} </p>
    
    This code will work correctly:
    <p> {{student?.name}} </p>
  `
})
export class AppComponent {
    student: {name: string, otherProperties: any} | null = null
}
```

# ModuleCode
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
