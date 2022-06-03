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

  get lastName() {
    return this.contactForm.get('lastName');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get gender() {
  return this.contactForm.get('gender');
  }

  get isMarried() {
    return this.contactForm.get('isMarried');
  }

  get country() {
    return this.contactForm.get('country');
  }

  get city() {
    return this.contactForm.get('address').get('city');
  }

  get street() {
    return this.contactForm.get('address').get('street');
  }

  get pinCode() {
    return this.contactForm.get('address').get('pinCode');
  }

  getFieldValue(fieldLabel: string, subFieldLabel: string | undefined): string {
    if (subFieldLabel === undefined) {
      return this.contactForm.get(fieldLabel);
    }
    return this.contactForm.get(fieldLabel).get(subFieldLabel);
  }

  countryList: Country[] = [
    new Country('1', 'India'),
    new Country('2', 'USA'),
    new Country('3', 'England')
  ];

  onSubmit() {
    console.log(this.contactForm.value);
  }

} // closing braces of the component's class

export class Country {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
