import { Component, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  @ViewChild('password_field') passwordEl: IonInput;
  form: UntypedFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(6)]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });
  showPassword: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ionViewDidEnter(): void {
    this.showPassword = this.passwordEl.type == 'text';
  }

  submit() {

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.passwordEl.type = this.showPassword ? 'text' : 'password';
  }
}