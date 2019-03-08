[![Logo 30 Seconds of Angular](/templates/logo.png)](https://github.com/nycJSorg/30-seconds-of-angular)

# 30 Seconds Of Angular

## Table of contents

* [Adding keyboard shortcuts to elements](#Adding-keyboard-shortcuts-to-elements)
* [trackBy](#trackBy)

## Snippets
### Adding keyboard shortcuts to elements
It's really easy to add keyboard shortcuts in the template: 
```
<textarea (keydown.ctrl.enter)></textarea>
```

<details>
<summary>Bonus</summary>
I'm amazing bonus, I should be expandeable and collapseable
</details>

#### Links
TODO: Choose one of th links.
https://netbasal.com/lifting-the-veil-insights-into-angulars-eventmanagerplugin-ed9d14cbb31a
https://www.bennadel.com/blog/3088-native-key-combination-event-binding-support-in-angular-2-beta-17.htm

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


#### Links
https://angular.io/api/common/NgForOf
https://angular.io/api/core/TrackByFunction

tags: tips,good-to-know

<br>[⬆ Back to top](#table-of-contents)<br><br>
