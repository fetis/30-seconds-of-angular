---
title: Enum in template
author: fetis
level: beginner
tags:
  - enums
  - templates
---
# Content
Enums are great but they are not visible in Angular templates by default. 
With this little trick you can make them accessible.

```typescript
enum Animals {
  DOG,
  CAT,
  DOLPHIN
}

...
@Component({
  ...
})
export class AppComponent {
  animalsEnum: typeof Animals = Animals;
}
```

  
# ComponentCode
import { Component } from "@angular/core";

enum Animals {
  DOG,
  CAT,
  DOLPHIN
}

@Component({
  selector: "app-root",
  template: `<div *ngIf="value === animalsEnum.CAT">meow</div>`,
})
export class AppComponent {
  value: Animals = Animals.CAT;
  animalsEnum = Animals;
}
