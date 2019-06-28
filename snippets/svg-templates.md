---
title: svg templates
author: NothingEverHappens
twitter: kirjs
level: intermediate
tags:
- tip
---

# Content
It is possible to use `.svg` file as a component template: 

```typescript
@Component({
  templateUrl: 'app.svg'
})
```

# ComponentCode
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app.svg'
})
export class AppComponent {}
```