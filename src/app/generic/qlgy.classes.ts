import { Injectable, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { USER_DELETE, USER_NEW, USER_COMPONENT_STATE, USER_EDIT, USER_COMPONENT_TRANSIENT_STATE, MAIN_COMPONENT_STATE_RESET } from '@app/store/appState.actions';
import { Store } from "@ngrx/store";
import { USER_DELETE_FEEDBACK } from "./qlgy.constants";
import { ApplicationState, IUserModel, UserStatus, ComponentState, UserModelType } from "./qlgy.models";

@Injectable()
export abstract class AbstractView {

  ComponentState = ComponentState;
  UserStatus = UserStatus;
  UserModelType = UserModelType;

  public componentState: ComponentState;
  @Input() userModel: IUserModel;

  set userModelRollback(userModel: IUserModel) {
    this._userModelRollback = userModel;
  }

  get userModelRollback(): IUserModel {
    return this._userModelRollback;
  }

  public jumpTable: {} = {
    [ComponentState.DELETE]: (componentState: ComponentState, userModel: IUserModel) => {
      setTimeout(() => {
        if (confirm(USER_DELETE_FEEDBACK)) {
          this.store.dispatch({ type: USER_DELETE, payload: { userModel } });
        }
      });
    },
    [ComponentState.TRANSIENT]: (componentState: ComponentState, userModel: IUserModel) => {
      this.store.dispatch({ type: USER_COMPONENT_TRANSIENT_STATE, payload: { componentState: ComponentState.FORM, userModel } });
    },
    [ComponentState.CANCEL]: (componentState: ComponentState, userModel: IUserModel) => {
      if(this.componentState === ComponentState.USER_EDIT) {
        this.store.dispatch({ type: USER_COMPONENT_STATE, payload: { componentState: ComponentState.ROLLBACK, userModel: this.userModelRollback } });
      } else if (this.componentState === ComponentState.USER_NEW) {
        this.store.dispatch({ type: MAIN_COMPONENT_STATE_RESET });
      }
    },
    [ComponentState.USER_EDIT]: (componentState: ComponentState, userModel: IUserModel) => {
      this.store.dispatch({ type: USER_EDIT, payload: { userModel } });
    },
    [ComponentState.USER_NEW]: (componentState: ComponentState, userModel: IUserModel) => {
      this.store.dispatch({ type: USER_NEW, payload: { userModel } });
    },
    [ComponentState.FORM]: (componentState: ComponentState, userModel: IUserModel) => {
      this.store.dispatch({ type: USER_COMPONENT_STATE, payload: { componentState: ComponentState.FORM, userModel } });
    }
  };

  private _userModelRollback: IUserModel;

  constructor(public store: Store<{ appState: ApplicationState }>, public formBuilder: FormBuilder) {

  }

  public changeComponentState(componentState: ComponentState, userModel: IUserModel = null) {
    if (!userModel) {
      userModel = this.userModel;
    }
    this.jumpDispatchStore(componentState, userModel);
  }

  public jumpDispatchStore(state: ComponentState, userModel: IUserModel) {
    if (this.jumpTable.hasOwnProperty(state)) {
      this.jumpTable[state](state, userModel);
    } else {
      // console.log('no jump action');
    }
  }
}