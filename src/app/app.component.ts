import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component1Component } from './component1/component1.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BrowserModule } from '@angular/platform-browser';
import { Component2Component } from './component2/component2.component';
function customPasswordValidator(
  control: FormControl
): { [key: string]: boolean } | null {
  // checking if the password contains at least one uppercase letter
  const value: string = control.value;
  if (!/[A-Z]/.test(value)) {
    // Return an object with a key-value pair indicating validation failure
    return { uppercase: true };
  }
  return null;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    Component1Component,
    Component2Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  onFinish() {
    throw new Error('Method not implemented.');
  }
  // loginForm!: FormGroup;
  constructor() {}
  ngOnInit() {
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(7),
    //     customPasswordValidator,
    //   ]),
    // });
    // console.log(this.loginForm.get('password')?.errors);
  }
  onFormGroup1Submit(formData: any) {
    console.log('Form Group 1 Data:', formData);
    // Handle form data from form group 1
  }

  onFormGroup2Submit(formData: any) {
    console.log('Form Group 2 Data:', formData);
    // Handle form data from form group 2
  }

  onFormGroup3Submit(formData: any) {
    console.log('Form Group 3 Data:', formData);
    // Handle form data from form group 3
  }

  onFormArraySubmit(formData: any) {
    console.log('Form Array Data:', formData);
    // Handle form data from form array
  }
  onFormGroup1Submit2Step(formData: any) {
    console.log('Form Group 1 Data:', formData);
    // Handle form data from form group 1
  }

  onFormGroup2Submit2Step(formData: any) {
    console.log('Form Group 2 Data:', formData);
    // Handle form data from form group 2
  }

  onFormGroup3Submit2Step(formData: any) {
    console.log('Form Group 3 Data:', formData);
    // Handle form data from form group 3
  }

  onFormArraySubmit2Step(formData: any) {
    console.log('Form Array Data:', formData);
    // Handle form data from form array
  }
}
