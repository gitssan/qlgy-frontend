import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/testing/mockedData/users';
import { UserComponent } from './user.component';
import { mainComponentStateSelector, singleUserSelector, usersSelector } from '@app/store/appstate.selectors';
import { IUserSelected, ComponentState, ApplicationState } from '@app/generic/qlgy.models';
import { userIndy, users } from 'src/testing/mockedData/users';
import { ReactiveFormsModule } from '@angular/forms';
import { USER_COMPONENT_STATE } from '@app/store/appState.actions';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore(
        {
          initialState,
          selectors: [
            { selector: usersSelector, value: users },
            { selector: singleUserSelector, value: { componentState: ComponentState.VIEW, userModel: userIndy } },
            { selector: mainComponentStateSelector, value: ComponentState.VIEW }]
        }
      )],
      declarations: [UserComponent],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`changeComponentState should have been called with ComponentState.EDIT and dispatch store`, () => {
    const changeComponentStateSpy = spyOn(component, 'changeComponentState').and.callThrough();
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    const dispatchObject = { type: USER_COMPONENT_STATE };

    component.changeComponentState(ComponentState.FORM);
    expect(changeComponentStateSpy).toHaveBeenCalledWith(ComponentState.FORM);
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });

  xit('should have not selected state based on singleUserSelector not returning valid user', () => {
    // const mockedStateFocusedSelectorNull = store.overrideSelector(singleUserSelector, null);
    store.setState({ userFocused: null } as ApplicationState);
    fixture.detectChanges();

    expect(component.selected).toBeFalsy();
    expect(component.componentState).toBe(ComponentState.VIEW);
  });

  it('should have ComponentState.VIEW when userModel is set', () => {
    component.userModel = userIndy;
    fixture.detectChanges();
    const spyOnInit = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spyOnInit).toHaveBeenCalled();
    expect(component.componentState).toBe(ComponentState.VIEW);
  });

  // it('should not dispatch store', () => {
  //   const deleteSpy = spyOn(component, 'changeComponentState').and.callThrough();
  //   const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();

  //   const confirm = spyOn(window, 'confirm').and.callThrough().and.returnValue(false);

  //   component.changeComponentState(ComponentState.DELETE);

  //   expect(confirm).toHaveBeenCalledWith(USER_DELETE_FEEDBACK);
  //   expect(deleteSpy).toHaveBeenCalled();

  //   expect(storeSpy).not.toHaveBeenCalled();
  // });
});
