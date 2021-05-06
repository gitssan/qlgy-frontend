import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractView } from '@app/components/user/qlgy.user';
import { IApplicationState, IUserModel, ComponentState, userId, UserModelType } from '@app/generic/qlgy.models';
import { StoreRootState } from '@app/store/router/router.reducer';
import { Store } from '@ngrx/store';
import { UserStore } from '@app/components/user/user.store';

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends AbstractView implements OnInit {

  ComponentState = ComponentState;

  @Input() reversedIndex: number;
  @Input() userModel: IUserModel;

  @Input() set id(id: userId) {
    this.componentType = UserModelType.VIEW;
    this._id = id;
  }

  get id(): userId {
    return this._id;
  }

  constructor(public store: Store<{ appState: IApplicationState, routerState: StoreRootState }>, public formBuilder: FormBuilder, public router: Router, public componentStore: UserStore) {
    super(store, formBuilder, router, componentStore);
  }

  ngOnInit(): void {
    this.init();
  }
}
