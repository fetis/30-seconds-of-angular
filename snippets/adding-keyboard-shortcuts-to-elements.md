---
title: Adding keyboard shortcuts to elements
author: kirjs
level: intermediate
tags:
  - tips
  - good-to-know
---
# Content

It's really easy to add keyboard shortcuts in the template: 
```html
<textarea (keydown.ctrl.enter)="doSomething()"></textarea>
```


# Bonus

```html
<input (keydown.enter)="...">
<input (keydown.a)="...">
<input (keydown.esc)="...">
<input (keydown.shift.esc)="...">
<input (keydown.control)="...">
<input (keydown.alt)="...">
<input (keydown.meta)="...">
<input (keydown.9)="...">
<input (keydown.tab)="...">
<input (keydown.backspace)="...">
<input (keydown.arrowup)="...">
<input (keydown.shift.arrowdown)="...">
<input (keydown.shift.control.z)="...">
<input (keydown.f4)="...">
```

# Links

https://alligator.io/angular/binding-keyup-keydown-events

  
# ComponentCode
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h2>Type something in the input and hit control+enter to 
        update the value below:</h2>

    <h1>{{value || 'no value'}}</h1>
    <input (keydown.control.enter)="value=$event.target.value; $event.target.value = ''">
  `
})
export class AppComponent {
    value: string;
}
```
