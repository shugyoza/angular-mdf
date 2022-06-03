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
  constructor(private formBuilder: FormBuilder) {
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
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(10)]],
      lastName: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      isMarried: ['', [Validators.required]],
      address: this.formBuilder.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        pinCode: ['', [Validators.required]]
      })
    })

  } // closing braces of the constructor

  get firstName() {
    return this.contactForm.get('firstName');
  }

}
