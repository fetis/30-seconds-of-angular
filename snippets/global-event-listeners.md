---
title: Global event listeners
author: kirjs
level: intermediate
tags:
  - events
  - components
---
# Content
It is possible to add global event listeners in your Components/Directives with `HostListener`. Angular will take care of unsubscribing once your directive is destroyed.

```typescript
@Directive({
  selector: '[rightClicker]'
})
export class ShortcutsDirective {
  @HostListener('window:keydown.ArrowRight')
  doImportantThings() {
    console.log('You pressed right');
  }
```


# Bonus
You can have multiple bindings:

```typescript
  @HostListener('window:keydown.ArrowRight')
  @HostListener('window:keydown.PageDown')
  next() {
    console.log('Next')
  }
```

You can also pass params:

```typescript
  @HostListener('window:keydown.ArrowRight', '$event.target')
  next(target) {
    console.log('Pressed right on this element: ' target)
  }
```

# ComponentCode
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <h2>Try using your keyboard.</h2>
  <h1>Last pressed: {{lastPressed}} </h1>`
})
export class AppComponent {
  lastPressed = 'nothing';
  @HostListener('window:keydown.ArrowRight', ['$event.key'])
  next(key: string) {
    this.lastPressed = key;
  }
}
