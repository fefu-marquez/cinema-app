import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  IonicModule,
  MenuController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from '../shared/services/auth/auth.service';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let menuSpy: jasmine.SpyObj<MenuController>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  let navControllerSpy: jasmine.SpyObj<NavController>;

  beforeEach(waitForAsync(() => {
    menuSpy = jasmine.createSpyObj('MenuController', {
      enable: Promise.resolve(),
    });

    authServiceSpy = jasmine.createSpyObj('AuthService', {
      login: Promise.resolve(),
    });

    toastControllerSpy = jasmine.createSpyObj('ToastController', {
      create: Promise.resolve({ present: () => {} }),
    });

    navControllerSpy = jasmine.createSpyObj('NavController', {
      navigateRoot: Promise.resolve(),
    });

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MenuController, useValue: menuSpy },
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
    const values = { username: 'fede@mail.com', password: 'testPassword' };
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
    authServiceSpy.login.and.returnValue(Promise.reject('Invalid email'));
    fixture.detectChanges();
    component.ionViewDidEnter();
    const values = { username: 'fede@mail.com', password: 'testPassword' };
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

  it('should not login if form invalid', () => {
    component.ionViewDidEnter();
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should disable menu', () => {
    component.ionViewWillEnter();
    expect(menuSpy.enable).toHaveBeenCalledOnceWith(false);
  });

  it('should show/hide password', () => {
    component.ionViewDidEnter();
    fixture.detectChanges();
    const buttonEl = fixture.debugElement.query(
      By.css('ion-button[name="Toggle Password"]')
    ).nativeElement;
    buttonEl.click();
    fixture.detectChanges();
    expect(component.passwordEl.type).toEqual('text');
    buttonEl.click();
    fixture.detectChanges();
    expect(component.passwordEl.type).toEqual('password');
  });
});
