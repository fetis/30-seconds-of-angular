[![Logo 30 Seconds of Angular](/templates/logo.png)](https://github.com/nycJSorg/30-seconds-of-angular)


[![Build Status](https://travis-ci.com/nycJSorg/30-seconds-of-angular.svg?branch=master)](https://travis-ci.com/nycJSorg/30-seconds-of-angular) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> Curated collection of useful Angular snippets that you can understand in 30 seconds or less.



* Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
* Snippets are written in Angular 7.2.8+.

# 30 Seconds Of Angular

## Table of contents

* [Adding keyboard shortcuts to elements](#Adding-keyboard-shortcuts-to-elements)
* [Bind to host properties with host binding](#Bind-to-host-properties-with-host-binding)
* [Style bindings](#Style-bindings)
* [trackBy](#trackBy)

## Snippets
### Adding keyboard shortcuts to elements
It's really easy to add keyboard shortcuts in the template: 
```
<textarea (keydown.ctrl.enter)></textarea>
```

<details>
<summary>Bonus</summary>

```html
<input (keydown.enter)="...">
<input (keydown.a)="...">
<input (keydown.esc)="...">
<input (keydown.shift.esc)="...">
<input (keydown.control)="...">
<input (keydown.alt)="...">
<input (keydown.meta)="...">
<input (keydown.9)="...">
<input (keydown.tab)="...">
<input (keydown.backspace)="...">
<input (keydown.arrowup)="...">
<input (keydown.shift.arrowdown)="...">
<input (keydown.shift.control.z)="...">
<input (keydown.f4)="...">
```
</details>

#### Links
TODO: Choose one of th links.

https://netbasal.com/lifting-the-veil-insights-into-angulars-eventmanagerplugin-ed9d14cbb31a

https://www.bennadel.com/blog/3088-native-key-combination-event-binding-support-in-angular-2-beta-17.htm

https://alligator.io/angular/binding-keyup-keydown-events

tags: tips,good-to-know



<br>[⭐ Interactive demo of this snippet](https://codelab-next.firebaseapp.com/angular/30-seconds/0) | [⬆ Back to top](#table-of-contents)<br><br>
### Bind to host properties with host binding
Every rendered angular component is wrapped in a host element (which is the same as component's selector).

It is possible to bind properties and attributes of host element using @HostBinding decorators, e.g. 

```typescript
import { Component, HostBinding } from '@angular/core';

@Component({
   selector: 'my-app', 
   template: `
  <div>Use the input below  to select host background-color:</div>
  <input type="color" [(ngModel)]="color"> 
`,
  styles:[`:host { display: block; height: 100px; }`]
  },
  
)
export class AppComponent {
  @HostBinding('style.background') color = '#ff9900';
}
```



tags: components



<br>[⭐ Interactive demo of this snippet](https://codelab-next.firebaseapp.com/angular/30-seconds/1) | [⬆ Back to top](#table-of-contents)<br><br>
### Style bindings
You can use advanced property bindings to set specific style values based on component property values: 

```html
<p [style.background-color]="'green'">
  I am in green background
</p>

<p [style.font-size.px]="isImportant ? '30' : '16'">
  May be important text.
</p>

```

<details>
<summary>Bonus</summary>

```html
<!-- Width in pixels -->
<div [style.width.px]="pxWidth"></div>

<!-- Font size in percentage relative to the parent -->
<div [style.font-size.%]="percentageSize">...</div>

<!-- Height relative to the viewport height -->
<div [style.height.vh]="vwHeight"></div>
```
</details>


tags: styles



<br>[⭐ Interactive demo of this snippet](https://codelab-next.firebaseapp.com/angular/30-seconds/2) | [⬆ Back to top](#table-of-contents)<br><br>
### trackBy
To avoid the expensive operations, we can help Angular to track which items added or removed i.e. customize the default tracking algorithm by providing a trackBy option to NgForOf.

So you can provide your custom trackBy function that will return unique identifier for each iterated item. 
For example, some key value of the item. If this key value matches the previous one, then Angular won't detect changes.

**trackBy** takes a function that has _index_ and _item_ args. 

```typescript
@Component({
  selector: 'app-root',
  template: `<ul>
      <li *ngFor="let item of items; trackBy: trackByFn">{{item.id}}</li>
    </ul>`,
})
export class AppComponent { 
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

tags: good-to-know,tips,components,performance



<br>[⭐ Interactive demo of this snippet](https://codelab-next.firebaseapp.com/angular/30-seconds/3) | [⬆ Back to top](#table-of-contents)<br><br>
