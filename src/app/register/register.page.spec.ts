import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { AuthService } from '../shared/services/auth/auth.service';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  let navControllerSpy: jasmine.SpyObj<NavController>;
  const formValues = {
    valid: {
      email: 'fede@test.com',
      password: 'password',
      repeatPassword: 'password',
      firstName: 'Federico',
      lastName: 'Marquez',
    },
    empty: {
      email: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: '',
    },
    passwordNotLongEnough: {
      email: 'fede@test.com',
      password: 'pass',
      repeatPassword: 'pass',
      firstName: 'Federico',
      lastName: 'Marquez',
    },
    passwordsDontMatch: {
      email: 'fede@test.com',
      password: 'password',
      repeatPassword: 'password2',
      firstName: 'Federico',
      lastName: 'Marquez',
    },
    emailInvalid: {
      email: 'fedealejo',
      password: 'password',
      repeatPassword: 'password',
      firstName: 'Federico',
      lastName: 'Marquez',
    },
  };

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', {
      createUser: Promise.resolve(),
    });

    toastControllerSpy = jasmine.createSpyObj('ToastController', {
      create: Promise.resolve({ present: () => Promise.resolve() }),
    });

    navControllerSpy = jasmine.createSpyObj('NavController', {
      navigateRoot: Promise.resolve(),
      navigateForward: Promise.resolve(),
    });

    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastController, useValue: toastControllerSpy },
        { provide: NavController, useValue: navControllerSpy },
      ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new account and login', async () => {
    component.ionViewDidEnter();
    component.form.patchValue(formValues.valid);
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(authServiceSpy.createUser).toHaveBeenCalledOnceWith(
      formValues.valid
    );
    expect(navControllerSpy.navigateRoot).toHaveBeenCalledOnceWith('/home');
  });

  it('should not create account if form empty', () => {
    component.form.patchValue(formValues.empty);
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(component.form.get('email')?.hasError('required')).toBeTrue();
    expect(component.form.get('password')?.hasError('required')).toBeTrue();
    expect(
      component.form.get('repeatPassword')?.hasError('required')
    ).toBeTrue();
    expect(component.form.get('firstName')?.hasError('required')).toBeTrue();
    expect(component.form.get('lastName')?.hasError('required')).toBeTrue();
    expect(authServiceSpy.createUser).not.toHaveBeenCalled();
    expect(navControllerSpy.navigateRoot).not.toHaveBeenCalled();
  });

  it('should not create account if form has invalid email', () => {
    component.form.patchValue(formValues.emailInvalid);
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(component.form.get('email')?.hasError('email')).toBeTrue();
    expect(authServiceSpy.createUser).not.toHaveBeenCalled();
    expect(navControllerSpy.navigateRoot).not.toHaveBeenCalled();
  });

  it('should not create account if form has password is not long enough', () => {
    component.form.patchValue(formValues.passwordNotLongEnough);
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(component.form.get('password')?.hasError('minlength')).toBeTrue();
    expect(authServiceSpy.createUser).not.toHaveBeenCalled();
    expect(navControllerSpy.navigateRoot).not.toHaveBeenCalled();
  });

  it('should not create account if form has passwords dont match', () => {
    component.form.patchValue(formValues.passwordsDontMatch);
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(component.form.hasError('passwordMatch')).toBeTrue();
    expect(authServiceSpy.createUser).not.toHaveBeenCalled();
    expect(navControllerSpy.navigateRoot).not.toHaveBeenCalled();
  });

  it('should highlight errors in form if invalid', () => {
    const spy = spyOn(component.form, 'markAllAsTouched').and.callThrough();
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should show toast if account already exists', async () => {
    authServiceSpy.createUser.and.rejectWith({
      message: 'email-already-in-use',
    });
    fixture.detectChanges();
    component.ionViewDidEnter();
    component.form.patchValue(formValues.valid);
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(authServiceSpy.createUser).toHaveBeenCalledTimes(1);
    expect(navControllerSpy.navigateRoot).not.toHaveBeenCalled();
    expect(toastControllerSpy.create).toHaveBeenCalledTimes(1);
  });

  it('should show toast if email is invalid (to firebase)', async () => {
    authServiceSpy.createUser.and.rejectWith({ message: 'invalid-email' });
    fixture.detectChanges();
    component.ionViewDidEnter();
    component.form.patchValue(formValues.valid);
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(authServiceSpy.createUser).toHaveBeenCalledTimes(1);
    expect(navControllerSpy.navigateRoot).not.toHaveBeenCalled();
    expect(toastControllerSpy.create).toHaveBeenCalledTimes(1);
  });

  it('should show/hide password', () => {
    component.ionViewDidEnter();
    fixture.detectChanges();
    const buttonEl = fixture.debugElement.query(
      By.css('ion-button[name="Toggle Password"]')
    ).nativeElement;
    buttonEl.click();
    fixture.detectChanges();
    expect(component.passwordEl.type)
      .withContext('user showed password')
      .toEqual('text');
    buttonEl.click();
    fixture.detectChanges();
    expect(component.passwordEl.type)
      .withContext('user hided password')
      .toEqual('password');
  });
});
