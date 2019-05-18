---
title: Default ViewEncapsulation value
author: kirjs
twitter: kirjs
level: beginner
tags:
  - configuration  
  - styling
---
# Content
If you're using `ViewEncapsulation` value which is different than default, it might be daunting to set the value manually for every component. 

Luckily you can configure it globally when bootstrapping your app:

```TypeScript
platformBrowserDynamic().bootstrapModule(AppModule, [
  {
    // NOTE: Use ViewEncapsulation.None only if you know what you're doing.
    defaultEncapsulation: ViewEncapsulation.None
  }
]);
``` 

# ComponentCode
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>I am red </h1>`,
  styles: [` body {background: red}; `]
})
export class AppComponent {}
```

# MainCode
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { ViewEncapsulation } from '@angular/core'

platformBrowserDynamic().bootstrapModule(AppModule, [
  {
    defaultEncapsulation: ViewEncapsulation.None
  }
]);
```
