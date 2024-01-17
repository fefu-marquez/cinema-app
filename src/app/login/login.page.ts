import { Component, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IonInput, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('password_field') passwordEl: IonInput;
  showPassword: boolean;
  form: UntypedFormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private toastController: ToastController
  ) {}

  ionViewDidEnter(): void {
    this.showPassword = this.passwordEl.type == 'text';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.passwordEl.type = this.showPassword ? 'text' : 'password';
  }

  async submit() {
    if (this.form.valid) {
      try {
        await this.auth.login(this.form.value);
        await this.navController.navigateRoot('/home');
      } catch (err) {
        await this.showErrorToast();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private async showErrorToast() {
    const toast = await this.toastController.create({
      message: 'Something went wrong! Please, try again.',
      position: 'top',
      color: 'danger',
      duration: 5000,
      buttons: [
        {
          icon: 'close-circle',
          handler: () => this.toastController.dismiss(),
        },
      ],
    });
    await toast.present();
  }

  goToRegister() {
    this.navController.navigateForward('/register');
  }
}
