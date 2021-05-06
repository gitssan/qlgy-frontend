import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IApplicationState, IUserModel, ComponentState, ROUTE_NEW } from '@app/generic/qlgy.models';
import { usersSelector } from '@app/store/state/appstate.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mainComponentStateSelector } from '../../../store/router/router.selectors'

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

  constructor(public store: Store<{ getAppState: IApplicationState }>, private router: Router) {
    this.usersModel$ = this.store.pipe(select(usersSelector));
    this.store.select(mainComponentStateSelector).subscribe((state: ComponentState) => {
      console.log('mainComponentStateSelector', state);
      this.componentState = state;
    });
  }

  changeRoute() {
    this.router.navigate([ROUTE_NEW]);
  }

  ngOnDestroy() {

  }
}
