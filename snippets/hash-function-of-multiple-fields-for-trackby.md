---
title: Hash function of multiple fields for trackBy
author: thekiba
twitter: thekiba_io
level: beginner
tags:
  - tip
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
