import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function customPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
  // checking if the password contains at least one uppercase letter
  const value: string = control.value;
  if (!/[A-Z]/.test(value)) {
    // Return an object with a key-value pair indicating validation failure
    return { 'uppercase': true };
  }
  return null;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loginForm!: FormGroup;
  constructor(){

  }
  ngOnInit(){
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(7),customPasswordValidator])
    })
    console.log(this.loginForm.get('password')?.errors)
  }
}
