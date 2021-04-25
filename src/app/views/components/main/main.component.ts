import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationState, IUserModel, ComponentState, ROUTE_NEW } from '@app/generic/qlgy.models';
import { mainComponentStateSelector, usersSelector } from '@app/store/state/appstate.selectors';
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
  public subscriptions: { [key: string]: any } = {};
  // public usersModel: IUserModel[];

  private userModelSubscription: Subscription;
  private appComponentStateSubscription: Subscription;

  constructor(public store: Store<{ getAppState: ApplicationState }>, private router: Router) {
    this.usersModel$ = this.store.pipe(select(usersSelector));
    this.subscriptions.mainComponentStateSelector = this.store.select(mainComponentStateSelector).subscribe((state: ComponentState) => {
      this.componentState = state;
    });
  }

  changeRoute() {
    this.router.navigate([ROUTE_NEW]);
  }

  ngOnDestroy() {
    this.userModelSubscription.unsubscribe();
    this.appComponentStateSubscription.unsubscribe();
  }
}
