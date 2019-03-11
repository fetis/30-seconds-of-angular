---
title: components-polymorphism
level: intermediate
author: thekiba
tags:
  - good-to-know
  - tips
  - components
  - dependency-injection
---

# Content
С помощью DI у вас есть возможность провайдить несколько компонентов или директив для выборки через декораторы:
- ViewChild
- ViewChildren
- ConentChild
- ContentChildren

```typescript
abstract class Base {}

@Component({
  providers: [
      { provide: Base, useExisting: Foo }
  ]
})
class Foo extends Base {}

@Component({
  providers: [
      { provide: Base, useExisting: Bar }
  ]
})
class Bar extends Base {}
```

```typescript
@ViewChildren(Base) components: QueryList<Base>;
```

```html
<wrapper>
    <h1>Hello World!</h1>
</wrapper>
```

# Links
https://medium.com/p/96a29d70d11b

# ComponentCode
import { Component, AfterViewInit } from '@angular/core';

export abstract class Animal {
    abstract say();
}

@Component({
  selector: 'fox',
  template: `🦊`,
  providers: [
      { provide: Animal, useExisting: Fox }
  ]
})
export class Fox extends Animal {
    say() {
        console.log('Joff-tchoff-tchoffo-tchoffo-tchoff!');
    }
}

@Component({
  selector: 'rice',
  template: `🍚`,
  providers: [
      { provide: Animal, useExisting: Rice }
  ]
})
export class Rice extends Animal {
    say() {
        console.log('lol');
    }
}

@Component({
  selector: 'dragon',
  template: `🐉`,
  providers: [
      { provide: Animal, useExisting: Dragon }
  ]
})
export class Dragon extends Animal {
    say() {
        console.log('Wa-pa-pa-pa-pa-pa-pow!');
    }
}

@Component({
    selector: 'animals',
    template: `
        <fox></fox>
        <rice></rice>
        <dragon></dragon>
    `
})
export class AppComponent implements AfterViewInit {
    @ViewChildren(Animal) animals: QueryList<Animal>;

    ngAfterViewInit() {
        animals.forEach((animal) => animal.say());
    }
}

# ModuleCode
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, Fox, Rice, Dragon } from './app.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, Fox, Rice, Dragon ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}