---
title: Inner formGroup as a form control
author: lironHazan
twitter: lironn_h
level: intermediate

tags:
  - forms 
  
links: 
  - https://itnext.io/angular-dynamic-forms-formgroup-as-a-control-with-controlvalueaccessor-b57ad3becd16
  - https://angular.io/api/forms/ControlValueAccessor
  
---

# Content
It is possible to bind a for a ReactiveForms `FormControl` to a custom component, e.g.

```html
  <my-custom-component [formControl]="formControl">
``` 

For this your custom component would have to implement `ControlValueAccessor` interface and provide `NG_VALUE_ACCESSOR`

```typescript
@Component({
    selector: 'my-custom-component',`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MyCustomComponent),
            multi: true
        }
    ]
})
export class MyCustomComponent implements ControlValueAccessor {
    registerOnChange(fn: any) { /* view ⇒ model */ }
    writeValue(controls): void { /* model ⇒ view */ }
}

```

# ComponentCode
```typescript
import { Component, EventEmitter, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'my-app',
    template: `<form [formGroup]="form" (ngSubmit)="onSubmit()">
      <app-form-group-as-control [formControl]="childControl">
      </app-form-group-as-control>
      <button  type="submit">submit</button>
    </form>`,
})
export class AppComponent {
    readonly childControl = new FormControl();
    readonly form = new FormGroup({
        child: this.childControl
    });
}

@Component({
    selector: 'app-form-group-as-control',
    template: `<form [formGroup]="modelYear" class="widget" (ngSubmit)="onSubmit()">
    <label for="model">model</label>
    <input type="text" class="form-control" formControlName="model">
    <label for="year">year</label>
    <input type="date" class="form-control" formControlName= "year">
</form>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormGroupAsControlComponent),
            multi: true
        }
    ]
})
export class FormGroupAsControlComponent implements ControlValueAccessor {
    public modelYearForm = this.formBuilder.group({
        model: '',
        year: ''
    });

    constructor(private formBuilder: FormBuilder) {
    }

    registerOnChange(fn: any): void {
        /* view ⇒ model */
        this.modelYearForm.valueChange.subscribe(fn);
    }

    writeValue(controls): void {
    	/* model ⇒ view */
    }

    setDisabledState(isDisabled: boolean): void {
    }

    registerOnTouched(fn: any): void {
    }
}

```
# ModuleCode
```typescript
import  {  NgModule  }  from  '@angular/core';
import  {  BrowserModule  }  from  '@angular/platform-browser';
import  {  FormsModule  }  from  '@angular/forms';
import  { ReactiveFormsModule }  from  '@angular/forms';
import  {  AppComponent , FormGroupAsControlComponent }  from  './app.component';

@NgModule({
    imports:  [  BrowserModule,  FormsModule,  ReactiveFormsModule  ],
    declarations:  [  AppComponent, FormGroupAsControlComponent  ],
    bootstrap:  [  AppComponent  ]
})
export  class  AppModule  {  }
```
