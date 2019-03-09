---
title: DI Composition
tags:
  - tips
  - good-to-know
---

# Content
Вы можете легко создавать новые инстансы сервисов через компоненты и директивы. Достаточно добавить сервис в providers у компонента или директивы.

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
С помощью этого способа вы можете с легкостью создавать связанные компоненты и директивы.

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