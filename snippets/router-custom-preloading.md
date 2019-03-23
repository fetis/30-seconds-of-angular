---
title: Router Custom Preloading
author: maktarsis
level: intermediate

tags:
  - router
---

# Content
The topic covers preloading strategy that could help to manipulate modules preloading in the Angular application.

Angular Router provides _PreloadAllModules_ strategy for free, but _NoPreloading_ is enabled by default. This works well, but if our app is very large preloading every module in the background may cause unnecessary data to be loaded. Ideally, we would like to preload the core features on demand. This will allow core features to render immediately when the user navigates to the feature while keeping our core bundle small. As well as we continue to lazy load the rest of the less used features on demand when the user navigates.
```typescript
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class CustomPreloading implements PreloadingStrategy {
  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    const loadRoute = delay => delay === false
    ? load()
    : timer(300).pipe(mergeMap(load));

    return route.data && route.data['preload']
      ? loadRoute(route.data['delay'])
      : of(null);
  }
}
```
That example shows the preloading behavior if some module has a positive preload flag then he will be preloaded with a small delay, otherwise the custom preloader won't preload it.
# Links
https://angular.io/api/router/PreloadingStrategy
https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb
https://medium.com/@adrianfaciu/custom-preloading-strategy-for-angular-modules-b3b5c873681a
https://coryrylan.com/blog/custom-preloading-and-lazy-loading-strategies-with-angular

# ComponentCode
```typescript
import { Component, Inject } from '@angular/core';
@Component({
  selector: 'my-app',
  template: ``
})
export class AppComponent {}
```

# ModuleCode
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

class CustomPreloading implements PreloadingStrategy {
  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    const loadRoute = delay => delay === false
    ? load()
    : timer(300).pipe(mergeMap(load));

    return route.data && route.data['preload']
      ? loadRoute(route.data['delay'])
      : of(null);
  }
}

const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'items', 
        pathMatch: 'full' 
    },
    {
        path: 'items',
        loadChildren: 'app/items/items.module#ItemsModule',
        data: { preload: true, delay: false },
    },
    {
        path: 'item',
        loadChildren: 'app/details/details.module#DetailsModule',
        data: { preload: true, delay: true },
    }
];

const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [routing],
  exports: [RouterModule],
  providers: [CustomPreloading]
})
class RoutingModule {}

@NgModule({
  imports: [BrowserModule, RoutingModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
