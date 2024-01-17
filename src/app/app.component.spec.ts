import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth/auth.service';
import { By } from '@angular/platform-browser';
import { MenuController, NavController } from '@ionic/angular';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let navControllerSpy: jasmine.SpyObj<NavController>;
  let menuSpy: jasmine.SpyObj<MenuController>;

  beforeEach(() => {
    menuSpy = jasmine.createSpyObj('MenuController', {
      enable: Promise.resolve(),
    });
    
    authSpy = jasmine.createSpyObj('AuthService', {
      isLoggedIn: of(false),
      logout: Promise.resolve(),
    });

    navControllerSpy = jasmine.createSpyObj('NavController', {
      navigateRoot: Promise.resolve(),
    });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: MenuController, useValue: menuSpy },
        { provide: NavController, useValue: navControllerSpy },
      ],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should logout when user clicks logout', async () => {
    fixture.debugElement
      .query(By.css('ion-item[name="Logout"]'))
      .nativeElement.click();
    await fixture.whenStable();
    expect(authSpy.logout).toHaveBeenCalledTimes(1);
    expect(navControllerSpy.navigateRoot).toHaveBeenCalledTimes(1);
  });
  
  it('should disable menu if user is not logged in', () => {
    fixture.detectChanges();
    expect(menuSpy.enable).toHaveBeenCalledOnceWith(false);
  });

  it('should enable menu if user is logged in', () => {
    authSpy.isLoggedIn.and.returnValue(of(true));
    fixture.detectChanges();
    expect(menuSpy.enable).toHaveBeenCalledOnceWith(true);
  });

  // it('should initialize firebase', () => {
  //   expect(firebaseSpy.initializeApp).toHaveBeenCalledTimes(1);
  // });

  // it('should have menu labels', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const app = fixture.nativeElement;
  //   const menuItems = app.querySelectorAll('ion-label');
  //   expect(menuItems.length).toEqual(12);
  //   expect(menuItems[0].textContent).toContain('Inbox');
  //   expect(menuItems[1].textContent).toContain('Outbox');
  // });

  // it('should have urls', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const app = fixture.nativeElement;
  //   const menuItems = app.querySelectorAll('ion-item');
  //   expect(menuItems.length).toEqual(12);
  //   expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/folder/inbox');
  //   expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/folder/outbox');
  // });
});
