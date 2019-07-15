---
title: SVG templates
author: kirjs
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

# file:app.component.ts
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.svg'
})
export class AppComponent {}
```
# file:app.svg
```svg
<circle r=100 fill=red></circle>
```
