import { Injectable, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { USER_DELETE, USER_NEW, USER_EDIT, USER_COMPONENT_TRANSIENT_STATE } from '@app/store/state/appState.actions';
import { routeSegmentSelector } from "@app/store/router/router.selectors";
import { select, Store } from "@ngrx/store";
import { USER_DELETE_FEEDBACK } from "../../generic/qlgy.constants";
import { IApplicationState, IUserModel, UserStatus, ComponentState, UserModelType, userId, ComponentAction } from "../../generic/qlgy.models";
import { Observable } from "rxjs";
import { IUserState, UserStore } from "./user.store";
import { singleUserSelector } from "@app/store/state/appstate.selectors";
import { tap } from "rxjs/operators";

@Injectable()
export abstract class AbstractView {

  ComponentState = ComponentState;
  UserStatus = UserStatus;
  UserModelType = UserModelType;

  public selected: boolean = false;
  public subscriptions: { [key: string]: any } = {};
  public routeState: ComponentState;
  public userModel: IUserModel = {} as IUserModel;

  @Input() set id(id: userId) {
    this._id = id;
  }

  get id(): userId {
    return this._id;
  }

  public _id: userId = UserModelType.NEW;
  public state$: Observable<IUserState>;
  public user$: Observable<IUserModel>;
  public status$: Observable<any>;
  public componentType: UserModelType = UserModelType.NEW;

  public jumpTable: {} = {
    [ComponentState.DELETE]: (componentState: ComponentState, userModel: IUserModel) => {
      //timeout to selected user > visual border feedback
      setTimeout(() => {
        if (confirm(USER_DELETE_FEEDBACK)) {
          this.store.dispatch({ type: USER_DELETE, payload: { userModel } });
        }
      });
    },
    [ComponentState.TRANSIENT]: (componentState: ComponentState, userModel: IUserModel) => {
      this.store.dispatch({ type: USER_COMPONENT_TRANSIENT_STATE, payload: { componentState: ComponentState.EDIT, userModel } });
    },
    [ComponentAction.CANCEL]: (jump: string, route: string) => {
      if (this.isNewEntry()) {
        this.router.navigate(['/']);
      } else {
        const routeString: string = `/${route}`;
        const routeSegments: any[] = [routeString, this.id];
        this.router.navigate(routeSegments);
      }
    },
    [ComponentState.EDIT]: (componentState: ComponentState, userModel: IUserModel) => {
      this.store.dispatch({ type: USER_EDIT, payload: { userModel } });
    },
    [ComponentState.NEW]: (componentState: ComponentState, userModel: IUserModel) => {
      this.store.dispatch({ type: USER_NEW, payload: { userModel } });
    }
  };

  constructor(public store: Store<{ appState: IApplicationState }>, public formBuilder: FormBuilder, public router: Router, public componentStore: UserStore) {
    this.store.pipe(select(routeSegmentSelector)).subscribe((state) => this.routeState = state);
  }

  public init() {
    const id = this.id;
    this.componentStore.setStateFromRoute(id, this.componentType);
    this.store.pipe(select(singleUserSelector, id)).subscribe((state) => this.patchComponentStore(state));
    this.state$ = this.componentStore.state$; // .pipe(tap((state) => this.userModel = { ...state.userModel } ))
  }

  public componentStateAction(componentState: ComponentState, userModel: IUserModel = null) {
    this.jumpDispatchStore(componentState, userModel);
  }

  public jumpDispatchStore(state: ComponentState | ComponentAction, userModel: IUserModel | any) {
    if (!userModel) userModel = this.userModel;
    if (this.jumpTable.hasOwnProperty(state)) {
      this.jumpTable[state](state, userModel);
    }
  }

  public isNewEntry(): boolean {
    return this.id === UserModelType.NEW;
  }

  public changeRoute(route: string) {
    this.jumpDispatchStore(ComponentAction.CANCEL, route);
  }

  private patchComponentStore(userModel: IUserModel) {
    if (!userModel) return;
    this.userModel = userModel;
    this.componentStore.patchState({ userModel });
  }

  ngOnDestroy(): void {
    // .. unsubscribe();
  }
}