import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from './generic/qlgy.models';
import { USERS_LOAD } from './store/appState.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(public store: Store<{ appState: ApplicationState }>) {
    
  }

  ngOnInit() {
    this.store.dispatch({ type: USERS_LOAD });
  }
}
