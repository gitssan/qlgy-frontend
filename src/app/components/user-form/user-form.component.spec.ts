import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserFormComponent } from './user-form.component';
import { IUserSelected, ComponentState, IUserModel, UserStatus } from '@app/generic/qlgy.models';
import { ReactiveFormsModule } from '@angular/forms';
import { mainComponentStateSelector, singleUserSelector, usersSelector } from '@app/store/appstate.selectors';
import { userIndy, userIndyPrivate, userInvalid, userNew, users } from '@testing/mockedData/users';
import { initialState } from '@app/generic/qlgy.models';
import { MAIN_COMPONENT_STATE_RESET, USER_COMPONENT_STATE, USER_DELETE, USER_EDIT, } from '@app/store/appState.actions';
import { USER_DELETE_FEEDBACK } from '@app/generic/qlgy.constants';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
      declarations: [UserFormComponent],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    const mockedStateUsersSelector = store.overrideSelector(usersSelector, users);
    const mockedStateFocusedSelector = store.overrideSelector(singleUserSelector, { componentState: ComponentState.VIEW, userModel: userIndy } as IUserSelected);
    const mockedComponentStateSelector = store.overrideSelector(mainComponentStateSelector, ComponentState.VIEW as ComponentState);

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
  });

  it(`[new] should have an invalid form`, () => {
    component.userModel = userInvalid;
    fixture.detectChanges();
    const onInitSpy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(onInitSpy).toHaveBeenCalled();
    expect(component.userForm.valid).toBe(false);
  });

  it(`[new] should render ${userIndy.lastName} in lastName input`, () => {
    component.userModel = userIndy;
    component.componentState = ComponentState.USER_NEW;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('[formControlName=lastName]').value).toBe(userIndy.lastName);
  });

  it(`[new] should call handleForm with valid form and dispatch Store`, () => {
    component.userModel = userIndy;
    fixture.detectChanges();
    component.componentState = ComponentState.USER_NEW;

    const changeComponentStateSpy = spyOn(component, 'changeComponentState').and.callThrough();
    component.handleForm();
    expect(changeComponentStateSpy).toHaveBeenCalledWith(ComponentState.USER_NEW, component.userModel);
  });

  it(`[edit] should not submit invalid form`, () => {
    component.userModel = userInvalid;
    fixture.detectChanges();

    const handleFormSpy = spyOn(component, 'handleForm').and.callThrough();
    component.handleForm();
    expect(handleFormSpy).toHaveBeenCalled();
    expect(component.userForm.valid).toBe(false);
  });

  it(`[edit] should render ${userIndy.lastName} in lastName input`, () => {
    component.userModel = userIndy;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('[formControlName=lastName]').value).toBe(userIndy.lastName);
  });

  it(`[edit] should call handleForm with valid form and changeComponentState with USER_EDIT`, () => {
    component.userModel = userIndy;
    fixture.detectChanges();
    component.componentState = ComponentState.USER_EDIT;

    const changeComponentStateSpy = spyOn(component, 'changeComponentState').and.callThrough();
    component.handleForm();
    expect(changeComponentStateSpy).toHaveBeenCalledWith(ComponentState.USER_EDIT, component.userModel);
  });

  it(`[new] should call changeComponentState and jumpTo dispatch Store based on cancel`, () => {
    component.userModel = userIndy;
    fixture.detectChanges();

    const changeComponentStateSpy = spyOn(component, 'changeComponentState').and.callThrough();
    const jumpDispatchStoreSpy = spyOn(component, 'jumpDispatchStore').and.callThrough();
    component.changeComponentState(ComponentState.CANCEL);

    expect(changeComponentStateSpy).toHaveBeenCalled();
    expect(component.jumpDispatchStore).toHaveBeenCalledWith(ComponentState.CANCEL, component.userModel);

    expect(component.jumpTable[ComponentState.CANCEL]).toBeDefined();
  });

  it(`should have jumpTable object with accoring keys`, () => {
    component.userModel = userIndy;
    fixture.detectChanges();

    expect(component.jumpTable[ComponentState.CANCEL]).toBeDefined();
    expect(component.jumpTable[ComponentState.USER_EDIT]).toBeDefined();
    expect(component.jumpTable[ComponentState.USER_NEW]).toBeDefined();
    expect(component.jumpTable[ComponentState.CANCEL]).toBeDefined();
    expect(component.jumpTable[ComponentState.DELETE]).toBeDefined();
    expect(component.jumpTable[ComponentState.FORM]).toBeDefined();
    expect(component.jumpTable[ComponentState.TRANSIENT]).toBeDefined();

    // error > USER_EDIT does not resolve
    // const jumpDispatchStoreSpy = spyOn(component.jumpTable, USER_EDIT).and.callThrough();

    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    component.jumpTable[ComponentState.USER_EDIT](ComponentState.USER_EDIT, component.userModel);

    const dispatchObject = { type: USER_EDIT };
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });


  it(`should call cancel from jumpTable, if path`, () => {
    component.componentState = ComponentState.USER_EDIT;
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    component.jumpTable[ComponentState.CANCEL](ComponentState.CANCEL, component.userModel);

    const dispatchObject = { type: USER_COMPONENT_STATE };
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });

  it(`should call cancel from jumpTable, else path`, () => {
    component.componentState = ComponentState.USER_NEW;
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    component.jumpTable[ComponentState.CANCEL](ComponentState.CANCEL, component.userModel);

    const dispatchObject = { type: MAIN_COMPONENT_STATE_RESET };
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });

  it(`should call jumpDispatchStore`, () => {
    component.userModel = userIndy;
    fixture.detectChanges();
    const jumpDispatchStoreSpy = spyOn(component, 'jumpDispatchStore').and.callThrough();
    component.jumpDispatchStore(ComponentState.CANCEL, component.userModel);
    expect(jumpDispatchStoreSpy).toHaveBeenCalledWith(ComponentState.CANCEL, component.userModel);
    expect(component.jumpTable[ComponentState.CANCEL]).toBeDefined();
  });

  it(`should call delete from jumpTable, with confirm`, () => {
    component.componentState = ComponentState.DELETE;
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    const confirm = spyOn(window, 'confirm').and.callThrough().and.returnValue(true);
    component.jumpTable[ComponentState.DELETE](ComponentState.DELETE, component.userModel);
    expect(confirm).toHaveBeenCalled();

    const dispatchObject = { type: USER_DELETE };
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });

  it(`should not call delete from jumpTable, confirm cancelled`, () => {
    component.componentState = ComponentState.DELETE;
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    const confirm = spyOn(window, 'confirm').and.callThrough().and.returnValue(false);
    component.jumpTable[ComponentState.DELETE](ComponentState.DELETE, component.userModel);
    expect(confirm).toHaveBeenCalled();
    expect(storeSpy).not.toHaveBeenCalled();
  });

  it(`[edit] should trigger status form field change`, fakeAsync(() => {
    component.userModel = userIndy;
    fixture.detectChanges();

    const changeComponentStateSpy = spyOn(component, 'changeComponentState').and.callThrough();

    component.userForm.get('status').setValue(UserStatus.PRIVATE);
    component.userForm.get('status').updateValueAndValidity({ emitEvent: true });
    fixture.detectChanges();
    tick();

    const userModel: IUserModel = { ...component.userModel, ...component.userForm.value } as IUserModel;
    expect(changeComponentStateSpy).toHaveBeenCalledWith(ComponentState.TRANSIENT, userModel);
  }));

  it(`[new] should set ComponentState.NEW based on _id: UserModelType.NEW`, fakeAsync(() => {
    component.userModel = userNew;
    fixture.detectChanges();
    const onInitSpy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(onInitSpy).toHaveBeenCalled();
    expect(component.componentState).toBe(ComponentState.USER_NEW);
  }));


  // it('should dispatch store', () => {
  //   const deleteSpy = spyOn(component, 'delete').and.callThrough();
  //   const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
  //   component.delete();

  //   const alert = spyOn(window, 'alert').and.returnValue(true);
  //   const confirm = spyOn(window, 'confirm').and.returnValue(true);
  //   expect(alert).toHaveBeenCalled();
  //   expect(confirm).toHaveBeenCalled();
  //   const confirm = spyOn(window, 'confirm').and.callThrough().and.returnValue(true);

  //   component.delete();

  //   expect(confirm).toHaveBeenCalledWith(USER_DELETE_MESSAGE);
  //   expect(deleteSpy).toHaveBeenCalled();

  //   expect(storeSpy).toHaveBeenCalled();
  // });

  // it('should not dispatch store', () => {
  //   const deleteSpy = spyOn(component, 'delete').and.callThrough();
  //   const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();

  //   const confirm = spyOn(window, 'confirm').and.callThrough().and.returnValue(false);

  //   component.delete();

  //   expect(confirm).toHaveBeenCalledWith(USER_DELETE_MESSAGE);
  //   expect(deleteSpy).toHaveBeenCalled();

  //   expect(storeSpy).not.toHaveBeenCalled();
  // });
});
