---
title: hammerjs-gestures
level: beginner
author: MichaelSolati
twitter: MichaelSolati
tags:
  - good-to-know
  - tips
  - components
  - gestures
links:
  - https://github.com/angular/angular/blob/master/packages/platform-browser/src/dom/events/hammer_gestures.ts
  - http://hammerjs.github.io/api/#hammer.manager
  - https://angular.io/api/platform-browser/HammerGestureConfig
---

# Content

With `hammerjs` you can use a `HostListener` decorator, or an event binding, to act upon swipes, pans, and pinhces as well as other gestures.

```bash
npm install hammerjs
```

```typescript
@HostListener('swiperight')
public swiperight(): void {
  // Run code when a user swipes to the right
}
```

# ComponentCode

```typescript
// Using a HostListener
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-swiper-stop-swiping',
  template: '<ng-content></ng-content>'
})
export class SwiperStopSwipingComponent {
  @HostListener('swiperight')
  public swiperight(): void {
    // Run code when a user swipes to the right
    alert('STOP SWIPING TO THE RIGHT');
  }
}
```

```typescript
// Using an event binding
import { Component } from '@angular/core';

@Component({
  selector: 'app-swiper-stop-swiping',
  template: `
    <div (swiperight)="swiperight($event)">
      <ng-content></ng-content>
    </div> 
   `
})
export class SwiperStopSwipingComponent {
  public swiperight($event): void {
    // Run code when a user swipes to the right
    alert('STOP SWIPING TO THE RIGHT');
  }
}
```

# MainCode

```typescript
import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

```
