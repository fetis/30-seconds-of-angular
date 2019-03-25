---
title: Loader Component
level: beginner
author: thekiba
tags:
  - tips
  - good-to-know
  - components
  - templates
---

# Content
You can create own helper component and use it instead of `*ngIf`.

```typescript
@Component({
  selector: 'loader',
  template: `
    <ng-content *ngIf="!loading else showLoader"></ng-content>
    <ng-template #showLoader>
      Come away with me to the Anywhere City!
    </ng-template>
  `
})
class LoaderComponent {
  @Input() loading: boolean;
}
```

For usage example:
```html
<loader [loading]="loading">🦊 🦄 🐉</loader>
```

# Links

https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b

# ComponentCode
```typescript 
import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  template: `
    <ng-content *ngIf="!loading else showLoader"></ng-content>
    <ng-template #showLoader>
      Come away with me to the Anywhere City!
    </ng-template>
  `
})
export class LoaderComponent {
  @Input() loading: boolean;
}

@Component({
  selector: 'my-app',
  template: `
    <button (click)="loading = !loading">
      Toggle
    </button>
    <loader [loading]="loading">
      🦊 🦄 🐉
    </loader>
  `
})
export class AppComponent {
  loading: boolean = true;
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
