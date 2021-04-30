import { Component, Input, OnInit } from '@angular/core';
import { IApplicationState, IUserModel } from '@app/generic/qlgy.models';
import { Store } from '@ngrx/store';
import { AbstractView } from '@app/generic/user/qlgy.user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { IUserState } from '@app/generic/user/user.store';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ComponentStore]
})
export class UserComponent extends AbstractView implements OnInit {

  @Input() userModel: IUserModel;
  @Input() reversedIndex: number;

  public componentType: string;
  public newEntryState: boolean;

  constructor(public store: Store<{ appState: IApplicationState }>, public formBuilder: FormBuilder, public router: Router, public componentStore: ComponentStore<IUserState>) {
    super(store, formBuilder, router, componentStore);
  }

  ngOnInit(): void {
    this.init();
  }

  changeStatus(userModel: IUserModel) {

    this.componentStore.patchState({ userModel });
  }
}
