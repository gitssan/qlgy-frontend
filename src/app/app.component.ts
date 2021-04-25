import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from './generic/qlgy.models';
import { USERS_LOAD } from './store/state/appState.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private subscriptions: { [key: string]: any } = {};

  constructor(public store: Store<{ appState: ApplicationState }>) {
    
  }

  ngOnInit() {
    this.store.dispatch({ type: USERS_LOAD });

    // this.subscriptions.routerSelector = this.store
    // .pipe(select(getCurrentRouteState))
    // .subscribe((route: any) => {
    //   const seriesId = route.params.seriesId;
    //   this.series = series.find((series) => series.id === seriesId);
    // });
  }

  ngOnDestroy(): void {
    this.subscriptions.routerSelector.unsubscribe();
  }
}
