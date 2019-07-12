---
title: custom elements use
author: lironHazan
twitter: lironn_h
level: advanced
tags:
- tip
- WebComponents
---

# Content
It is possible to use Web Components in your Angular application.

Create a custom element according to the web-component standards and use it as any other component on your Angular template.


```html
<button (click)="onClick($event)"> greet </button>
<mighty-toast [text]="greet" [pop]="visibility"></mighty-toast>
```

# ComponentCode
```javascript

export class MightyToaster extends HTMLElement {

  constructor() {
      super();

      const shadowRoot = this.attachShadow({mode: 'open'});

      shadowRoot.innerHTML = `
            <style>
               :host {
                display: none;
                position: fixed;
                z-index: 1;
                top: 1rem;
                width: 100%;
                background-color: #FF00FF; 
                font-family: 'Bowlby One', cursive;
                text-align: center; 
                padding: 16px;
                }
                :host([show]) {
                  display: block;
                }
            </style>
            <div id="mighty-toast"></div>
        `;

      this.toast = this.shadowRoot.querySelector('#mighty-toast');

    }

  attributeChangedCallback(name, oldValue, newValue) {
   if(name === 'pop' && newValue.showAlert === oldValue.showAlert) {
       this.setAttribute('show', true);
       setTimeout(() => { 
       this.removeAttribute('show');
       }, 3000);
   }
  }

  get pop() {
    return this.getAttribute('pop');
  }

   set pop(value) {
    this.setAttribute('pop', value);
  }

  get text() {
    return this.getAttribute('text');
  }

  set text(value) {
    this.toast.innerHTML = value;
    this.setAttribute('text', value);
  }

  get color() {
    return this.getAttribute('color');
  }

  set color(value) {
    this.toast.style.backgroundColor = value;
    this.setAttribute('color', value);
  }

  }
  
MightyToaster.observedAttributes = [ 'text', 'pop'];

customElements.define('mighty-toast', MightyToaster);

```

```typescript

import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  greet = 'welcome! WC workssss';
  showAlert: Boolean = false;
  visibility: any = {showAlert: this.showAlert};

  onClick($event) {
      this.showAlert = !this.showAlert;
      this.visibility = { showAlert: this.showAlert };
  }

}

```

# ModuleCode

Make sure to include schemas: [CUSTOM_ELEMENTS_SCHEMA] to allow a non Angular element use in an Angular module.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import '../web-components/mighty-toaster';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

```
