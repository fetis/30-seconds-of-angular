---
title: Reusing code in template
author: fetis
level: intermediate 
tags:
  - templates
---

# Content
While the best way of reusing your code is creating a component, it's also possible to do it in a template.

To do this you can use `ng-template` along with `*ngTemplateOutlet` directive.

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
```
