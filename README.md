[![Logo 30 Seconds of Angular](/builder/public/logo.png)](https://github.com/nycJSorg/30-seconds-of-angular)


[![Build Status](https://travis-ci.com/nycJSorg/30-seconds-of-angular.svg?branch=master)](https://travis-ci.com/nycJSorg/30-seconds-of-angular) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> Curated collection of useful Angular snippets that you can understand in 30 seconds or less.



* Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
* Snippets are written in Angular 7.2.8+.

# 30 Seconds Of Angular

## Table of contents

Intermediate snippets

* [Accessing all nested form controls](#accessing-all-nested-form-controls)
* [Adding keyboard shortcuts to elements](#adding-keyboard-shortcuts-to-elements)
* [Bind to host properties with host binding](#bind-to-host-properties-with-host-binding)
* [Component level providers](#component-level-providers)
* [Global event listeners](#global-event-listeners)
* [Injecting document](#injecting-document)
* [Mark reactive fields as touched](#mark-reactive-fields-as-touched)
* [Passing template as an input](#passing-template-as-an-input)
* [Reusing code in template](#reusing-code-in-template)
* [Reusing existing custom pipes](#reusing-existing-custom-pipes)
* [Style bindings](#style-bindings)
* [Two-way binding any property](#two-way-binding-any-property)
* [Window Location injection](#window-location-injection)

Beginner snippets

* [Accessing Enums in template](#accessing-enums-in-template)
* [Angular cheat sheet](#angular-cheat-sheet)
* [Default ViewEncapsulation value](#default-viewencapsulation-value)
* [hammerjs-gestures](#hammerjs-gestures)
* [Loader Component](#loader-component)
* [ng-content](#ng-content)
* [ngIf else](#ngif-else)
* [Optional parameters in the middle](#optional-parameters-in-the-middle)
* [Renaming inputs and outputs](#renaming-inputs-and-outputs)
* [Safe Navigation Operator](#safe-navigation-operator)
* [trackBy in for loops](#trackby-in-for-loops)
* [Understanding Microsyntax](#understanding-microsyntax)

Advanced snippets

* [Getting components of different types with ViewChild](#getting-components-of-different-types-with-viewchild)
* [Router Custom Preloading](#router-custom-preloading)
* [SVG](#svg)



## Intermediate snippets

### Accessing all nested form controls
Sometimes we need to work with every single Control is a form. Here's how it can be done: 

```typescript
function flattenControls(form: AbstractControl): AbstractControl[] {
  let extracted: AbstractControl[] = [ form ];
  if (form instanceof FormArray || form instanceof FormGroup) {
    const children = Object.values(form.controls).map(flattenControls);
    extracted = extracted.concat(...children);
  }
  return extracted;
}
```

For examples use:
```typescript
// returns all dirty abstract controls
flattenControls(form).filter((control) => control.dirty);

// mark all controls as touched
flattenControls(form).forEach((control) => 
    control.markAsTouched({ onlySelf: true }));
```


#### Links
https://angular.io/guide/reactive-forms

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/accessing-all-nested-form-controls) | [⬆ Back to top](#table-of-contents) | tags: [reactive forms](https://30.codelab.fun/tags/reactive-forms) [tips](https://30.codelab.fun/tags/tips) [good to know](https://30.codelab.fun/tags/good-to-know) 
<br><br>
### Adding keyboard shortcuts to elements
It's really easy to add keyboard shortcuts in the template: 
```html
<textarea (keydown.ctrl.enter)="doSomething()"></textarea>
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
https://alligator.io/angular/binding-keyup-keydown-events

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/adding-keyboard-shortcuts-to-elements) | [⬆ Back to top](#table-of-contents) | tags: [tips](https://30.codelab.fun/tags/tips) [good-to-know](https://30.codelab.fun/tags/good-to-know) 
<br><br>
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
  styles: [
    `:host { display: block; height: 100px; }`
  ]
})
export class AppComponent {
  @HostBinding('style.background') color = '#ff9900';
}
```



<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/bind-to-host-properties-with-host-binding) | [⬆ Back to top](#table-of-contents) | tags: [components](https://30.codelab.fun/tags/components) 
<br><br>
### Component level providers
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
@Directive({
  selector: '[provide]',
  providers: [ Service ]
})
export class ProvideDirective {}
```


#### Links
https://angular.io/guide/hierarchical-dependency-injection#component-level-injectors,https://stackblitz.com/edit/angular-cdk-happy-animals

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/component-level-providers) | [⬆ Back to top](#table-of-contents) | tags: [tips](https://30.codelab.fun/tags/tips) [components](https://30.codelab.fun/tags/components) [dependency-injection](https://30.codelab.fun/tags/dependency-injection) 
<br><br>
### Global event listeners
It is possible to add global event listeners in your Components/Directives with `HostListener`. Angular will take care of unsubscribing once your directive is destroyed.

```typescript
@Directive({
  selector: '[rightClicker]'
})
export class ShortcutsDirective {
  @HostListener('window:keydown.ArrowRight')
  doImportantThings() {
    console.log('You pressed right');
  }
}
```

<details>
<summary>Bonus</summary>

You can have multiple bindings:

```typescript
@HostListener('window:keydown.ArrowRight')
@HostListener('window:keydown.PageDown')
next() {
  console.log('Next')
}
```

You can also pass params:

```typescript
@HostListener('window:keydown.ArrowRight', '$event.target')
next(target) {
  console.log('Pressed right on this element: ' + target)
}
```
</details>


<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/global-event-listeners) | [⬆ Back to top](#table-of-contents) | tags: [events](https://30.codelab.fun/tags/events) [components](https://30.codelab.fun/tags/components) 
<br><br>
### Injecting document
Sometimes you need to get access to global `document`. 

To simplify unit-testing, Angular provides it through dependency injection:

```typescript
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Edit me </h1>`
})
export class AppComponent {

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Word with document.location, or other things here....
  }
}
```


#### Links
https://angular.io/api/common/DOCUMENT

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/injecting-document) | [⬆ Back to top](#table-of-contents) | tags: [dependency injection](https://30.codelab.fun/tags/dependency-injection) 
<br><br>
### Mark reactive fields as touched
Here is the way to notify user that there are fields with non-valid values.

`markFieldsAsTouched` function FormGroup or FormArray as an argument. 

```typescript
  function markFieldsAsTouched(form: AbstractControl): void {
    form.markAsTouched({ onlySelf: true });
    if (form instanceof FormArray || form instanceof FormGroup) {
      Object.values(form.controls).forEach(markFieldsAsTouched);
    }
  }
```

<details>
<summary>Bonus</summary>

It's very useful to check out more general method [Accessing all nested form controls](#accessing-all-nested-form-controls) by [Thekiba](https://twitter.com/thekiba_io) to work with controls.
</details>

#### Links
https://angular.io/guide/reactive-forms

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/mark-reactive-fields-as-touched) | [⬆ Back to top](#table-of-contents) | tags: [reactive forms validation](https://30.codelab.fun/tags/reactive-forms-validation) [tips](https://30.codelab.fun/tags/tips) [good to know](https://30.codelab.fun/tags/good-to-know) 
<br><br>
### Passing template as an input
It's possible to take a template as `@Input` for a component to customize the render


```typescript
@Component({
  template: `
    <nav>
      <ng-container *ngTemplateOutlet="template"></ng-container>
    </nav>
  `,
})
export class SiteMenuComponent  {
  @Input() template: TemplateRef<any>;
}
```
```html
<site-menu [template]="menu1"></site-menu>

<ng-template #menu1>
  <div><a href="#">item1</a></div>
  <div><a href="#">item2</a></div>
</ng-template>
```
> Note: `ng-content` should be used for most of the cases and it's simpler and more declarative.
> Only use this approach if you need extra flexibility that can't be achieved with ng-content.


#### Links
https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/passing-template-as-an-input) | [⬆ Back to top](#table-of-contents) | tags: [template](https://30.codelab.fun/tags/template) 
<br><br>
### Reusing code in template
While the best way of reusing your code is creating a component, it's also possible to do it in a template.

To do this you can use `ng-template` along with `*ngTemplateOutlet` directive.

```html
<p>
  <ng-container *ngTemplateOutlet="fancyGreeting"></ng-container>
</p>

<button>
  <ng-container *ngTemplateOutlet="fancyGreeting"></ng-container>    
</button>

<ng-template #fancyGreeting>
  Hello <b>{{name}}!</b>
</ng-template>
```


#### Links
https://angular.io/api/common/NgTemplateOutlet,https://angular.io/guide/structural-directives#the-ng-template

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/reusing-code-in-template) | [⬆ Back to top](#table-of-contents) | tags: [templates](https://30.codelab.fun/tags/templates) 
<br><br>
### Reusing existing custom pipes
If you need a custom `pipe`, before creating one, consider checking out the [NGX Pipes package](https://github.com/danrevah/ngx-pipes) which has 70+ already implemeted custom pipes.

Here are some examples:

```html
<p>{{ date | timeAgo }}</p> 
<!-- Output: "last week" -->

<p>{{ 'foo bar' | ucfirst }}</p>
<!-- Output: "Foo bar" -->

<p>3 {{ 'Painting' | makePluralString: 3 }}</p>
<!-- Output: "3 Paintings" -->

<p>{{ [1, 2, 3, 1, 2, 3] | max }}</p>
<!-- Output: "3" -->
```


#### Links
https://github.com/danrevah/ngx-pipes

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/reusing-existing-custom-pipes) | [⬆ Back to top](#table-of-contents) | tags: [tip](https://30.codelab.fun/tags/tip) [pipes](https://30.codelab.fun/tags/pipes) [library](https://30.codelab.fun/tags/library) 
<br><br>
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


<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/style-bindings) | [⬆ Back to top](#table-of-contents) | tags: [styles](https://30.codelab.fun/tags/styles) 
<br><br>
### Two-way binding any property
Similar to how you can two-way bind `[(ngModel)]` you can two-way bind custom property on a component, for example `[(value)]`. To do it use appropriate Input/Output naming:

```typescript
@Component({
  selector: 'super-input', 
  template: `...`,
})
export class AppComponent {
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();
}
```

Then you can use it as:
```html
<super-input [(value)]="value"></super-input>
```



<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/two-way-binding-any-property) | [⬆ Back to top](#table-of-contents) | tags: [tip](https://30.codelab.fun/tags/tip) [binding](https://30.codelab.fun/tags/binding) 
<br><br>
### Window Location injection
For testing purposes you might want to inject `window.location` object in your component.
You can achieve this with custom `InjectionToken` mechanism provided by Angular.

```typescript
export const LOCATION_TOKEN = new InjectionToken<Location>('Window location object');

@NgModule({
  providers: [
    { provide: LOCATION_TOKEN, useValue: window.location }
  ]
})
export class SharedModule {}

//...

@Component({
})
export class AppComponent {
  constructor(
    @Inject(LOCATION_TOKEN) public location: Location
  ) {}
}
```


#### Links
https://itnext.io/testing-browser-window-location-in-angular-application-e4e8388508ff,https://angular.io/guide/dependency-injection

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/window-location-injection) | [⬆ Back to top](#table-of-contents) | tags: [dependency-injection](https://30.codelab.fun/tags/dependency-injection) [testing](https://30.codelab.fun/tags/testing) 
<br><br>

## Beginner snippets

### Accessing Enums in template
Enums are great but they are not visible in Angular templates by default. 
With this little trick you can make them accessible.

```typescript
enum Animals {
  DOG,
  CAT,
  DOLPHIN
}

@Component({
  ...
})
export class AppComponent {
  animalsEnum: typeof Animals = Animals;
}
```



<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/accessing-enums-in-template) | [⬆ Back to top](#table-of-contents) | tags: [enums](https://30.codelab.fun/tags/enums) [templates](https://30.codelab.fun/tags/templates) 
<br><br>
### Angular cheat sheet
Check out [Angular Cheat Sheet](https://angular.io/guide/cheatsheet) which contains lots of useful information condensed in one place. 

There's also an [alternative version](https://malcoded.com/angular-cheat-sheet).


#### Links
https://malcoded.com/angular-cheat-sheet/,https://angular.io/guide/cheatsheet,https://angular.io/guide/styleguide

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/angular-cheat-sheet) | [⬆ Back to top](#table-of-contents) | tags: [tip](https://30.codelab.fun/tags/tip) [cheat sheet](https://30.codelab.fun/tags/cheat-sheet) 
<br><br>
### Default ViewEncapsulation value
If you're using `ViewEncapsulation` value which is different than default, it might be daunting to set the value manually for every component. 

Luckily you can configure it globally when bootstrapping your app:

```TypeScript
platformBrowserDynamic().bootstrapModule(AppModule, [
  {
    // NOTE: Use ViewEncapsulation.None only if you know what you're doing.
    defaultEncapsulation: ViewEncapsulation.None
  }
]);
```



<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/default-viewencapsulation-value) | [⬆ Back to top](#table-of-contents) | tags: [configuration](https://30.codelab.fun/tags/configuration) [styling](https://30.codelab.fun/tags/styling) 
<br><br>
### hammerjs-gestures
To act upon swipes, pans, and pinhces as well as the other mobile gestures, you can use `hammerjs` with `HostListener` decorator, or an event binding,

```bash
npm install hammerjs
```

```typescript
@HostListener('swiperight')
public swiperight(): void {
  // Run code when a user swipes to the right
}
```

<details>
<summary>Bonus</summary>

Here are samples on how to use all of the `hammerjs` event bindings, you can use these events with a `HostListener` as well:

```HTML
  <!-- pan events -->
  <div (pan)="logEvent($event)"></div>
  <div (panstart)="logEvent($event)"></div>
  <div (panmove)="logEvent($event)"></div>
  <div (panend)="logEvent($event)"></div>
  <div (pancancel)="logEvent($event)"></div>
  <div (panleft)="logEvent($event)"></div>
  <div (panright)="logEvent($event)"></div>
  <div (panup)="logEvent($event)"></div>
  <div (pandown)="logEvent($event)"></div>

  <!-- pinch events -->
  <div (pinch)="logEvent($event)"></div>
  <div (pinchstart)="logEvent($event)"></div>
  <div (pinchmove)="logEvent($event)"></div>
  <div (pinchend)="logEvent($event)"></div>
  <div (pinchcancel)="logEvent($event)"></div>
  <div (pinchin)="logEvent($event)"></div>
  <div (pinchout)="logEvent($event)"></div>

  <!-- press events -->
  <div (press)="logEvent($event)"></div>
  <div (pressup)="logEvent($event)"></div>

  <!-- rotate events -->
  <div (rotate)="logEvent($event)"></div>
  <div (rotatestart)="logEvent($event)"></div>
  <div (rotatemove)="logEvent($event)"></div>
  <div (rotateend)="logEvent($event)"></div>
  <div (rotatecancel)="logEvent($event)"></div>

  <!-- swipe events -->
  <div (swipe)="logEvent($event)"></div>
  <div (swipeleft)="logEvent($event)"></div>
  <div (swiperight)="logEvent($event)"></div>
  <div (swipeup)="logEvent($event)"></div>
  <div (swipedown)="logEvent($event)"></div>

  <!-- tap event -->
  <div (tap)="logEvent($event)"></div>
```
</details>

#### Links
https://github.com/angular/angular/blob/master/packages/platform-browser/src/dom/events/hammer_gestures.ts,http://hammerjs.github.io/api/#hammer.manager,https://angular.io/api/platform-browser/HammerGestureConfig

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/hammerjs-gestures) | [⬆ Back to top](#table-of-contents) | tags: [good-to-know](https://30.codelab.fun/tags/good-to-know) [tips](https://30.codelab.fun/tags/tips) [components](https://30.codelab.fun/tags/components) [gestures](https://30.codelab.fun/tags/gestures) 
<br><br>
### Loader Component
You can create own helper component and use it instead of `*ngIf`.

```typescript
@Component({
  selector: 'loader',
  template: `
    <ng-content *ngIf="!loading else showLoader"></ng-content>
    <ng-template #showLoader>🕚 Wait 10 seconds!</ng-template>
  `
})
class LoaderComponent {
  @Input() loading: boolean;
}
```

For usage example:
```html
<loader [loading]="isLoading">🦊 🦄 🐉</loader>
```

> Note that the content will be eagerly evaluated, e.g. in the snippet below `destroy-the-world` will be created before the loading even starts:

```html
<loader [loading]="isLoading"><destroy-the-world></destroy-the-world></loader>
```


#### Links
https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b,https://blog.angularindepth.com/https-medium-com-thomasburleson-animated-ghosts-bfc045a51fba

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/loader-component) | [⬆ Back to top](#table-of-contents) | tags: [tips](https://30.codelab.fun/tags/tips) [good-to-know](https://30.codelab.fun/tags/good-to-know) [components](https://30.codelab.fun/tags/components) [templates](https://30.codelab.fun/tags/templates) 
<br><br>
### ng-content
With `ng-content` you can pass any elements to a component. 
This simplifies creating reusable components.

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


#### Links
https://medium.com/p/96a29d70d11b

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/ng-content) | [⬆ Back to top](#table-of-contents) | tags: [good-to-know](https://30.codelab.fun/tags/good-to-know) [tips](https://30.codelab.fun/tags/tips) [components](https://30.codelab.fun/tags/components) 
<br><br>
### ngIf else
`*ngIf` directive also supports `else` statement.

```html
<div *ngIf="isLoading; else notLoading">loading...</div>

<ng-template #notLoading>not loading</ng-template>
```



<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/ngif-else) | [⬆ Back to top](#table-of-contents) | tags: [ngif](https://30.codelab.fun/tags/ngif) [templates](https://30.codelab.fun/tags/templates) 
<br><br>
### Optional parameters in the middle
Navigate with matrix params:

the router will navigate to `/first;name=foo/details`
```html
<a [routerLink]="['/', 'first', {name: 'foo'}, 'details']">
  link with params
</a>
```


#### Links
https://stackblitz.com/edit/angular-xvy5pd

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/optional-parameters-in-the-middle) | [⬆ Back to top](#table-of-contents) | tags: [routing](https://30.codelab.fun/tags/routing) 
<br><br>
### Renaming inputs and outputs
In certain cases `@Input` and `@Output` properties can be named differently than the actual inputs and outputs.

```html
<div 
  pagination 
  paginationShowFirst="true"
  (paginationPageChanged)="onPageChanged($event)">
</div>
```

```typescript
@Directive({ selector: '[pagination]'})
class PaginationComponent {
  @Input('paginationShowFirst') 
  showFirst: boolean = true;

  @Output('paginationPageChanged') 
  pageChanged = new EventEmitter();
}
```
> Note: Use this wisely, see [StyleGuide recommedation](https://angular.io/guide/styleguide#style-05-13)


#### Links
https://angular.io/guide/styleguide#style-05-13

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/renaming-inputs-and-outputs) | [⬆ Back to top](#table-of-contents) | tags: [components](https://30.codelab.fun/tags/components) [templates](https://30.codelab.fun/tags/templates) 
<br><br>
### Safe Navigation Operator
The [Safe Navigation Operator](https://angular.io/guide/template-syntax#the-safe-navigation-operator----and-null-property-paths) helps with preventing null-reference exceptions in component template expressions. It returns object property value if it exists or null otherwise.

```html
<p> I will work even if student is null or undefined: {{student?.name}} </p>
```

<details>
<summary>Bonus</summary>

```html
{{a?.b?.c}} 
```
Underneath will be compiled to.
```html
(_co.a == null)? null: ((_co.a.b == null)? null: _co.a.b.c));
```
</details>

#### Links
https://github.com/angular/angular/issues/791

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/safe-navigation-operator) | [⬆ Back to top](#table-of-contents) | tags: [object property handling](https://30.codelab.fun/tags/object-property-handling) [tips](https://30.codelab.fun/tags/tips) [good to know](https://30.codelab.fun/tags/good-to-know) 
<br><br>
### trackBy in for loops
To avoid the expensive operations, we can help Angular to track which items added or removed i.e. customize the default tracking algorithm by providing a trackBy option to NgForOf.

So you can provide your custom trackBy function that will return unique identifier for each iterated item. 
For example, some key value of the item. If this key value matches the previous one, then Angular won't detect changes.

**trackBy** takes a function that has _index_ and _item_ args. 

```typescript
@Component({
  selector: 'my-app',
  template: `
    <ul>
      <li *ngFor="let item of items; trackBy: trackByFn">{{item.id}}</li>
    </ul>
  `
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
https://angular.io/api/common/NgForOf,https://angular.io/api/core/TrackByFunction

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/trackby-in-for-loops) | [⬆ Back to top](#table-of-contents) | tags: [good-to-know](https://30.codelab.fun/tags/good-to-know) [tips](https://30.codelab.fun/tags/tips) [components](https://30.codelab.fun/tags/components) [performance](https://30.codelab.fun/tags/performance) 
<br><br>
### Understanding Microsyntax
Under the hood Angular compiles structural directives into ng-template elements, e.g.:

```html
<!-- This -->
<div *ngFor="let item of [1,2,3]">

<!-- Get expanded into this -->
<ng-template ngFor [ngForOf]="[1,2,3]" let-item="$implicit"></ng-template>
```

The value passed to *ngFor directive is written using microsyntax. You can learn about it [in the docs](https://angular.io/guide/structural-directives#microsyntax). 

Also check out an [interactive tool](https://alexzuza.github.io/ng-structural-directive-expander/) that shows the expansion by [Alexey Zuev](https://twitter.com/yurzui)


#### Links
https://angular.io/guide/structural-directives#microsyntax,https://alexzuza.github.io/ng-structural-directive-expander/,https://angular.io/guide/structural-directives#inside-ngfor

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/understanding-microsyntax) | [⬆ Back to top](#table-of-contents) | tags: [tip](https://30.codelab.fun/tags/tip) [structural directive](https://30.codelab.fun/tags/structural-directive) [microsyntax](https://30.codelab.fun/tags/microsyntax) 
<br><br>

## Advanced snippets

### Getting components of different types with ViewChild
It's possible to use `@ViewChild` (also `@ViewChildren` and `@ContentChild/Children`) to query for components of different types using dependency injection. 

In the example below we can use `@ViewChildren(Base)` to get instances of `Foo` and `Bar`.

```typescript
abstract class Base {}

@Component({
  selector: 'foo',
  providers: [{ provide: Base, useExisting: Foo }]
})
class Foo extends Base {}

@Component({
  selector: 'bar',
  providers: [{ provide: Base, useExisting: Bar }]
})
class Bar extends Base {}

// Now we can require both types of components using Base.
@Component({ template: `<foo></foo><bar></bar>` })
class AppComponent {
  @ViewChildren(Base) components: QueryList<Base>;
}
```


#### Links
https://www.youtube.com/watch?v=PRRgo6F0cjs

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/getting-components-of-different-types-with-viewchild) | [⬆ Back to top](#table-of-contents) | tags: [good-to-know](https://30.codelab.fun/tags/good-to-know) [tips](https://30.codelab.fun/tags/tips) [components](https://30.codelab.fun/tags/components) [dependency-injection](https://30.codelab.fun/tags/dependency-injection) 
<br><br>
### Router Custom Preloading
Angular allows us to control the way module preloading is handled.

There are 2 strategies provided by **@angular/router**: `PreloadAllModules` and `NoPreloading`. The latter enabled by default, only preloading lazy modules on demand.

We can override this behavior by providing custom preloading strategy: In the example below we preload all included modules if the connection is good.

```typescript
import { Observable, of } from 'rxjs';

export class CustomPreloading implements PreloadingStrategy {
  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    return preloadingConnection() ? load() : of(null);
  }
}

const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: CustomPreloading
});
```
> Note that that the example above would not be very efficient for larger apps, as it'll preload all the modules.


#### Links
https://angular.io/api/router/PreloadingStrategy,https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb,https://medium.com/@adrianfaciu/custom-preloading-strategy-for-angular-modules-b3b5c873681a,https://coryrylan.com/blog/custom-preloading-and-lazy-loading-strategies-with-angular

<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/router-custom-preloading) | [⬆ Back to top](#table-of-contents) | tags: [router](https://30.codelab.fun/tags/router) 
<br><br>
### SVG
It is possible to use SVG tags in your Angular component, to create beautiful graphs and visualizations. There are 3 things you need to know: 

1. When binding an SVG attribute, use `attr`
```html
<circle [attr.cx]="x" [attr.cy]="y"></circle>
```

2. When creating sub-components, use attribute and not tag selector:
```html
// Not: <child-component></child-component>
<g child-component></g>
```
```typescript
@Component({selector: '[child-component]' })
```

3. When using SVG tags in sub-components use svg prefix:
```typescript
@Component({
  selector: '[child-component]',
  template: `<svg:circle></svg:circle>`
})
```



<br>[⭐ Interactive demo of this snippet](https://30.codelab.fun/svg) | [⬆ Back to top](#table-of-contents) | tags: [tip](https://30.codelab.fun/tags/tip) [SVG](https://30.codelab.fun/tags/svg) 
<br><br>
