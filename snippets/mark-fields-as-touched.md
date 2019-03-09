---
title: Mark reactive form fields as touched to highlight them

tags:
  - reactive forms
  - reactive forms validation
  - tips
---

# Content
Here is the way to notify user that there are fields with non-valid values.

**markFieldsAsTouched** function takes _control_ which is FormGroup type as arg. 

```typescript
@Component({
  selector: 'app-root',
  template: `
      <form [formGroup]="yourAwesomeComponentReactiveForm">
          ...
          <button (click)="markFieldsAsTouched(yourAwesomeComponentReactiveForm)"> Submit </button>
      </form>
   `,
})
export class AppComponent {
  yourAwesomeComponentReactiveForm: FormGroup;
  
  markFieldsAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(
      (field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
          this.markFieldsAsTouched(control);
        }
      }
    );
  }
}
```

On 'Submit' click triggers 'markFieldsAsTouched' which marks controls as 'touch' and in case of non-validity control will get error property.

Based on control error property you can add validation notification via, for example, *ngIf directive in template

# Links

https://angular.io/guide/reactive-forms
