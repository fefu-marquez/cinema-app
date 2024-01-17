import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  IonicModule,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from '../shared/services/auth/auth.service';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  let navControllerSpy: jasmine.SpyObj<NavController>;

  beforeEach(waitForAsync(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', {
      login: Promise.resolve(),
    });

    toastControllerSpy = jasmine.createSpyObj('ToastController', {
      create: Promise.resolve({ present: () => {} }),
    });

    navControllerSpy = jasmine.createSpyObj('NavController', {
      navigateRoot: Promise.resolve(),
      navigateForward: Promise.resolve(),
    });

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastController, useValue: toastControllerSpy },
        { provide: NavController, useValue: navControllerSpy },
      ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', async () => {
    component.ionViewDidEnter();
    const values = { email: 'fede@mail.com', password: 'testPassword' };
    component.form.patchValue(values);
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(authServiceSpy.login).toHaveBeenCalledOnceWith(values);
    expect(navControllerSpy.navigateRoot).toHaveBeenCalledOnceWith('/home');
  });

  it('should show toast if login failed', async () => {
    authServiceSpy.login.and.rejectWith('Invalid email');
    fixture.detectChanges();
    component.ionViewDidEnter();
    const values = { email: 'fede@mail.com', password: 'testPassword' };
    component.form.patchValue(values);
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(authServiceSpy.login).toHaveBeenCalledTimes(1);
    expect(navControllerSpy.navigateRoot).not.toHaveBeenCalled();
    expect(toastControllerSpy.create).toHaveBeenCalledTimes(1);
  });

  it('should navigate to create account if user clicked create account', async () => {
    fixture.debugElement
      .query(By.css('ion-button[name="Create account"]'))
      .nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(navControllerSpy.navigateForward).toHaveBeenCalledOnceWith('/register');
  });

  it('should not login if form invalid', () => {
    component.ionViewDidEnter();
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should show/hide password', () => {
    component.ionViewDidEnter();
    fixture.detectChanges();
    const buttonEl = fixture.debugElement.query(
      By.css('ion-button[name="Toggle Password"]')
    ).nativeElement;
    buttonEl.click();
    fixture.detectChanges();
    expect(component.passwordEl.type).withContext("user showed password").toEqual('text');
    buttonEl.click();
    fixture.detectChanges();
    expect(component.passwordEl.type).withContext("user hided password").toEqual('password');
  });

  it('should highlight errors in form if invalid', () => {
    const spy = spyOn(component.form, 'markAllAsTouched').and.callThrough();
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
