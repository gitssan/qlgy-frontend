import { Injectable } from "@angular/core";
import { ComponentState, IApplicationState, IUserModel, userId, UserModelType, UserStatus } from "@app/generic/qlgy.models";
import { routeSegmentSelector, validateEditRouteSegmentSelector, validateIdRouteSegmentSelector, validateNewRouteSegmentSelector } from "@app/store/router/router.selectors";
import { ComponentStore } from "@ngrx/component-store";
import { select, Store } from "@ngrx/store";

export interface IUserState {
  userModel: IUserModel;
  selected: boolean;
  viewState: ComponentState;
}

export const initUserState: IUserState = { userModel: {} as IUserModel, selected: false, viewState: null };

export const stateModel = {
  new: {
    selector: validateNewRouteSegmentSelector,
    true: {
      viewState: ComponentState.FORM,
    },
    false: {
      viewState: ComponentState.NULL,
    }
  },
  view: {
    selector: validateEditRouteSegmentSelector,
    true: {
      viewState: ComponentState.FORM,
    },
    false: {
      viewState: ComponentState.VIEW,
    }
  },
  edit: {
    selector: validateEditRouteSegmentSelector,
    true: {
      viewState: ComponentState.FORM,
    },
    false: {
      viewState: ComponentState.VIEW,
    }
  }
}

@Injectable()
export class UserStore extends ComponentStore<IUserState> {

  constructor(public store: Store<{ appState: IApplicationState }>) {
    super(initUserState);
  }

  public setStateFromRoute(id: userId, componentType: UserModelType) {
    this.store.pipe(select(this.getSelector(componentType), { id })).subscribe((state: any) => this.stateReducer(this.composeState(componentType, state)));
    this.store.pipe(select(validateIdRouteSegmentSelector, { id })).subscribe((state: any) => this.stateReducer({selected: state} as IUserState));
  }

  private getViewState(type: UserModelType, state: boolean) {
    return stateModel[type][state.toString()].viewState;
  }

  private getSelector(type: UserModelType) {
    return stateModel[type].selector;
  }

  private composeState(componentType: UserModelType, state: boolean): IUserState {
    let viewState: ComponentState;
    let selected = state;
    viewState = this.getViewState(componentType, state);
    return { selected, viewState } as IUserState;
  }

  private stateReducer = this.updater((state: IUserState, userState: IUserState) => {
    return { ...state, ...userState };
  });
}