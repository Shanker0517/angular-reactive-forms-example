import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-component2',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './component2.component.html',
  styleUrl: './component2.component.css',
})
export class Component2Component {
  @Output() formGroup1Submit2Step = new EventEmitter<any>();
  @Output() formGroup2Submit2Step = new EventEmitter<any>();
  @Output() formGroup3Submit2Step = new EventEmitter<any>();
  @Output() formArraySubmit2Step = new EventEmitter<any>();

  @Output() progressBar = new EventEmitter<number>();
  @Output() lastStep = new EventEmitter<boolean>();
  @Input() currentStep: number = 2;

  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formArray: FormArray;
  parentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup1 = this.fb.group({
      field1: ['', Validators.required],
      field2: ['', Validators.required],
    });

    this.formGroup2 = this.fb.group({
      field3: ['', Validators.required],
      field4: ['', Validators.required],
    });

    this.formGroup3 = this.fb.group({
      field5: ['', Validators.required],
    });

    // Initialize the parent form group
    this.parentForm = this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          subField1: ['', Validators.required],
        }),
      ]),
    });

    // Access the formArray from the parent form group
    this.formArray = this.parentForm.get('formArray') as FormArray;
  }

  addFormArrayGroup() {
    if (this.formArray) {
      const newGroup = this.fb.group({
        subField1: ['', Validators.required],
      });
      this.formArray.push(newGroup);
    }
  }

  submitFormGroup1() {
    if (this.formGroup1.valid) {
      this.emitProgress(10);
    }
  }

  submitFormGroup2() {
    if (this.formGroup2.valid) {
      this.emitProgress(10);
    }
  }

  submitFormGroup3() {
    if (this.formGroup3.valid) {
      this.emitProgress(10);
      this.lastStep.emit(true);
    }
  }

  submitFormArray() {
    if (this.formArray.valid) {
      console.log(this.formArray.value);
      const val = this.currentStep + 1;
      this.emitProgress(35);
      this.lastStep.emit(true);
    }
  }
  previousStep() {
    this.lastStep.emit(false);
  }
  emitProgress(val: number) {
    this.progressBar.emit(val);
  }
}
