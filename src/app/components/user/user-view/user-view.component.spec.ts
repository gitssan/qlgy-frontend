import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ComponentState, initialState } from '@app/generic/qlgy.models';
import { UserViewComponent } from './user-view.component';
import { userIndy, users } from '@testing/mockedData/users';
import { StatusComponent } from '../../status/status.component';
import { singleUserSelector, usersSelector } from '@app/store/state/appstate.selectors';

xdescribe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
      declarations: [UserViewComponent, StatusComponent],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    const mockedStateUsersSelector = store.overrideSelector(usersSelector, users);
    // const mockedStateUserSelector = store.overrideSelector(singleUserSelector, { componentState: ComponentState.VIEW, userModel: userIndy } as IUserSelected);
    // const mockedComponentStateSelector = store.overrideSelector(mainComponentStateSelector, ComponentState.VIEW as ComponentState);

    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    component.userModel = userIndy;
    fixture.detectChanges();
  });

  it(`should render ${userIndy.lastName} in lastName tag`, () => {
    component.userModel = userIndy;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('[data-karma=lastName]').textContent).toContain(userIndy.lastName);
  });
});
