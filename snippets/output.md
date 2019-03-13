---
title: Input / Output decorators
author: maktarsis
level: beginner
tags:
  - components

---
# Content
Output decorator has been created to communicate between components thought emitting events.

**@Output** and **EventEmitter** do the opposite to **@Input**. You can pass the data from child to parent component. 
```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-decision',
  template: `<button (click)="decision.emit(true)">True</button>`,
})
export class AppDecision {
  @Output() decision: EventEmitter<boolean> = new EventEmitter<boolean>();
}

 @Component({
   selector: 'app-dashboard',
   template: `<app-decision (decision)="getDecision($event)"></app-decision>`,
 })
 export class AppDashboard {
   getDecision(decision: boolean): void { ... };
 }
 ```
We get a value in the parent component through event argument to the function which invokes on every output emit.
There you can handle emitted value from the child as you want.

# Bonus
Change detection **onPush** strategy works very well with presentational component that has onPush strategy without any complex logic. It leads to the case when the component updates only when gets new value

# Links
https://angular.io/api/core/Output
https://angular.io/api/core/EventEmitter
https://medium.com/datadriveninvestor/angular-7-share-component-data-with-other-components-1b91d6f0b93f
