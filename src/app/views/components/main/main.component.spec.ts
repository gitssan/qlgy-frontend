import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewState, IUserSelected } from '@app/generic/qlgy.models';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'src/testing/mockedData/users';
import { MainComponent } from './main.component';
import { userFocusedSelector, usersSelector, appViewStateSelector } from '@app/store/appstate.selectors';
import { MAIN_VIEW_STATE } from '@app/store/appState.actions';
import { userIndy, users } from '@testing/mockedData/users';
import { UserComponent } from '@app/components/user/user.component';
import { StatusComponent } from '@app/components/status/status.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('MainComponent', () => {

  let store: MockStore;
  let fixture: ComponentFixture<MainComponent>;
  let component: MainComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
      declarations: [MainComponent, UserComponent, StatusComponent],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    const mockedStateUsersSelector = store.overrideSelector(usersSelector, users);
    const mockedStateFocusedSelector = store.overrideSelector(userFocusedSelector, { viewState: ViewState.VIEW, userModel: userIndy } as IUserSelected);
    const mockedViewStateSelector = store.overrideSelector(appViewStateSelector, ViewState.VIEW as ViewState);

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    component.usersModel = users;
    fixture.detectChanges();
  });

  it('should have usersModel length 4', () => {
    component.usersModel = users;
    expect(component.usersModel.length).toBe(4);
  });

  it('should have ViewState VIEW', () => {
    expect(component.viewState).toEqual(ViewState.VIEW);
  });

  it(`should have ViewState ${ViewState.VIEW}`, () => {

    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    const dispatchObject = { type: MAIN_VIEW_STATE };

    spyOn(component, 'changeViewState').and.callThrough();
    component.changeViewState(ViewState.NEW);
    expect(component.changeViewState).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });
});
