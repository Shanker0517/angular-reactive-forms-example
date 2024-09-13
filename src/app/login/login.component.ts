import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { KeyClockService } from '../service/key-clock.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  // constructor() {
  // this.form = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required]),
  // });
  // }
  // onSubmit() {
  //   console.log(this.form.value);
  // }
  constructor(private keycloakService: KeyClockService) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.keycloakService.init();
  }

  onSubmit(): void {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout();
  }

  getToken(): void {
    const token = this.keycloakService.getToken();
    console.log('Access Token:', token);
  }
}
