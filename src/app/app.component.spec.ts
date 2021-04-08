import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'src/testing/mockedData/users';
import { LOAD_USERS } from './store/appState.actions';

describe('AppComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
      declarations: [AppComponent],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    // const mockedState = store.overrideSelector(userFocusedSelector, { viewState: ViewState.VIEW, userModel: userIndy } as IUserSelected);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const spyOnInit = spyOn(component, 'ngOnInit').and.callThrough();
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(spyOnInit).toHaveBeenCalled();
    const dispatchObject = { type: LOAD_USERS };
    expect(storeSpy).toHaveBeenCalledWith(jasmine.objectContaining(dispatchObject));
  });
});
