import { Component, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IonInput, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../shared/services/auth/auth.service';
import { PasswordMatch } from '../shared/validators/passwords-match/passwords-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  @ViewChild('password_field') passwordEl: IonInput;
  @ViewChild('repeat_password_field') repeatPasswordEl: IonInput;
  form: UntypedFormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    },
    { validator: [PasswordMatch('password', 'repeatPassword')] } as AbstractControlOptions
  );
  showPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private navController: NavController,
    private toastController: ToastController
  ) {}

  ionViewDidEnter(): void {
    this.showPassword = this.passwordEl.type == 'text';
  }

  async submit() {
    if (this.form.valid) {
      try {
        await this.auth.createUser(this.form.value);
        await this.navController.navigateRoot('/home');
      } catch (error: any) {
        if (error.message.includes('invalid-email')) {
          await this.showErrorInvalidEmailToast();
        } else if (error.message.includes('email-already-in-use')) {
          await this.showErrorEmailInUseToast();
        }
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.passwordEl.type = this.showPassword ? 'text' : 'password';
    this.repeatPasswordEl.type = this.showPassword ? 'text' : 'password';
  }

  private async showErrorInvalidEmailToast() {
    const toast = await this.toastController.create({
      message: 'Email is not valid. Please try again.',
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
  private async showErrorEmailInUseToast() {
    const toast = await this.toastController.create({
      message: 'There is already an account using that mail.',
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
}
