import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IApplicationState } from '@app/generic/qlgy.models';
import { usersLengthSelector } from '@app/store/state/appstate.selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public amount: number;
  constructor(public store: Store<{ appState: IApplicationState }>, private router: Router) {
    this.store.pipe(select(usersLengthSelector)).subscribe((state) => {
      this.amount = state;
    });
  }

  changeRoute() {
    this.router.navigate(['/']);
  }
}
