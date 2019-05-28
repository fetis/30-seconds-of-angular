---
title: Safe Navigation Operator
level: beginner
author: alex_bu
tags:
  - object property handling
  - tips
  - good to know
---

# Content
The Safe Navigation Operator helps to prevent null-reference exceptions while rendering component template.
In fact, it returns object property value if it exists or null if not.

```html
<p> I will work even if student is null or undefined: {{student?.name}} </p>
```

# Bonus
```html
<!-- Alternatives -->
<p *ngIf="student">{{student?.name}} </p>
<p>{{student && student.name}}</p>
<p>{{student ? student.name : ''}}</p>

<!-- Crazy deep nesting -->
<p> Respect if {{you?.are?.angular?.developer}} </p>
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
