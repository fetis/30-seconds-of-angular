---
title: Window Location injection
author: fetis
twitter: fetis26
level: intermediate

tags:
  - dependency-injection
  - testing
  
links: 
  - https://itnext.io/testing-browser-window-location-in-angular-application-e4e8388508ff
  - https://angular.io/guide/dependency-injection
  
---

# Content
For testing purposes you might want to inject `window.location` object in your component.
You can achieve this with custom `InjectionToken` mechanism provided by Angular.

```typescript
export const LOCATION_TOKEN = new InjectionToken<Location>('Window location object');

@NgModule({
  providers: [
    { provide: LOCATION_TOKEN, useValue: window.location }
  ]
})
export class SharedModule {}

//...

@Component({
})
export class AppComponent {
  constructor(
    @Inject(LOCATION_TOKEN) public location: Location
  ) {}
}
``` 

# file:app.component.ts
```typescript
import { Component, Inject } from '@angular/core';
import { LOCATION_TOKEN } from './app.module';

@Component({
  selector: 'my-app',
  template: `{{ location.href }}`
})
export class AppComponent {
  constructor(
    @Inject(LOCATION_TOKEN) public location: Location
  ) {}

  useIt() {
    this.location.assign('xxx');
  }
}
```
# file:app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { AppComponent } from './app.component';

export const LOCATION_TOKEN = new InjectionToken<Location>('Window location object');

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [
    { provide: LOCATION_TOKEN, useValue: window.location }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
