---
title: How to inject Window object
author: fetis26
level: intermediate

tags:
  - di
  - testing
---

# Content
For testing purposes you might want to inject Window object in your component.
You can achieve this with custom `InjectonToken` mechanism provided by Angular.

```typescript
export const LOCATION_TOKEN = new InjectionToken<Location>('Window location object');

@Component({
  providers: [
    { provide: LOCATION_TOKEN, useValue: window.location }
  ]
})
export class SomeComponent {
  constructor(
    @Inject(LOCATION_TOKEN) private location: Location
  ) {}

  useIt() {
    this.location.assign('xxx');
  }
}

```

It's also possible to provide this token on the app level by declaring it in your
`AppModule`.

# Links
https://itnext.io/testing-browser-window-location-in-angular-application-e4e8388508ff
https://angular.io/guide/dependency-injection
