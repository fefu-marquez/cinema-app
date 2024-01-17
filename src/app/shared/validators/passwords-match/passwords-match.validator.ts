import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordMatch(passwordControlName: string, passwordRepeatControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(passwordControlName);
    const passwordRepeatControl = control.get(passwordRepeatControlName);

    if (passwordControl?.value == passwordRepeatControl?.value) {
        control.setErrors(null);
        return null;
    }

    const error: ValidationErrors = { passwordMatch: true };
    control.setErrors(error);
    return error;
  };
}
