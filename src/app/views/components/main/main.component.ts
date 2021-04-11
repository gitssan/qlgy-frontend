import { Component, OnDestroy } from '@angular/core';
import { ApplicationState, IUserModel, ComponentState } from '@app/generic/qlgy.models';
import { MAIN_COMPONENT_NEW_ENTRY_STATE } from '@app/store/appState.actions';
import { mainComponentStateSelector, usersSelector } from '@app/store/appstate.selectors';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {
  ComponentState = ComponentState;

  public componentState: ComponentState = ComponentState.VIEW;
  public usersModel$: Observable<IUserModel[]>;
  public viewFeedbackError: boolean;
  public success: boolean;
  public users: object[];
  public usersModel: IUserModel[];

  private userModelSubscription: Subscription;
  private appComponentStateSubscription: Subscription;

  constructor(public store: Store<{ getAppState: ApplicationState }>) {
    this.usersModel$ = this.store.pipe(select(usersSelector));
    this.userModelSubscription = this.store.select(usersSelector).subscribe((state: IUserModel[]) => {
      this.usersModel = state;
    });

    this.appComponentStateSubscription = this.store.select(mainComponentStateSelector).subscribe((state: ComponentState) => {
      this.componentState = state;
    });
  }
  
  changeComponentState(componentState: ComponentState) {
    this.store.dispatch({ type: MAIN_COMPONENT_NEW_ENTRY_STATE, payload: componentState });
  }

  ngOnDestroy() {
    this.userModelSubscription.unsubscribe();
    this.appComponentStateSubscription.unsubscribe();
  }
}
