import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
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
