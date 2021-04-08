import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/testing/mockedData/users';
import { UserComponent } from './user.component';
import { appViewStateSelector, userFocusedSelector, usersSelector } from '@app/store/appstate.selectors';
import { IUserModel, IUserSelected, ViewState } from '@app/generic/qlgy.models';
import { StatusComponent } from '../status/status.component';
import { userIndy, users } from 'src/testing/mockedData/users';
import { USER_DELETE_FEEDBACK } from '@app/generic/qlgy.constants';
import { USER_VIEW_STATE } from '@app/store/appState.actions';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
      declarations: [UserComponent, StatusComponent],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    const mockedStateUsersSelector = store.overrideSelector(usersSelector, users);
    const mockedStateFocusedSelector = store.overrideSelector(userFocusedSelector, { viewState: ViewState.VIEW, userModel: userIndy } as IUserSelected);
    const mockedViewStateSelector = store.overrideSelector(appViewStateSelector, ViewState.VIEW as ViewState);

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.userModel = userIndy as IUserModel;
    fixture.detectChanges();
  });

  it(`should render ${userIndy.lastName} in lastName tag`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('[data-karma=lastName]').textContent).toContain(userIndy.lastName);
  });

  it(`changeViewState should have been called with ViewState.EDIT and dispatch store`, () => {
    const changeViewStateSpy = spyOn(component, 'changeViewState').and.callThrough();
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    const dispatchObject = { type: USER_VIEW_STATE };

    component.changeViewState(ViewState.EDIT);
    expect(changeViewStateSpy).toHaveBeenCalledWith(ViewState.EDIT);
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });

  // it('should dispatch store', () => {
  //   const deleteSpy = spyOn(component, 'changeViewState').and.callThrough();
  //   const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();

  //   const confirm = spyOn(window, 'confirm').and.callThrough().and.returnValue(true);
    
  //   component.changeViewState(ViewState.DELETE);

  //   expect(confirm).toHaveBeenCalledWith(USER_DELETE_FEEDBACK);
  //   expect(deleteSpy).toHaveBeenCalled();

  //   expect(storeSpy).toHaveBeenCalled();
  // });

  // it('should not dispatch store', () => {
  //   const deleteSpy = spyOn(component, 'changeViewState').and.callThrough();
  //   const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();

  //   const confirm = spyOn(window, 'confirm').and.callThrough().and.returnValue(false);
    
  //   component.changeViewState(ViewState.DELETE);

  //   expect(confirm).toHaveBeenCalledWith(USER_DELETE_FEEDBACK);
  //   expect(deleteSpy).toHaveBeenCalled();

  //   expect(storeSpy).not.toHaveBeenCalled();
  // });
});
