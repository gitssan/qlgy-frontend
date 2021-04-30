import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractView } from '@app/generic/user/qlgy.user';
import { IApplicationState, IUserModel, ComponentState } from '@app/generic/qlgy.models';
import { StoreRootState } from '@app/store/router/router.reducer';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { IUserState, UserStore } from '@app/generic/user/user.store';

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends AbstractView {

  ComponentState = ComponentState;

  @Input() reversedIndex: number;
  @Input() userModel: IUserModel;

  constructor(public store: Store<{ appState: IApplicationState, routerState: StoreRootState }>, public formBuilder: FormBuilder, public router: Router, public componentStore: ComponentStore<IUserState>) {
    super(store, formBuilder, router, componentStore);
  }

  ngOnInit(): void {
    this.init();
  }
}
