---
title: Loaders
tags:
  - tips
---
# Content

Loader options

```typescript
import { Component, VERSION, Directive, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <button (click)="model = !model">Toggle</button>

  First:
  <div *ngIf="model; else loading">
    Model
  </div>
  <ng-template #loading>
    <my-loading></my-loading>
  </ng-template>

  Second:
  <div *ngIf="model">
    Model
  </div>
  <my-loading *ngIf="!model"></my-loading>

  Third:
  <div *ngIf="model withLoading">
    Model
  </div>
  `,
})
export class AppComponent {
  model;

  ngOnInit() {
    setTimeout(() => { this.model = 'something'},1000)
  }
}

@Component({
  selector: 'my-loading',
  template: `
    <div>Loading...</div>
  `
})
export class LoadingComponent { }


@Directive({
  selector: '[ngIfWithLoading]',
})
export class LoadingDirective {
  @Input() set ngIf(val: any) {
    if (!val) {
      const factory = this.resolver.resolveComponentFactory(LoadingComponent);
      this.vcRef.createComponent(factory)
    }
  };

  constructor(private vcRef: ViewContainerRef, private resolver: ComponentFactoryResolver) { }
}

```

# Links

https://ng-run.com/edit/NQjQLpRClM7rQeMVSulo?open=app%2Fapp.component.ts
