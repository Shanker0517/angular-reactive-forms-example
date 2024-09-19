import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-component1',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css'],
})
export class Component1Component implements OnInit {
  formGroup = {
    formGroup1Value: false,
    formGroup2Value: false,
    formGroup3Value: false,
    formGroup4Value: false,
  };
  organisation: FormGroup;
  formGroup3: FormGroup;
  targetOpen: boolean = true;
  organObj: FormGroup;
  @Input() currentStep: number = 1;
  @Output() progressBar = new EventEmitter<number>();
  @Output() lastStep = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {
    this.organisation = this.fb.group({
      name: ['', Validators.required],
      sector: ['', Validators.required],
      scale: ['', Validators.required],
      functionalIndicator: ['', Validators.required],
    });

    this.formGroup3 = fb.group({
      baselineYear: new FormControl('', Validators.required),
      target1: this.fb.group({
        targetYear: new FormControl('', Validators.required),
        targetType: new FormControl('', Validators.required),
        targetReduction: new FormControl('', Validators.required),
      }),
      target2: this.fb.group({
        targetYear: new FormControl('', Validators.required),
        targetType: new FormControl('', Validators.required),
        targetReduction: new FormControl('', Validators.required),
      }),
      netZeroTarget: this.fb.group({
        targetYear: new FormControl('', Validators.required),
      }),
    });

    this.organObj = this.fb.group({
      organisationalStructure: this.fb.array([
        this.createOrganStructureGroup(),
      ]),
    });
    // this.emitProgress();
  }

  createOrganStructureGroup(): FormGroup {
    return this.fb.group({
      facility: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  get organisationalStructureList(): FormArray {
    return this.organObj.get('organisationalStructure') as FormArray;
  }

  // Add a new organisational structure group
  addingOrganObj() {
    this.organisationalStructureList.push(this.createOrganStructureGroup());
  }

  removeOrganObj(index: number) {
    this.organisationalStructureList.removeAt(index);
  }
  ngOnInit(): void {}

  submitOrganisationForm() {
    if (this.organisation.valid) {
      this.formGroup.formGroup1Value = true;
      this.formGroup.formGroup2Value = true;
      console.log(this.organisation.value);
      this.emitProgress(10);
    }
  }

  submitFormArray() {
    if (this.organObj.valid) {
      console.log(this.organisationalStructureList.value);
      this.formGroup.formGroup1Value = true;
      this.formGroup.formGroup2Value = false;
      this.formGroup.formGroup3Value = true;
      this.emitProgress(10);
    }
  }

  targetChange(event: any) {
    this.targetOpen = event.target.value === 'true';
  }

  submitFormGroup3() {
    console.log(this.formGroup3.value);
    this.emitProgress(10);
    this.lastStep.emit(true);
  }

  emitProgress(val: number) {
    this.progressBar.emit(val);
  }
}
