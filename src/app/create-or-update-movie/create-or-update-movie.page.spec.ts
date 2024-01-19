import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { CreateOrUpdateMoviePage } from './create-or-update-movie.page';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../shared/services/movie/movie.service';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Movie } from '../shared/interfaces/movie.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CreateOrUpdateMoviePage', () => {
  let component: CreateOrUpdateMoviePage;
  let fixture: ComponentFixture<CreateOrUpdateMoviePage>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let navControllerSpy: jasmine.SpyObj<NavController>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  const fakeMovie: Movie = {
    id: '2',
    title: 'test',
    summary: 'test',
    posterURL: 'url',
    mpaRating: 'R',
    duration: 3.2,
    rate: 0,
  };

  beforeEach(waitForAsync(() => {
    activatedRouteSpy = jasmine.createSpyObj(
      'ActivatedRoute',
      {},
      {
        snapshot: { paramMap: { get: () => '2' } },
      }
    );
    movieServiceSpy = jasmine.createSpyObj('MovieService', {
      getMovie: Promise.resolve(fakeMovie),
      createMovie: Promise.resolve(fakeMovie),
      updateMovie: Promise.resolve(fakeMovie),
    });
    navControllerSpy = jasmine.createSpyObj('NavController', {
      navigateRoot: Promise.resolve(),
      navigateForward: Promise.resolve(),
    });
    toastControllerSpy = jasmine.createSpyObj('ToastController', {
      create: Promise.resolve({ present: () => {} }),
    });
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateMoviePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: ToastController, useValue: toastControllerSpy },
        { provide: NavController, useValue: navControllerSpy },
      ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateOrUpdateMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form in update on ionViewWillEnter', fakeAsync(() => {
    component.ionViewWillEnter();
    tick();
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('ion-title')).nativeElement
      .textContent;
    const submit = fixture.debugElement.query(By.css('ion-button'))
      .nativeElement.textContent;
    expect(component.mode).toEqual('update');
    expect(title).toEqual('Update movie');
    expect(submit).toEqual('Update movie');
  }));

  it('should set form in create', fakeAsync(() => {
    (
      Object.getOwnPropertyDescriptor(activatedRouteSpy, 'snapshot')
        ?.get as jasmine.Spy
    ).and.returnValue({ paramMap: { get: () => null } });
    fixture.detectChanges();
    component.ionViewWillEnter();
    tick();
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('ion-title')).nativeElement
      .textContent;
    const submit = fixture.debugElement.query(By.css('ion-button'))
      .nativeElement.textContent;
    expect(component.mode).toEqual('create');
    expect(title).toEqual('Create movie');
    expect(submit).toEqual('Create movie');
  }));

  it('should get movie data if mode update on ionViewWillEnter', fakeAsync(() => {
    component.ionViewWillEnter();
    tick();
    fixture.detectChanges();
    expect(movieServiceSpy.getMovie).toHaveBeenCalledOnceWith(fakeMovie.id);
    expect(component.form.value.title).toEqual(fakeMovie.title);
    expect(component.form.value.durationHours).toEqual(3);
    expect(component.form.value.durationMinutes).toEqual(12);
  }));

  it('should not allow form submit if form invalid', fakeAsync(() => {
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    tick();
    expect(movieServiceSpy.createMovie).not.toHaveBeenCalled();
    expect(movieServiceSpy.updateMovie).not.toHaveBeenCalled();
  }));

  // TODO: Fix these tests
  // it('should update movie when user submits form in update mode', fakeAsync(() => {
  //   component.ionViewWillEnter();
  //   tick();
  //   fixture.detectChanges();
  //   fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
  //   tick();
  //   expect(movieServiceSpy.createMovie).not.toHaveBeenCalled();
  //   expect(movieServiceSpy.updateMovie).toHaveBeenCalledTimes(1);
  //   expect(navControllerSpy.navigateForward).toHaveBeenCalledOnceWith('/movie/2');
  // }));

  // it('should create movie when user submits form in create mode', fakeAsync(() => {
  //   (
  //     Object.getOwnPropertyDescriptor(activatedRouteSpy, 'snapshot')
  //       ?.get as jasmine.Spy
  //   ).and.returnValue({ paramMap: { get: () => null } });
  //   component.ionViewWillEnter();
  //   tick();
  //   fixture.detectChanges();
  //   component.form.patchValue({
  //     title: 'title',
  //     rate: 4,
  //     summary: 'a summary',
  //     posterURL: 'url',
  //     durationHours: 2,
  //     durationMinutes: 12,
  //   });
  //   fixture.detectChanges();
  //   fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
  //   tick();
  //   expect(movieServiceSpy.createMovie).toHaveBeenCalledTimes(1);
  //   expect(movieServiceSpy.updateMovie).not.toHaveBeenCalled();
  //   expect(navControllerSpy.navigateForward).toHaveBeenCalledOnceWith('/movie/2');
  // }));

  // it('should show error toast in update mode');
  // it('should show error toast in create mode');
});
