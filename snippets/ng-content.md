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

# Bonus
Сделаем компоненты с карточками.

```typescript
function template(useClass: string): string {
  return `
    <div class="${useClass}">
      <ng-content></ng-content>
    </div>
  `;
}

@Component({
  selector: 'card',
  template: template('card')
})
export class Card {}

@Component({
  selector: 'card-header',
  template: template('card-header')
})
export class CardHeader {}

@Component({
  selector: 'card-body',
  template: template('card-body')
})
export class CardBody {}

@Component({
  selector: 'card-footer',
  template: template('card-footer')
})
export class CardFooter {}
```

```html
<app-card>
  <app-card-header>Header</app-card-header>
  <app-card-body>Body</app-card-body>
  <app-card-footer>Footer</app-card-footer>
</app-card>
```

# Links
https://medium.com/p/96a29d70d11b
