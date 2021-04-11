import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserFormComponent } from './user-form.component';
import { IUserSelected, ComponentState } from '@app/generic/qlgy.models';
import { ReactiveFormsModule } from '@angular/forms';
import { mainComponentStateSelector, singleUserSelector, usersSelector } from '@app/store/appstate.selectors';
import { userIndy, userInvalid, users } from '@testing/mockedData/users';
import { initialState } from '@app/generic/qlgy.models';

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
    component.componentState = ComponentState.NEW;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('[formControlName=lastName]').value).toBe(userIndy.lastName);
  });

  it(`[new] should call handleForm with valid form and dispatch Store`, () => {
    component.userModel = userIndy;
    fixture.detectChanges();
    component.componentState = ComponentState.NEW;

    const changeComponentStateSpy = spyOn(component, 'changeComponentState').and.callThrough();
    component.handleForm();
    expect(changeComponentStateSpy).toHaveBeenCalledWith(ComponentState.NEW, component.userModel);
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

  it(`[edit] should call handleForm with valid form and changeComponentState wit USER_EDIT`, () => {
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

    expect(component.jumpTable[ComponentState.CANCEL]).toBeDefined();
    expect(component.jumpTable[ComponentState.USER_NEW]).toBeDefined();
    expect(component.jumpTable[ComponentState.USER_NEW]).toBeDefined();
    expect(component.jumpTable[ComponentState.CANCEL]).toBeDefined();
    expect(component.jumpTable[ComponentState.DELETE]).toBeDefined();
    expect(component.jumpTable[ComponentState.FORM]).toBeDefined();
    expect(component.jumpTable[ComponentState.TRANSIENT]).toBeDefined();
  });
});
