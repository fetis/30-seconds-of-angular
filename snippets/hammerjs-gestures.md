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

# Bonus

Here are samples on how to use all of the `hammerjs` event bindings, you can use these events with a `HostListener` as well:

```HTML
  <!-- pan events -->
  <div (pan)="logEvent($event)"></div>
  <div (panstart)="logEvent($event)"></div>
  <div (panmove)="logEvent($event)"></div>
  <div (panend)="logEvent($event)"></div>
  <div (pancancel)="logEvent($event)"></div>
  <div (panleft)="logEvent($event)"></div>
  <div (panright)="logEvent($event)"></div>
  <div (panup)="logEvent($event)"></div>
  <div (pandown)="logEvent($event)"></div>

  <!-- pinch events -->
  <div (pinch)="logEvent($event)"></div>
  <div (pinchstart)="logEvent($event)"></div>
  <div (pinchmove)="logEvent($event)"></div>
  <div (pinchend)="logEvent($event)"></div>
  <div (pinchcancel)="logEvent($event)"></div>
  <div (pinchin)="logEvent($event)"></div>
  <div (pinchout)="logEvent($event)"></div>

  <!-- press events -->
  <div (press)="logEvent($event)"></div>
  <div (pressup)="logEvent($event)"></div>

  <!-- rotate events -->
  <div (rotate)="logEvent($event)"></div>
  <div (rotatestart)="logEvent($event)"></div>
  <div (rotatemove)="logEvent($event)"></div>
  <div (rotateend)="logEvent($event)"></div>
  <div (rotatecancel)="logEvent($event)"></div>

  <!-- swipe events -->
  <div (swipe)="logEvent($event)"></div>
  <div (swipeleft)="logEvent($event)"></div>
  <div (swiperight)="logEvent($event)"></div>
  <div (swipeup)="logEvent($event)"></div>
  <div (swipedown)="logEvent($event)"></div>

  <!-- tap event -->
  <div (tap)="logEvent($event)"></div>
```