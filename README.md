# 30 Seconds Of Angular

## Table of contents

* [Adding shortcuts to elements](#Adding-shortcuts-to-elements)
* [Awesome Tip](#Awesome-Tip)
* [trackBy](#trackBy)

## Snippets
### Adding shortcuts to elements
```
<textarea [keydown.ctrl.enter]></textarea>
```

<details>
<summary>Bonus</summary>
TODO: Choose one of th links.
https://netbasal.com/lifting-the-veil-insights-into-angulars-eventmanagerplugin-ed9d14cbb31a
https://www.bennadel.com/blog/3088-native-key-combination-event-binding-support-in-angular-2-beta-17.htm
</details>

tags: tips,good-to-know

<br>[⬆ Back to top](#table-of-contents)<br><br>
### Awesome Tip
```
@Module({
    lol: 'dasdsad'
})
```


tags: tips,good-to-know

<br>[⬆ Back to top](#table-of-contents)<br><br>
### trackBy
To avoid the expensive operations, we can help Angular to track which items added or removed i.e. customize the default tracking algorithm by providing a trackBy option to NgForOf.

So you can provide your custom trackBy function that will return unique identifier for each iterated item. 
For example, some key value of the item. If this key value matches the previous one, then Angular won't detect changes.

**trackBy** takes a function that has _index_ and _item_ args. 

```typescript
@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of items; trackBy: trackByFn">{{item.id}}</li>
    </ul>
  `,
})
export class AppComponent {
  
  ...
  
  trackByFn(index, item) {
    return item.id;
  }
}
```
If trackBy is given, Angular tracks changes by the return value of the function. 

Now when you change the collection, Angular can track which items have been added or removed according to the unique identifier and create/destroy only changed items.


tags: tips,good-to-know

<br>[⬆ Back to top](#table-of-contents)<br><br>
