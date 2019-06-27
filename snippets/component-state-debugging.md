---
title: Component State Debugging
author: lironHazan
twitter: lironn_h
level: beginner
tags:
  - good-to-know
  - tips 
links:
  - https://blog.angularindepth.com/everything-you-need-to-know-about-debugging-angular-applications-d308ed8a51b4
---
# Content

Debug the component state in the browser console by running:
```typescript
ng.probe($0).componentInstance
```

> `$0` - is the DOM node currently selected in dev tools (`$1` for the previous one and so on).

# Bonus

With Ivy renderer engine:
```typescript
ng.getComponent($0)
```
  
# file:app.component.ts
```typescript
import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  template: `<h1>1. Open browser dev tools</h1>
  <h2>2. Make sure I'm selected in the elements panel</h2>
  <h3>3. type <code>ng.probe($0).componentInstance</code> in the console to get access to the component instance. </h3>
  `
})
export class AppComponent {
  secretProperty = '42';
}
```
