---
title: Input decorator
author: maktarsis
level: beginner
tags:
  - components

---
# Content
Input decorator has been created to communicate between parent and child components in the straightforward way from parent to child.

If you want to pass data from the parent component to the child component, then you need to use two things: **@Input** and property binding. 
This gives the option to add an attribute to the component (selector <app-name>)
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name',
  template: `<p>Name: {{ name }}</p>`
})
export class AppName {
  @Input() name: string;
}

@Component({
  selector: 'app-person',
  template: `<app-name [name]="personName"></app-name>`,
})
export class AppPerson {
  personName = 'Max';
}
```

# Links
https://angular.io/api/core/Input
https://medium.com/datadriveninvestor/angular-7-share-component-data-with-other-components-1b91d6f0b93f

# ComponentCode
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name',
  template: `<p>Name: {{ name }}</p>`
})
export class AppName {
  @Input() name: string;
}

@Component({
  selector: 'app-person',
  template: `<app-name [name]="personName"></app-name>`,
})
export class AppPerson {
  personName = 'Max';
}
