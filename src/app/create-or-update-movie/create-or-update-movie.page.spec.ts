import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CreateOrUpdateMoviePage } from './create-or-update-movie.page';

describe('CreateOrUpdateMoviePage', () => {
  let component: CreateOrUpdateMoviePage;
  let fixture: ComponentFixture<CreateOrUpdateMoviePage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(CreateOrUpdateMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
