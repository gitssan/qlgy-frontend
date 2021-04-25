import { Component, Input, OnInit } from '@angular/core';
import { ApplicationState, IUserModel, IUserSelected, UserModelType, ComponentState, userId } from '@app/generic/qlgy.models';
import { select, Store } from '@ngrx/store';
import { AbstractView } from '@app/generic/qlgy.classes';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { singleUserSelector } from '@app/store/state/appstate.selectors';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends AbstractView implements OnInit {

  @Input() userModel: IUserModel;
  @Input() reversedIndex: number;

  public componentType: string;
  public newEntryState: boolean;

  constructor(public store: Store<{ appState: ApplicationState }>, public formBuilder: FormBuilder, public router: Router) {
    super(store, formBuilder, router);
  }

  ngOnInit(): void {
    this.init();
    this.subscriptions.singleUserSelector = this.store.pipe(select(singleUserSelector, { _id: this.userModel._id })).subscribe((state: IUserSelected) => {
      if (state) {
        this.userModel = state.userModel;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.singleUserSelector.unsubscribe();
  }
}
