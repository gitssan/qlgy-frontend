import { Injectable, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { USER_DELETE, USER_NEW, USER_EDIT, USER_COMPONENT_TRANSIENT_STATE } from '@app/store/state/appState.actions';
import { routeSegmentSelector, validateEditRouteSegmentSelector, validateNewRouteSegmentSelector } from "@app/store/router/router.selectors";
import { select, Store } from "@ngrx/store";
import { USER_DELETE_FEEDBACK } from "../qlgy.constants";
import { IApplicationState, IUserModel, UserStatus, ComponentState, UserModelType, userId, ComponentAction } from "../qlgy.models";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { ininitValue, IUserState, UserStore } from "./user.store";
import { singleUserSelector } from "@app/store/state/appstate.selectors";

@Injectable()
export abstract class AbstractView {

  ComponentState = ComponentState;
  UserStatus = UserStatus;
  UserModelType = UserModelType;

  public selected: boolean = false;
  public subscriptions: { [key: string]: any } = {};
  public viewState: ComponentState;
  public routeState: ComponentState;

  @Input() userModel = { _id: UserModelType.NEW } as IUserModel;

  public user$: Observable<IUserState>;
  public status$: Observable<any>;

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
        const routeSegments: any[] = [routeString, this.userModel._id];
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

  constructor(public store: Store<{ appState: IApplicationState }>, public formBuilder: FormBuilder, public router: Router, public componentStore: ComponentStore<IUserState>) {

  }

  public init() {

    console.log('init');

    const _id = this.userModel._id;
    this.componentStore.setState({ userModel: this.userModel } as IUserState);

    this.user$ = this.componentStore.state$;

    this.status$ = this.componentStore.select(state => state.userModel.status);
    const user = this.componentStore.select((state) => {
      console.log('user', state);
    });

    // this.componentStore.state$.subscribe((state) => { this.viewState = state.viewState; });

    this.store.pipe(select(singleUserSelector, _id)).subscribe((state) => {
        this.componentStore.patchState({ userModel: state });
    });

    this.store.pipe(select(validateNewRouteSegmentSelector, { _id })).subscribe((state: any) => {
      if (state !== undefined) {
        if (state) {
          this.viewState = ComponentState.FORM;
          this.componentStore.patchState({ selected: true, viewState: ComponentState.FORM });
        } else {
          this.viewState = null;
          this.componentStore.patchState({ selected: false, viewState: null });
        }
      }
    });

    this.store.pipe(select(validateEditRouteSegmentSelector, { _id })).subscribe((state: any) => {
      if (state !== undefined) {
        if (state) {
          this.viewState = ComponentState.FORM;
          this.componentStore.patchState({ selected: true, viewState: ComponentState.FORM });
        } else {
          this.viewState = ComponentState.VIEW;
          this.componentStore.patchState({ selected: false, viewState: ComponentState.VIEW });
        }
      }
    });

    this.store.pipe(select(routeSegmentSelector)).subscribe((state) => {
      this.routeState = state;
    });
  }

  public componentStateAction(componentState: ComponentState, userModel: IUserModel = null) {
    if (!userModel) {
      userModel = this.userModel;
    }
    this.jumpDispatchStore(componentState, userModel);
  }

  public jumpDispatchStore(state: ComponentState | ComponentAction, userModel: IUserModel | any) {
    if (this.jumpTable.hasOwnProperty(state)) {
      this.jumpTable[state](state, userModel);
    } else {
      console.log('no jump action');
    }
  }

  public isNewEntry(): boolean {
    return this.userModel._id === UserModelType.NEW
  }

  public changeRoute(route: string) {
    this.jumpDispatchStore(ComponentAction.CANCEL, route);
  }

  ngOnDestroy(): void {
    // this.subscriptions.validateNewRouteSegmentSelector.unsubscribe();
    // this.subscriptions.validateEditRouteSegmentSelector.unsubscribe();
  }
}