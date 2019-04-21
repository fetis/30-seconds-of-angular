---
title: Accessing all nested form controls
author: thekiba
level: intermediate
tags:
  - reactive forms
  - tips
  - good to know
---

# Content

Sometimes we need to work with every single Control is a form. Here's how it can be done: 

```typescript
function flattenControls(form: AbstractControl): AbstractControl[] {
  let extracted: AbstractControl[] = [ form ];
  if (form instanceof FormArray || form instanceof FormGroup) {
    const children = Object.values(form.controls).map(flattenControls);
    extracted = extracted.concat(...children);
  }
  return extracted;
}
```

For examples use:
```typescript
// returns all dirty abstract controls
extractControls(form).filter((control) => control.dirty);

// mark all controls as touched
extractControls(form).forEach((control) => control.markAsTouched({ onlySelf: true }));
```

# Links

https://angular.io/guide/reactive-forms

# ComponentCode
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  template: `
    <p>Count of dirty controls: {{ dirtyControls.length }}</p>
    <button (click)="markAsDirty(form)">Mark as dirty</button>
  `
})
export class AppComponent {

  form: AbstractControl;

  get dirtyControls(): AbstractControl[] {
    return extractControls(this.form).filter(control => control.dirty);
  }

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      a: fb.control(''),
      b: fb.array([
        fb.control(''),
        fb.group({}),
        fb.array([])
      ])
    });
  }

  markAsDirty(form: AbstractControl): void {
    for (const control of extractControls(this.form)) {
      control.markAsDirty({ onlySelf: true });
    }
  }
}

function extractControls(form: AbstractControl): AbstractControl[] {
  let extracted: AbstractControl[] = [ form ];
  if (form instanceof FormArray || form instanceof FormGroup) {
    const children = Object.values(form.controls).map(extractControls);
    extracted = extracted.concat(...children);
  }
  return extracted;
}
```
