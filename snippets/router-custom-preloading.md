---
title: Router Custom Preloading
author: maktarsis
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
The topic covers preloadingStrategy API that could help us in preloading modules on demand.

So, **@angular/router** provides _PreloadAllModules_ and _NoPreloading_ strategies, and the last one is enabled by default. It works well, but sometimes we need to customize the behavior of preloading. If our app is very large, preload every module in the background may cause unnecessary data to be loaded. Ideally, we would like to preload the core features on demand. This will allow core features to render immediately when the user navigates to the feature while keeping our core bundle small. As well as we continue to lazy load the rest of the less used features on demand when the user navigates.
```typescript
import { Observable, of } from 'rxjs';

export class CustomPreloading implements PreloadingStrategy {
  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    return preloadingConnection() ? load() : of(null);
  }
}
```
That example shows the preloading behavior. 
So, if user has a good network connection, then an application will preload every module, otherwise that strategy won't preload lazy chunks.

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
