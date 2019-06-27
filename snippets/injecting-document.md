---
title: Injecting document
author: kirjs
twitter: kirjs
level: intermediate
tags:
  - dependency injection
links:
  - https://angular.io/api/common/DOCUMENT
---
# Content
Sometimes you need to get access to global `document`. 

To simplify unit-testing, Angular provides it through dependency injection:

```typescript
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Edit me </h1>`
})
export class AppComponent {

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Word with document.location, or other things here....
  }
}
```

# file:app.component.ts
```typescript
  
import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Edit me </h1>`
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {
    // Don't do this in prod!
    document.body.style.backgroundColor = 'pink';
  }
}
```
