---
title: Mark reactive form fields as touched to highlight validation messages
level: Intermediate
tags:
  - reactive forms validation
  - tips
  - good to know
---

# Content
Here is the way to notify user that there are fields with non-valid values.

**markFieldsAsTouched** function takes _form_ which is FormGroup or FormArray as arg. 

```typescript
  function markFieldsAsTouched(form: AbstractControl): void {
    control.markAsTouched({ onlySelf: true });
    if (control instanceof FormArray || control instanceof FormGroup) {
      Object.values(form.controls).forEach(markFieldsAsTouched);
    }
  }
```

On 'Submit' trigger function 'markFieldsAsTouched' with your reactive form passed as arg. 
It will mark form controls as 'touch' and in case of non-validity control will get error property.

Based on control error property you can add validation notification via, for example, *ngIf directive in template

# Links

https://angular.io/guide/reactive-forms
