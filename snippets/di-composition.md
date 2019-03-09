---
title: DI Composition
tags:
  - dependency-injection
---

# Content
Generally we get one service instance per the whole application. 
It is also possible to create an instance of service per component or directive. 

```typescript
@Component({
  selector: 'provide',
  template: '<ng-content></ng-content>',
  providers: [ Service ]
})
export class ProvideComponent {}
```

```typescript
@Component({
  selector: '[provide]',
  providers: [ Service ]
})
export class ProvideDirective {}
```


# Bonus
Using this you can connect components and directives.

```typescript
@Injectable()
export class ItemsLinker implements OnDestroy {
  itemLinks: Set<ItemDirective> = new Set();

  activate(item: ItemDirective) {
    this.itemLinks.forEach(
      (otherItems) => otherItems.deactivate());
    item.activate();
  }
  deactivate(item: ItemDirective) {
    item.deactivate();
  }

  register(item: ItemDirective) {
    this.itemLinks.add(item);
  }
  unregister(item: ItemDirective) {
    this.itemLinks.delete(item);
  }

  ngOnDestroy() {
    this.itemLinks.clear();
  }
}

@Directive({ selector: '[item]' })
export class ItemDirective implements OnInit, OnDestroy {

  @HostBinding('class.selected') isActivated: boolean = false;

  constructor(@Host() private linker: ItemsLinker) {}

  @HostListener('click') onClick() {
    this.isActivated
      ? this.linker.deactivate(this)
      : this.linker.activate(this);
  }

  activate() {
    this.isActivated = true;
  }
  deactivate() {
    this.isActivated = false;
  }

  ngOnInit() { this.linker.register(this); }
  ngOnDestroy() { this.linker.unregister(this); }
}

@Component({
  selector: 'items',
  template: '<ng-content></ng-content>',
  providers: [ ItemsLinker ]
})
export class ContainerDirective {}
```

```html
<items>
  <span item>🦊</span>
  <span item>🦄</span>
  <span item>🐉</span>
</items>
```

# Links
https://stackblitz.com/edit/angular-cdk-happy-animals
