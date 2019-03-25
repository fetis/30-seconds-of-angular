---
title: Mark reactive fields as touched
author: alex-bu-93
level: intermediate
tags:
  - reactive forms validation
  - tips
  - good to know
---

# Content
Here is the way to notify user that there are fields with non-valid values.

**markFieldsAsTouched** function takes _form_ which is FormGroup or FormArray as arg. 

# ComponentCode
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  template: `
    <div for="fieldOne"> fieldOne </div>
    <div>
        <input formControlName="fieldOne" id="fieldOne"/>
    </div>
    <div *ngIf="formGroup.get('fieldOne').touched && formGroup.get('fieldOne').invalid">
        <div *ngIf="formGroup.get('fieldOne').errors['required']"> Need to fill </div>
    </div>
    <div>
        <input formControlName="fieldTwo" id="fieldTwo"/>
    </div>
    <div *ngIf="formGroup.get('fieldTwo').touched && formGroup.get('fieldTwo').invalid">
        <div *ngIf="formGroup.get('fieldTwo').errors['required']"> Need to fill </div>
    </div>
    <div>
      <button (click)="onSubmit()">Click me to highlight the field</button>
    </div> `
})
export class AppComponent {
    
  formGroup: FormGroup = new FormGroup({
    'fieldOne': new FormControl(null, Validators.required),
    'fieldTwo': new FormControl(null, Validators.required)
  });

  onSubmit(): void {
    if (this.formGroup.valid) {
      // Work on your validated data
    } else {
      this.markFieldsAsTouched(this.formGroup);
    }
  }

  markFieldsAsTouched(form: AbstractControl): void {
    form.markAsTouched({onlySelf: true});
    if (form instanceof FormArray || form instanceof FormGroup) {
      Object.values(form.controls).forEach(this.markFieldsAsTouched);
    }
  }
}
```

On 'Submit' trigger function 'markFieldsAsTouched' with your reactive form passed as arg. 
It will mark form controls as 'touch' and in case of non-validity control will get error property.

Based on control error property you can add validation notification via, for example, *ngIf directive in template

# Links

https://angular.io/guide/reactive-forms
