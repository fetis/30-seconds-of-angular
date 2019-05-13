---
title: trackBy in for loops
author: maktarsis
level: beginner

tags:
  - good-to-know
  - tips
  - components
  - performance
  
links: 
  - https://angular.io/api/common/NgForOf
  - https://angular.io/api/core/TrackByFunction
---

# Content
To avoid the expensive operations, we can help Angular to track which items added or removed i.e. customize the default tracking algorithm by providing a trackBy option to NgForOf.

So you can provide your custom trackBy function that will return unique identifier for each iterated item. 
For example, some key value of the item. If this key value matches the previous one, then Angular won't detect changes.

**trackBy** takes a function that has _index_ and _item_ args. 

```typescript
@Component({
  selector: 'my-app',
  template: `
    <ul>
      <li *ngFor="let item of items; trackBy: trackByFn">{{item.id}}</li>
    </ul>
  `
})
export class AppComponent { 
  trackByFn(index, item) {
    return item.id;
  }
}
```
If trackBy is given, Angular tracks changes by the return value of the function. 

Now when you change the collection, Angular can track which items have been added or removed according to the unique identifier and create/destroy only changed items.

# ComponentCode
```typescript
import { Component } from '@angular/core';

interface Item {
    id: string;
}

@Component({
  selector: 'my-app',
  template: `
    <ul>
      <li *ngFor="let item of items; trackBy: trackByFn">{{item.id}}</li>
    </ul>
  `
})
export class AppComponent {
 items = [
   {id: 1},
   {id: 2},
   {id: 3}
 ];

  trackByFn(index: number, item: Item) {
    return item.id;
  } 
}

```
