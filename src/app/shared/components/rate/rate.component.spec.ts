import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RateComponent } from './rate.component';
import { By } from '@angular/platform-browser';

describe('RateComponent', () => {
  let component: RateComponent;
  let fixture: ComponentFixture<RateComponent>;
  let emitEventSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RateComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RateComponent);
    component = fixture.componentInstance;
    emitEventSpy = spyOn(component.rateEvent, 'emit');
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 3.5 stars', () => {
    component.rate = 3.5;
    fixture.detectChanges();
    const newStars = fixture.debugElement.queryAll(By.css('.stars>ion-icon'));
    expect(newStars[0].attributes['ng-reflect-name']).toEqual('star');
    expect(newStars[1].attributes['ng-reflect-name']).toEqual('star');
    expect(newStars[2].attributes['ng-reflect-name']).toEqual('star');
    expect(newStars[3].attributes['ng-reflect-name']).toEqual(
      'star-half-outline'
    );
    expect(newStars[4].attributes['ng-reflect-name']).toEqual('star-outline');
  });

  it('should emit event to rate 3.5 stars', () => {
    fixture.debugElement
      .queryAll(By.css('.stars>ion-icon'))[3]
      .nativeElement.click();
    expect(emitEventSpy).toHaveBeenCalledOnceWith(3.5);
  });

  it('should display 0 stars', () => {
    component.rate = 0;
    fixture.detectChanges();
    const newStars = fixture.debugElement.queryAll(By.css('.stars>ion-icon'));
    expect(newStars[0].attributes['ng-reflect-name']).toEqual('star-outline');
    expect(newStars[1].attributes['ng-reflect-name']).toEqual('star-outline');
    expect(newStars[2].attributes['ng-reflect-name']).toEqual('star-outline');
    expect(newStars[3].attributes['ng-reflect-name']).toEqual('star-outline');
    expect(newStars[4].attributes['ng-reflect-name']).toEqual('star-outline');
  });

  it('should emit event to rate 0 stars', () => {
    fixture.debugElement
      .queryAll(By.css('.zeroth-star'))[0]
      .nativeElement.click();
    expect(emitEventSpy).toHaveBeenCalledOnceWith(0);
  });

  it('should display 5 stars', () => {
    component.rate = 5;
    fixture.detectChanges();
    const newStars = fixture.debugElement.queryAll(By.css('.stars>ion-icon'));
    expect(newStars[0].attributes['ng-reflect-name']).toEqual('star');
    expect(newStars[1].attributes['ng-reflect-name']).toEqual('star');
    expect(newStars[2].attributes['ng-reflect-name']).toEqual('star');
    expect(newStars[3].attributes['ng-reflect-name']).toEqual('star');
    expect(newStars[4].attributes['ng-reflect-name']).toEqual('star');
  });

  it('should emit event to rate 5 stars', () => {
    fixture.debugElement
      .queryAll(By.css('.stars>ion-icon'))[4]
      .triggerEventHandler('click', { offsetX: 16 });
    expect(emitEventSpy).toHaveBeenCalledOnceWith(5);
  });
});
