import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '@app/store/appState.reducer';
import { UserFormComponent } from './user-form.component';
import { IUserModel, IUserSelected, ViewState } from '@app/generic/qlgy.models';
import { ReactiveFormsModule } from '@angular/forms';
import { MAIN_VIEW_STATE, USER_EDIT, USER_NEW, USER_VIEW_STATE  } from '@app/store/appState.actions';
import { appViewStateSelector, userFocusedSelector, usersSelector } from '@app/store/appstate.selectors';
import { userIndy, userInvalid, users } from '@testing/mockedData/users';

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
    const mockedStateFocusedSelector = store.overrideSelector(userFocusedSelector, { viewState: ViewState.VIEW, userModel: userIndy } as IUserSelected);
    const mockedViewStateSelector = store.overrideSelector(appViewStateSelector, ViewState.VIEW as ViewState);

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
  });

  it(`[new] should have empty userModel object`, () => {
    component.userModel = null;
    fixture.detectChanges();
    const spyOnInit = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    
    expect(component.userForm.valid).toBe(false);
  });

  it(`[new] should render ${userIndy.lastName} in lastName input`, () => {
    component.userModel = userIndy as IUserModel;
    component.viewState = ViewState.NEW;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('[formControlName=lastName]').value).toBe(userIndy.lastName);
  });

  it(`[new] should call handleForm with valid form and dispatch Store`, () => {
    component.userModel = userIndy as IUserModel;
    fixture.detectChanges();
    component.viewState = ViewState.NEW;

    const handleFormSpy = spyOn(component, 'handleForm').and.callThrough();
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    component.handleForm();
    const dispatchObject = { type: USER_NEW };
    expect(handleFormSpy).toHaveBeenCalled();

    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });

  it(`[edit] should not submit invalid form`, () => {
    component.userModel = userInvalid as IUserModel;
    fixture.detectChanges();

    const handleFormSpy = spyOn(component, 'handleForm').and.callThrough();
    component.handleForm();
    expect(handleFormSpy).toHaveBeenCalled();
    expect(component.userForm.valid).toBe(false);
  });

  it(`[edit] should render ${userIndy.lastName} in lastName input`, () => {
    component.userModel = userIndy as IUserModel;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('[formControlName=lastName]').value).toBe(userIndy.lastName);
  });

  it(`[edit] should call handleForm with valid form and dispatch Store`, () => {
    component.userModel = userIndy as IUserModel;
    fixture.detectChanges();

    const handleFormSpy = spyOn(component, 'handleForm').and.callThrough();
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();

    component.handleForm();
    const dispatchObject = { type: USER_EDIT };
    expect(handleFormSpy).toHaveBeenCalled();
    // expect(component.userForm.valid).toBe(true);
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });

  it(`[edit] should dispatch Store based on ViewState.EDIT`, () => {
    component.userModel = userIndy as IUserModel;
    fixture.detectChanges();

    const cancelSpy = spyOn(component, 'changeViewState').and.callThrough();
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    component.changeViewState(ViewState.CANCEL);
    const dispatchObject = { type: USER_VIEW_STATE };
    expect(cancelSpy).toHaveBeenCalled();
    // expect(component.userForm.valid).toBe(true);
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });

  it(`[edit] should dispatch Store based on ViewState.NEW`, () => {
    //component.userModel = userIndy as IUserModel;
    fixture.detectChanges();

    const cancelSpy = spyOn(component, 'changeViewState').and.callThrough();
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    component.changeViewState(ViewState.CANCEL);
    const dispatchObject = { type: USER_VIEW_STATE };
    expect(cancelSpy).toHaveBeenCalled();
    // expect(component.userForm.valid).toBe(true);
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });
});
