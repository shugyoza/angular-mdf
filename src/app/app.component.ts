// ANGULAR REACTIVE FORMS WITH FORMBUILDER

import { Component, ViewChild, ElementRef } from '@angular/core';

// import for MDF
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import form builder
import { FormBuilder } from '@angular/forms';
import { groupBy } from 'rxjs/internal/operators/groupBy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Reactive Forms';

  contactForm: any;

  // inject FormBuilder into our component class
  constructor(private formBuilder: FormBuilder) { }

  /* Finally use the group, array and control methods to build the FormModel */
  this.contactForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    gender: [''],
    isMarried: [''],
    country: [''],
  })

  // Creating a Nested FormGroup


  /* FormGroup takes 3 arguments: a collection of a child FormControl, a validator, and
  an async validator. The validators are optional. */

  // contactForm = new FormGroup({}); // single
  contactForm = new FormGroup ({
    // set value as string
    firstName: new FormControl('Sachin'),
    // set value and disabled state as object
    lastName: new FormControl({ value: 'Rahul', disabled: true }),
    // second parameter is an array of sync Validators. Angular has some built in
    // third argument is the Async Validator, which is similar to Sync Validators
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl(),
    isMarried: new FormControl(),
    country: new FormControl()
  });

  // Grouping the controls using FormGroup
  contactForm1 = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl({ value: 'Rahul', disabled: true }),
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl(),
    isMarried: new FormControl(),
    country: new FormControl(),

    address: new FormGroup({
      city: new FormControl(),
      street: new FormControl(),
      pinCode: new FormControl()
    })
  })

  onSubmit() {
    console.log(this.contactForm.value);
  }

}
