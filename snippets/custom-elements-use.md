---
title: custom elements use
twitter: lironn_h
level: advanced
tags:
- tip
- web-components
---
# Content
It is possible to use Web Components in your Angular application.

Create a custom element according to the web-component standards and use it as any other component on your Angular template.

Make sure to include `schemas: [CUSTOM_ELEMENTS_SCHEMA]` into your `NgModule` to allow a non Angular element use in an Angular module.


```html
<button (click)="onClick($event)"> greet </button>
<mighty-toast [text]="greet" [pop]="visibility"></mighty-toast>
```

> Note: `CUSTOM_ELEMENTS_SCHEMA` will disable displaying errors for components that don't exist.

# file:app.component.ts
```typescript

import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<button (click)="onClick($event)"> greet </button>
<mighty-toast [text]="greet" [pop]="visibility"></mighty-toast>`,
})
export class AppComponent {
  greet = 'welcome! WC workssss';
  showAlert= false;
  visibility: {showAlert: boolean};

  onClick() {
      this.showAlert = !this.showAlert;
      this.visibility = { showAlert: this.showAlert };
  }
}

```
# file:app.module.ts
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
# file:web-components/mighty-toaster.ts
```typescript
declare const HTMLElement: any;
export class MightyToaster extends HTMLElement {
  private toast: Element;

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

  attributeChangedCallback(name: string, oldValue, newValue) {
    if(name === 'pop' && newValue && oldValue && newValue.showAlert === oldValue.showAlert) {
      this.setAttribute('show', 'true');
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
}
  
MightyToaster.observedAttributes = [ 'text', 'pop'];

if(!customElements.get('mighty-toast')){
    customElements.define('mighty-toast', MightyToaster);
}
```
