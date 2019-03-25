---
title: DI Composition
level: intermediate
author: thekiba
tags:
  - tips
  - components
  - dependency-injection
---

# Content
Generally we get one service instance per the whole application. 
It is also possible to create an instance of service per component or directive. 

```typescript
@Component({
  selector: 'provide',
  template: '<ng-content></ng-content>',
  providers: [ Service ]
})
export class ProvideComponent {}
```

```typescript
@Component({
  selector: '[provide]',
  providers: [ Service ]
})
export class ProvideDirective {}
```

# Links
https://angular.io/guide/hierarchical-dependency-injection#component-level-injectors

https://stackblitz.com/edit/angular-cdk-happy-animals

# ComponentCode
```typescript
import { Injectable, Component, OnInit, OnDestroy, Host } from '@angular/core';

@Injectable()
export class ItemsLinker implements OnDestroy {
  links: Set<ItemComponent> = new Set();

  link(item: ItemComponent) {
    this.links.add(item);
  }
  unlink(item: ItemComponent) {
    this.links.delete(item);
  }

  ngOnDestroy() {
    this.links.clear();
  }
}

@Component({
  selector: 'item',
  template: '<ng-content></ng-content>'
})
export class ItemComponent implements OnInit, OnDestroy {

  constructor(@Host() private linker: ItemsLinker) {}

  ngOnInit() {
    this.linker.link(this);
  }
  ngOnDestroy() {
    this.linker.unlink(this);
  }
}

@Component({
  selector: 'items',
  template: '<ng-content></ng-content>',
  providers: [ ItemsLinker ]
})
export class ItemsComponent {}

@Component({
  selector: 'my-app',
  template: `
    <items>
      <item>🦊</item>
      <item>🦄</item>
      <item>🐉</item>
    </items>
  `
})
export class AppComponent {}
```

# ModuleCode
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, ItemsComponent, ItemComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
