---
title: Mark reactive form fields as touched to highlight them on 'Submit'

tags:
  - tips
  - good-to-know
---

# Content
Sometimes user tries to submit form with non-valid values.
Here is the way to notify that there are fields with non-valid values.

**markFieldsAsTouched** function takes _control_ which is FormGroup type as arg. 

```typescript
@Component({
  selector: 'app-root',
  template: `
      <form [formGroup]="yourAwesomeComponentReactiveForm">
      
           ...
           
          <button type="submit"
                  (click)="onSubmit()"> 
                  Submit
           </button>
      </form>
   `,
})
export class AppComponent {
    
  yourAwesomeComponentReactiveForm: FormGroup;
  
  ...
  
  onSubmit(): void {
    if (this.yourAwesomeComponentReactiveForm.valid) {
      // Work with valid values
    } else {
      this.markFieldsAsTouched(this.yourAwesomeComponentReactiveForm);
    }
  }
  
  markFieldsAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(
      (field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
          this.markAllFormFieldsAsTouched(control);
        }
      }
    );
  }
}
```

On 'Submit' click triggers onSubmit function which checks if 'yourAwesomeComponentReactiveForm' is valid:
- In case of positive check result you have a valid form.
- Otherwise 'markFieldsAsTouched' will be triggered, which marks controls as 'touch' and in case of non-validity control will get error property.

Based on control error property you can add validation notification via, for example, *ngIf directive in template

# Links

https://angular.io/guide/reactive-forms
