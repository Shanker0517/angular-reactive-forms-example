import { AfterContentInit, Component, OnInit } from '@angular/core';
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
import { Component3Component } from './component3/component3.component';
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
    Component3Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentStep: number = 1;
  nextStepUpdate(lastStep: boolean) {
    console.log(lastStep);
    if (lastStep === true) {
      this.lastStep = false;
      this.currentStep += 1;
    }
  }
  previousStep(lastStep: boolean) {
    if (lastStep === false) {
      this.lastStep = true;
      this.currentStep -= 1;
      this.currentProgress = 0;
    }
  }
  currentProgress: number = 0;
  lastStep: boolean = false;
  constructor() {}
  updateProgress(currentProgress: number) {
    if (currentProgress === -1) {
      this.currentProgress = this.currentProgress - currentProgress;
    } else {
      this.currentProgress = this.currentProgress + currentProgress;
    }
  }
}
