import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentState, IUserSelected } from '@app/generic/qlgy.models';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'src/testing/mockedData/users';
import { MainComponent } from './main.component';
import { singleUserSelector, usersSelector, mainComponentStateSelector } from '@app/store/appstate.selectors';
import { userIndy, users } from '@testing/mockedData/users';
import { ReactiveFormsModule } from '@angular/forms';
import { MAIN_COMPONENT_NEW_ENTRY_STATE } from '@app/store/appState.actions';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('MainComponent', () => {

  let store: MockStore;
  let fixture: ComponentFixture<MainComponent>;
  let component: MainComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
      declarations: [MainComponent],
    }).compileComponents();
  
    store = TestBed.inject(MockStore);
    const mockedStateUsersSelector = store.overrideSelector(usersSelector, users);
    const mockedStateFocusedSelector = store.overrideSelector(singleUserSelector, { componentState: ComponentState.VIEW, userModel: userIndy } as IUserSelected);
    const mockedComponentStateSelector = store.overrideSelector(mainComponentStateSelector, ComponentState.VIEW as ComponentState);

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    component.usersModel = users;
    fixture.detectChanges();
  });

  it('should have usersModel length 4', () => {
    component.usersModel = users;
    expect(component.usersModel.length).toBe(4);
  });

  it('should have ComponentState VIEW', () => {
    expect(component.componentState).toEqual(ComponentState.VIEW);
  });

  it(`should have ComponentState ${ComponentState.VIEW}`, () => {

    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    const dispatchObject = { type: MAIN_COMPONENT_NEW_ENTRY_STATE };

    spyOn(component, 'changeComponentState').and.callThrough();
    component.changeComponentState(ComponentState.NEW);
    expect(component.changeComponentState).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });
});
