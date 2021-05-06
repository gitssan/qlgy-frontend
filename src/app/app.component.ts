import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from './generic/qlgy.models';
import { USERS_LOAD } from './store/state/appState.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(public store: Store<{ appState: IApplicationState }>) {
    
  }

  ngOnInit() {
    this.store.dispatch({ type: USERS_LOAD });
  }
}
