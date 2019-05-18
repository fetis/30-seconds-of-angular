---
title: Loader Component
level: beginner
author: thekiba
twitter: thekiba_io
tags:
  - tips
  - good-to-know
  - components
  - templates
  
links: 
  - https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b
  - https://blog.angularindepth.com/https-medium-com-thomasburleson-animated-ghosts-bfc045a51fba
---

# Content
You can create own helper component and use it instead of `*ngIf`.

```typescript
@Component({
  selector: 'loader',
  template: `
    <ng-content *ngIf="!loading else showLoader"></ng-content>
    <ng-template #showLoader>🕚 Wait 10 seconds!</ng-template>
  `
})
class LoaderComponent {
  @Input() loading: boolean;
}
```

For usage example:
```html
<loader [loading]="isLoading">🦊 🦄 🐉</loader>
```

> Note that the content will be eagerly evaluated, e.g. in the snippet below `destroy-the-world` will be created before the loading even starts:

```html
<loader [loading]="isLoading"><destroy-the-world></destroy-the-world></loader>
```

# ComponentCode
```typescript 
import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  template: `
    <ng-content *ngIf="!loading else showLoader"></ng-content>
    <ng-template #showLoader>🕚 Wait 10 seconds!</ng-template>
  `
})
export class LoaderComponent {
  @Input() loading: boolean;
}

@Component({
  selector: 'my-app',
  template: `
    <button (click)="isLoading = !isLoading">
      Toggle
    </button>
    <loader [loading]="isLoading">
      🦊 🦄 🐉
    </loader>
  `
})
export class AppComponent {
  isLoading: boolean = true;
}
```

# ModuleCode
```typescript  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, LoaderComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, LoaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
