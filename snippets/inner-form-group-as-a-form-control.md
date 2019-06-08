
---
title: Inner formGroup as a form control
author: lironHazan
twitter: lironn_h
level: intermediate

tags:
  - forms 
  
links: 
  - [https://itnext.io/angular-dynamic-forms-formgroup-as-a-control-with-controlvalueaccessor-b57ad3becd16](https://itnext.io/angular-dynamic-forms-formgroup-as-a-control-with-controlvalueaccessor-b57ad3becd16)
  - [https://angular.io/api/forms/ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor)
  
---

# Content
Use an inner/nested form-group like a native control by implementing ControlValueAccessor.

```html
<form [formGroup]="simpleFormGroup" (ngSubmit)="onSubmit()">
	<app-form-group-as-control [formControlName]="innerFormAsControl">
	</app-form-group-as-control>
	<button  type="submit">submit</button>
</form>
``` 

# ComponentCode
```typescript
import  {  Component,  OnInit, forwardRef,  EventEmitter,  OnDestroy  }  from  '@angular/core';
import  {  ControlValueAccessor,  NG_VALUE_ACCESSOR,  FormBuilder,  FormGroup  }  from  '@angular/forms';
import  {  Subscription  }  from  'rxjs';

@Component({
selector:  'app-form-group-as-control',
templateUrl:  './form-group-as-control.component.html',
styleUrls:  ['./form-group-as-control.component.css'],
providers:  [{ provide:  NG_VALUE_ACCESSOR,
			useExisting: forwardRef(()  => FormGroupAsControlComponent),
			multi:  true}]
			})

export  class  FormGroupAsControlComponent  implements  OnInit,  ControlValueAccessor,  OnDestroy  {

public formChanged =  new  EventEmitter<any>();
public modelYear:  FormGroup;
public formSubscription$:  Subscription;

constructor(private formBuilder:  FormBuilder)  {  }

ngOnInit()  {
	this.modelYear =  this.createForm();
	this.formSubscription$ = this.onFormChanged()
	.subscribe(val =>  {
		this.formChanged.emit(val);
	})
}
 
createForm():  FormGroup  {
	const modelYear:  FormGroup  |  any  =  {};
	modelYear['model']  =  this.formBuilder.control('model');
	modelYear['year']  =  this.formBuilder.control('year');
	return  this.formBuilder.group(modelYear);
}

onFormChanged()  {
	return  this.modelYear.valueChanges;
}

registerOnChange(fn:  any):  void  {
	// view ⇒ model
	this.formChanged.subscribe(fn);
}

writeValue(controls):  void  { // model ⇒ view}

setDisabledState(isDisabled:  boolean):  void  {}

registerOnTouched(fn:  any):  void  {}

ngOnDestroy()  {
	this.formSubscription$ &&  this.formSubscription$.unsubscribe();
}

}
```
# ModuleCode
```typescript
import  {  NgModule  }  from  '@angular/core';
import  {  BrowserModule  }  from  '@angular/platform-browser';
import  {  FormsModule  }  from  '@angular/forms';
import  { ReactiveFormsModule }  from  '@angular/forms';
import  {  AppComponent  }  from  './app.component';
import  {  FormGroupAsControlComponent  }  from  './form-group-as-control/form-group-as-control.component';

@NgModule({
imports:  [  BrowserModule,  FormsModule,  ReactiveFormsModule  ],
declarations:  [  AppComponent, FormGroupAsControlComponent  ],
bootstrap:  [  AppComponent  ]
})

export  class  AppModule  {  }
```
