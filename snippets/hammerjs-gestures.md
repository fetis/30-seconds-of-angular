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
  - http://hammerjs.github.io/api/#hammer.manager
  - https://angular.io/api/platform-browser/HammerGestureConfig
---

# Content

With `hammerjs` you can use the `HostListener` decorator to act upon swipes, pans, pinhces, as well as other gestures.

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
import { Component } from '@angular/core';

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