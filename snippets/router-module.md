---
title: Router module
author: alQlagin
twitter: alQlagin
level: beginner
tags:
- routing

links:
- https://angular.io/guide/router#refactor-the-routing-configuration-into-a-routing-module
---

# Content
When having a separate routing module, instead of creating an NgModule you can export router configuration directly:

```typescript 
export const AppRoutingModule = RouterModule.forRoot(routes, config);
```
or 

```typescript 
export const FeatureRoutingModule = RouterModule.forChild(routes);
```

and use it in your module

```typescript 
@NgModule({
  imports: [
    ...
    AppRoutingModule,
    ...
  ]
})
```
