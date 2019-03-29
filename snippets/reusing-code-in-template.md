---
title: Reusing code in template
author: fetis
level: intermediate 
tags:
  - templates
---

# Content
The best way to re-use your code is to create a component, but in some sutuations you would like to
keep everything in the same component.

To resovle this issue you can use `ng-template` and `*ngTemplateOutlet` directives.

```html
  <p>
    <ng-container *ngTemplateOutlet="fancyGreeting"></ng-container>
  </p>

  <button>
    <ng-container *ngTemplateOutlet="fancyGreeting"></ng-container>    
  </button>
  
  <ng-template #fancyGreeting>
    Hello <b>{{name}}!</b>
  </ng-template>
```

# Links
https://angular.io/api/common/NgTemplateOutlet
https://angular.io/guide/structural-directives#the-ng-template

# ComponentCode
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <p>
    <ng-container *ngTemplateOutlet="fancyGreeting"></ng-container>
  </p>

  <button>
    <ng-container *ngTemplateOutlet="fancyGreeting"></ng-container>    
  </button>
  
  <ng-template #fancyGreeting>
    Hello <b>{{name}}!</b>
  </ng-template>
  `,
})
export class AppComponent  {
  name = 'Angular';
}
````
