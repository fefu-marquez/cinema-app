import { AbstractControlOptions, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { PasswordMatch } from './passwords-match.validator';

describe('PasswordsMatchValidator', () => {
  let formBuilder: UntypedFormBuilder;
  let form: UntypedFormGroup;
  beforeEach(() => {
    formBuilder = new UntypedFormBuilder();

    form = formBuilder.group(
      {
        password: [''],
        repeatPassword: [''],
      },
      { validator: [PasswordMatch('password', 'repeatPassword')] } as AbstractControlOptions
    );
  });

  it('should throw error if passwords dont match', () => {
    form.patchValue({ password: 'asd', repeatPassword: 'password' });
    expect(form.valid).toBeFalse();
    expect(form.hasError('passwordMatch')).toBeTrue();
  });

  it('should not throw error if passwords match', () => {
    form.patchValue({ password: 'password', repeatPassword: 'password' });
    expect(form.valid).toBeTrue();
    expect(form.hasError('passwordMatch')).toBeFalse();
  });
});
