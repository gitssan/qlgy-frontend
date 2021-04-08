import { Component } from '@angular/core';
import { ApplicationState } from '@app/generic/qlgy.models';
import { usersLengthSelector } from '@app/store/appstate.selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public amount: number;
  constructor(public store: Store<{ appState: ApplicationState }>) {
    this.store.pipe(select(usersLengthSelector)).subscribe((state) => {
      console.log('usersLengthSelector', state)
      this.amount = state;
    });
  }
}
