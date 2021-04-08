import { Injectable, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { USER_DELETE, USER_NEW, USER_VIEW_STATE, USER_EDIT } from '@app/store/appState.actions';
import { Store } from "@ngrx/store";
import { USER_DELETE_FEEDBACK } from "./qlgy.constants";
import { ApplicationState, IUserModel, UserStatus, ViewState } from "./qlgy.models";

@Injectable()
export abstract class AbstractView {

  ViewState = ViewState;
  UserStatus = UserStatus;

  public viewState: ViewState;
  @Input() userModel: IUserModel;

  public _userModel: IUserModel = {} as IUserModel;

  public jumpTable: {} = {
    [ViewState.DELETE]: (args: any) => {
      setTimeout(() => {
        if (confirm(USER_DELETE_FEEDBACK)) {
          this.store.dispatch({ type: USER_DELETE, payload: { userModel: this.userModel } });
        }
      });
    },
    // [ViewState.CANCEL]: (args: any) => {
    //   console.log('cancel');
    // },
    // [ViewState.USER_EDIT]: (userModel: IUserModel) => {
    //   console.log('USER_EDIT', userModel);
    //   this.store.dispatch({ type: USER_EDIT, payload: { userModel } });
    // },
    // [ViewState.USER_NEW]: (userModel: IUserModel) => {
    //   this.store.dispatch({ type: USER_NEW, payload: { userModel } });
    //   console.log('USER_NEW', USER_NEW);
    // }
  };

  constructor(public store: Store<{ appState: ApplicationState }>, public formBuilder: FormBuilder) {

  }

  public changeViewState(viewState: ViewState, userModel: IUserModel = null) {
    if(!userModel) {
      userModel = this.userModel;
    }
    this.store.dispatch({ type: USER_VIEW_STATE, payload: { viewState, userModel } });
  }

  public jumpDispatchStore(state: ViewState, userModel: IUserModel) {
    if (this.jumpTable.hasOwnProperty(state)) {
      this.jumpTable[state].call(this, userModel);
    } else {
    }
  }
}