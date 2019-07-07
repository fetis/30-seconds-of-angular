---
title: Using APP_INITIALIZER to delay app start
author: NothingEverHappens
twitter: kirjs
level: intermediate
tags:
- tip

links:
- https://hackernoon.com/hook-into-angular-initialization-process-add41a6b7e
- https://angular.io/api/core/APP_INITIALIZER
---

# Content
It is possible to execute asynchronous task before the app start by providing a function returning promise using `APP_INITIALIZER` token.

```typescript
@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useValue:  functionReturningPromise
      multi: true
    },
})
export class AppModule {}


```

# ModuleCode
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
 
@NgModule({
  imports: [BrowserModule], 
   providers: [
    {
      provide: APP_INITIALIZER,
      useValue:  ()=>new Promise(resolve => {
        // LOL, this app will never load.
        //  don't do it in prod!
        window.setTimeout(resolve, 1000000);
      }),
      multi: true
  }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```