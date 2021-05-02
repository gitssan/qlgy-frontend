import { Component, Input, OnInit } from '@angular/core';
import { IApplicationState, IUserModel } from '@app/generic/qlgy.models';
import { Store } from '@ngrx/store';
import { AbstractView } from '@app/generic/user/qlgy.user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStore } from '@app/generic/user/user.store';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserStore]
})
export class UserComponent extends AbstractView implements OnInit {

  @Input() userModel: IUserModel;
  @Input() reversedIndex: number;

  public componentType: string;
  public newEntryState: boolean;

  constructor(public store: Store<{ appState: IApplicationState }>, public formBuilder: FormBuilder, public router: Router, public componentStore: UserStore) {
    super(store, formBuilder, router, componentStore);
  }

  ngOnInit(): void {
    console.log('init');
    this.init();
  }

  changeStatus(userModel: IUserModel) {
    this.componentStore.patchState({ userModel });
  }
}
