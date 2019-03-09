---
title: Feature Description
author: Your name or github handle. 
tags:
  - tips
  - good-to-know
---
# Content


# Bonus
<!-- This is optional, remove if not needed -->
# Links
<!-- This is optional, remove if not needed -->

<!-- 
    __      _
  o'')}____//   The code below is used for interactive demos.
   `_/      )   You can override any of the components, or remove 
   (_(_/-(_/    the section to keep default value.
   
  -->
  
# example/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Update me!</h1>`
})
export class AppComponent {}

# example/app.module.ts
// This section is optional, remove it if the code below is good.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
