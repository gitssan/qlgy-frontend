import { ComponentFixture, TestBed } from '@angular/core/testing';
import { userIndy, userIndyPrivate } from '@testing/mockedData/users';

import { StatusComponent } from './status.component';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render status PUBLIC', () => {
    component.state = userIndy.status;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.status').textContent).toBe(userIndy.status.toUpperCase());
  });

  it('should hasClass `status--public` based on state PUBLIC', () => {
    component.state = userIndy.status;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.status').classList.contains('status--public')).toBeTruthy();
  });

  it('should hasClass `status--private` based on state PRIVATE', () => {
    component.state = userIndyPrivate.status;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.status').classList.contains('status--private')).toBeTruthy();
  });
});