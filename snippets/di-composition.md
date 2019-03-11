---
title: DI Composition
tags:
  - intermediate
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
https://stackblitz.com/edit/angular-cdk-happy-animals

# ComponentCode
import { Injectable, Component, HostBinding, HostListener, OnInit, OnDestroy } from '@angular/core';

@Injectable()
export class ItemsLinker implements OnDestroy {
  links: Set<ItemComponent> = new Set();

  activate(item: ItemComponent) {
    this.links.forEach((link) => link.deactivate());
    item.activate();
  }
  deactivate(item: ItemComponent) {
    item.deactivate();
  }

  register(item: ItemComponent) {
    this.links.add(item);
  }
  unregister(item: ItemComponent) {
    this.links.delete(item);
  }

  ngOnDestroy() {
    this.links.clear();
  }
}

@Component({
  selector: 'item',
  template: `
    <ng-content></ng-content>
  `
})
export class ItemComponent implements OnInit, OnDestroy {

  @HostBinding('class.selected') isActivated: boolean = false;

  constructor(@Host() private linker: ItemsLinker) {}

  @HostListener('click') onClick() {
    this.isActivated
      ? this.linker.deactivate(this)
      : this.linker.activate(this);
  }

  activate() {
    this.isActivated = true;
  }
  deactivate() {
    this.isActivated = false;
  }

  ngOnInit() {
    this.linker.register(this);
  }
  ngOnDestroy() {
    this.linker.unregister(this);
  }
}

@Component({
  selector: 'items',
  template: '<ng-content></ng-content>',
  providers: [ ItemsLinker ]
})
export class ContainerComponent {}

@Component({
  selector: 'my-app',
  template: `
    <items>
      <item>🦊</item>
      <item>🦄</item>
      <item>🐉</item>
    </items>
  `,
  styles: [
    `
      .selected {
        background: #309eed;
      }
    `
  ]
})
export class AppComponent {}

# ModuleCode
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, ContainerComponent, ItemComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    ContainerComponent,
    ItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
