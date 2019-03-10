---
title: Style bindings
tags:
  - styles
---
# Content
 
```html

<p [style.background-color]="'green'">
  I am in green background
</p>

<p [style.font-size.px]="isImportant ? '30' : '16'">
  May be important text.
</p>

```


# Bonus

```html
<!-- Width in pixels -->
<div [style.width.px]="pxWidth"></div>

<!-- Font size in percentage relative to the parent -->
<div [style.font-size.%]="percentageSize">...</div>

<!-- Height relative to the viewport height -->
<div [style.height.vh]="vwHeight"></div>
```

# Links

https://stackblitz.com/edit/angular-9h1tkc?file=src%2Fapp%2Fapp.component.html
