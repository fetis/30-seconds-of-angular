---
title: Adding keyboard shortcuts to elements
tags:
  - tips
  - good-to-know
---
# Content

It's really easy to add keyboard shortcuts in the template: 
```
<textarea (keydown.ctrl.enter)></textarea>
```


# Bonus

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

# Links
TODO: Choose one of th links.

https://netbasal.com/lifting-the-veil-insights-into-angulars-eventmanagerplugin-ed9d14cbb31a

https://www.bennadel.com/blog/3088-native-key-combination-event-binding-support-in-angular-2-beta-17.htm

https://alligator.io/angular/binding-keyup-keydown-events
