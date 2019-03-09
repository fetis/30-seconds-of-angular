---
title: ng-content

tags:
  - tips
  - good-to-know
---

# Content
С помощью **ng-content** можно передать в компонент любое созедржимое и отобразить его. Это сделает использование собственной библиотеки компонентов более простым.

**ng-content** takes a projectable nodes and show it. 

```typescript
@Component({
  selector: 'wrapper',
  template: `
    <div class="wrapper">
        <ng-content></ng-content>
    </div>
  `,
})
export class Wrapper {}
```

```html
<wrapper>
    <h1>Hello World!</h1>
</wrapper>
```

# Links
https://medium.com/p/96a29d70d11b
