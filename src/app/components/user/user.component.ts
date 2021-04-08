import { Component, Input, OnInit } from '@angular/core';
import { ApplicationState, IUserModel, IUserSelected, UserStatus, ViewState } from '@app/generic/qlgy.models';
import { userFocusedSelector } from '@app/store/appstate.selectors';
import { select, Store } from '@ngrx/store';
import { USER_DELETE, USER_VIEW_STATE } from '@app/store/appState.actions';
import { USER_DELETE_FEEDBACK } from '@app/generic/qlgy.constants';
import { AbstractView } from '@app/generic/qlgy.classes';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends AbstractView implements OnInit {

  @Input() userModel: IUserModel = {} as IUserModel;
  @Input() reversedIndex: number;

  public selected: boolean = false;

  constructor(public store: Store<{ appState: ApplicationState }>, public formBuilder: FormBuilder) {
    super(store, formBuilder);
    this.viewState = ViewState.VIEW;
  }

  ngOnInit(): void {
    this.store.pipe(select(userFocusedSelector, { _id: this.userModel._id })).subscribe((state: IUserSelected) => {

      if (state && this.userModel._id === state.userModel?._id) {
        console.log(state);
        this.selected = true;
        this.viewState = state.viewState;
        this.userModel = state.userModel;
        this.jumpDispatchStore(state.viewState, state.userModel);
      } else {
        this.selected = false;
        this.viewState = ViewState.VIEW;
      }
    });
  }
}
