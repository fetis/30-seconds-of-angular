---
title: Preseving whitespaces
author: NothingEverHappens
level: intermediate
tags:
- tip

links:
- https://twitter.com/mgechev/status/1108913389277839360
---

# Content
By default Angular strips all whitespaces in templates to save bytes. Generally it's safe.

For rare cases when you need to preserve spaces you can use special `ngPreserveWhitespaces` attribute:

```html
<div ngPreserveWhitespaces>
             (___()'`;
             /,    /`
       jgs   \\"--\\
</div>
```

> You can also use [preserveWhitespaces](https://angular.io/api/core/Component#preserveWhitespaces) option on a component. 

# file:app.component.ts
```typescript
import { Component } from '@angular/core';

@Component({
  preserveWhitespaces: false,
  selector: 'my-app',
  template: `
  
  <h1> Look at mee in dev tools! :( </h1>
<div>
                  __
             (___()'';
             /,    /
       jgs   \\"--\\
</div>

 <h1> Now look at me, I'm cute!! </h1>
<div ngPreserveWhitespaces>
                  __
             (___()'';
             /,    /
       jgs   \\"--\\
</div>



  `
})
export class AppComponent {}
```
