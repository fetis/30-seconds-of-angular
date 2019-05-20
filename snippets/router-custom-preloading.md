---
title: Router Custom Preloading
author: maktarsis
twitter: maktarsis
level: intermediate

tags:
  - router
links:
  - https://angular.io/api/router/PreloadingStrategy
  - https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb
  - https://medium.com/@adrianfaciu/custom-preloading-strategy-for-angular-modules-b3b5c873681a
  - https://coryrylan.com/blog/custom-preloading-and-lazy-loading-strategies-with-angular

---

# Content
Angular allows us to control the way module preloading is handled.

There are 2 strategies provided by **@angular/router**: `PreloadAllModules` and `NoPreloading`. The latter enabled by default, only preloading lazy modules on demand.

We can override this behavior by providing custom preloading strategy: In the example below we preload all included modules if the connection is good.

```typescript
import { Observable, of } from 'rxjs';

export class CustomPreloading implements PreloadingStrategy {
  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    return preloadingConnection() ? load() : of(null);
  }
}

const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: CustomPreloading
});
```
> Note that that the example above would not be very efficient for larger apps, as it'll preload all the modules.

# ComponentCode
```typescript
import { Component } from '@angular/core';
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
import { PreloadingStrategy, Route, Routes, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';

function preloadingConnection(): boolean {
  const connection = navigator['connection'];
  if (connection) {
    const effectiveType = connection.effectiveType || '';
    if (connection.saveData || effectiveType.includes('2g')) {
      return false;
    }
  }
  return true;
}

class CustomPreloading implements PreloadingStrategy {
  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    return  preloadingConnection() ? load() : of(null);
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
      loadChildren: 'app/items/items.module#ItemsModule'
  },
  {
      path: 'item',
      loadChildren: 'app/details/details.module#DetailsModule'
  }
];

const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: CustomPreloading
});

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
