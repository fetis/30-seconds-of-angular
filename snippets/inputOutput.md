---
title: Input / Output decorators

author: maktarsis

level: beginner

tags:
  - components
---

# Content
@Input and @Output decorators have been created to communicate between components in the straightforward way. 

If you want to pass data from the parent component to the child component, then you need to use two things: **@Input** and property binding. 
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name',
  template: `
    <p>Name: {{name}}</p>
  `,
})
export class AppName {
  @Input() name: string;
}
```
This gives the option to add an attribute to the component (selector <app-name>)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-person',
  template: `
    <app-name [name]="name"></app-name>
  `,
})
export class AppPerson {
  name = 'Max';
}
```
In that component, we declare a variable _name_ that passes to the child component. 
The result of markup is 'Name: Max"'

By the way, **@Output** and EventEmitter do the opposite. You can pass data from the child to the parent component. 
Again, we have to declare a variable but in this time with the @Output decorator and a new EventEmitter(event binding)
```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-decision',
  template: `
    <button (click)="emitDecision(true)">True</button>
    <button (click)="emitDecision(false)">False</button>
  `,
})
export class AppDecision {
  @Output() decision: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  emitDecision(decision): void {
    this.decision.emit(decision)
  }
}
```
That code represents child component that emits event to the parent component after each click on the button
 ```typescript
 import { Component } from '@angular/core';
 
 @Component({
   selector: 'app-dashboard',
   template: `
     <p *ngIf="decision !== undefined">
        Value: {{ decision }}
     </p>   
     <app-decision (decision)="getDecision($event)"></app-decision>     
   `,
 })
 export class AppDashboard {
   decision: boolean;
   
   getDecision(decision: boolean): void {
     this.decision = decision;
   }
 }
 ```
 We get a value in the parent component through event argument to the function which invokes on every output emit.
There you can handle emitted value from the child as you want.

# Bonus
Change detection **onPush** strategy works very well with presentational component that has onPush strategy without any complex logic. It leads to the case when the component updates only when gets new values

# Links
https://angular.io/api/core/Input

https://angular.io/api/core/Output

https://angular.io/api/core/EventEmitter

https://medium.com/datadriveninvestor/angular-7-share-component-data-with-other-components-1b91d6f0b93f
