import { Component, OnDestroy } from '@angular/core';
import { AbstractView } from '@app/generic/qlgy.classes';
import { ApplicationState, IUserModel, ViewState } from '@app/generic/qlgy.models';
import { MAIN_VIEW_STATE } from '@app/store/appState.actions';
import { appViewStateSelector, usersSelector } from '@app/store/appstate.selectors';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {
  ViewState = ViewState;

  public viewState: ViewState = ViewState.VIEW;
  public usersModel$: Observable<IUserModel[]>;
  public viewFeedbackError: boolean;
  public success: boolean;
  public users: object[];
  public usersModel: IUserModel[];

  private userModelSubscription: Subscription;
  private appViewStateSubscription: Subscription;

  constructor(public store: Store<{ getAppState: ApplicationState }>) {
    this.usersModel$ = this.store.pipe(select(usersSelector));
    this.userModelSubscription = this.store.select(usersSelector).subscribe((state: IUserModel[]) => {
      this.usersModel = state;
      this.viewState = ViewState.VIEW;
    });

    this.appViewStateSubscription = this.store.select(appViewStateSelector).subscribe((state: ViewState) => {
      this.viewState = state;
    });
  }

  public changeViewState(viewState: ViewState) {
      this.store.dispatch({ type: MAIN_VIEW_STATE, payload: viewState });
  }

  ngOnDestroy() {
    this.userModelSubscription.unsubscribe();
    this.appViewStateSubscription.unsubscribe();
  }
}
