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
You can declare router configuration in concise way

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

It helps to avoid creating class with own meta and reduce lines of code
