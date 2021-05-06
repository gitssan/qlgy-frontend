import { Component, Input, OnInit } from '@angular/core';
import { IApplicationState, IUserModel, userId, UserModelType } from '@app/generic/qlgy.models';
import { Store } from '@ngrx/store';
import { AbstractView } from '@app/components/user/qlgy.user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStore } from '@app/components/user/user.store';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserStore]
})
export class UserComponent extends AbstractView implements OnInit {

  @Input() userModel: IUserModel;
  @Input() reversedIndex: number;

  @Input() set id(id: userId) {
    this.componentType = UserModelType.VIEW;
    this._id = id;
  }

  get id(): userId {
    return this._id;
  }

  constructor(public store: Store<{ appState: IApplicationState }>, public formBuilder: FormBuilder, public router: Router, public componentStore: UserStore) {
    super(store, formBuilder, router, componentStore);
  }

  ngOnInit(): void {
    this.init();
  }

  changeStatus(userModel: IUserModel) {
    this.componentStore.patchState({ userModel });
  }
}
