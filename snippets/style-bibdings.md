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
# ComponentCode
  
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div>Use the input below to select host background-color:</div>
<input type="color" [(ngModel)]="color">
<input type="number" [(ngModel)]="width">
<div [style.width.px]="width" [style.background]="color">
    Change me!
</div> 
`
})
export class AppComponent {
  color = '#ff9900';
  width = 200;
}


# ModuleCode  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
