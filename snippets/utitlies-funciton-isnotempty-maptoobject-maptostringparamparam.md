---
title: utitlies Funciton isNotEmpty, mapToObject, mapToStringParamParam
author: ngnam
level: beginner
links:
- https://github.com/ngnam/ngn-filter-advanced/blob/master/src/app/filter-advanced/utilities.ts
tags:
- tip
---
# Content

```typescript
export function mapToStringParam(params: Object) {
    let httpParams: HttpParams = new HttpParams();
    for (const property in params) {
        if (params.hasOwnProperty(property) && isNotEmpty(params[property])) {
            httpParams = httpParams.set(property, params[property]);
        }
    }
    return httpParams.toString();
}

```


