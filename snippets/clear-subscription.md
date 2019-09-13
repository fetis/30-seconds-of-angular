---
title: Clear subscription method
level: intermediate
author: alex-bu-93
twitter: alex_bu_93
tags:
  - subscribe / unsubscribe
  - tips
  - good to know
links:
  - https://angular.io/guide/comparing-observables#cancellation
  - https://blog.angularindepth.com/why-you-have-to-unsubscribe-from-observable-92502d5639d0
---

# Content
Working with asynchronous data it's needed to subscribe to events and sometimes unsubscribe forcibly on demand. Here is a simple declarative reusable way: 

```typescript
import { SubscriptionLike } from 'rxjs';
export function clearSubscription(subscription: SubscriptionLike) {
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
  }
}
```

For examples use:
```typescript
// get items list by http request
let mySubscription = this.http.get('api/items-list-end-point').subscribe(res => workWithRes(res));
// or listen to formGroup changes
let mySubscription = this.formGroup.valueChanges.subscribe(val => workWithVal(val));

// clear it when needed
import { clearSubscription } from 'my-reusable-functions'
clearSubscription(this.mySubscription);
```

# file:app.component.ts
```typescript
import { Component, OnDestroy } from '@angular/core';
import { HttpClient }           from '@angular/common/http';
import { SubscriptionLike }     from 'rxjs';

function clearSubscription(subscription: SubscriptionLike) {
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
  }
}

@Component({
  selector: 'app-root',
  template: `
    <p>Open your network tab,
      click the button very quickly and
      see statuses of the request that are not finished on next click
    </p>
    <button (click)="onNextTodo()">Get next todo</button>
  `
})
export class AppComponent implements OnDestroy {
  curTodoId = 1;
  todoItemSubscription: SubscriptionLike;

  constructor(private http: HttpClient) {
    this.getTodoById(this.curTodoId);
  }

  onNextTodo(): void {
    clearSubscription(this.todoItemSubscription);
    this.curTodoId += 1;
    this.getTodoById(this.curTodoId);
  }

  getTodoById(id: number): void {
    this.todoItemSubscription = this.http.get(`http://deelay.me/2000/https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(res => console.log(res))
  }

  ngOnDestroy(): void {
    clearSubscription(this.todoItemSubscription);
  }
}
```

# file:app.module.ts
```typescript  
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```
