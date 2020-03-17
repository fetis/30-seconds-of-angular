---
title: Tracking ngFor by multiple fields
author: thekiba
twitter: thekiba_io
level: beginner
tags:
  - trackBy
  - ngFor
links:
  - https://angular.io/api/common/NgForOf
---

# Content

It's possible to track `*ngFor` items by multiple fields by concatenating them:

```
trackBy(index: number, animal: Animal): string {
  return [ animal.name, animal.type, … ].join('🦊');
}
```
