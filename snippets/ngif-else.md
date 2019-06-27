---
title: ngIf else
author: fetis
twitter: fetis26
level: beginner
tags:
  - ngif
  - templates
---
# Content
`*ngIf` directive also supports `else` statement.

```html
<div *ngIf="isLoading; else notLoading">loading...</div>

<ng-template #notLoading>not loading</ng-template>
```

# file:app.component.ts
```typescript
import { Component, HostBinding } from '@angular/core';

@Component({
   selector: 'my-app', 
   template: `
<div *ngIf="isLoading; else notLoading">loading...</div>

<ng-template #notLoading>not loading</ng-template>
`,
  },
  
)
export class AppComponent {
  isLoading = false
}
```


# file:app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
