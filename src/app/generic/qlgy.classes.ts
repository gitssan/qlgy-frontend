import { Injectable, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { USER_DELETE, USER_NEW, USER_COMPONENT_STATE, USER_EDIT, USER_COMPONENT_TRANSIENT_STATE, MAIN_COMPONENT_STATE_RESET } from '@app/store/state/appState.actions';
import { StoreRootState } from "@app/store/router/router.reducer";
import { selectRouteSegments, validateEditRouteSegmentSelector, validateNewRouteSegmentSelector } from "@app/store/router/router.selectors";
import { select, Store } from "@ngrx/store";
import { USER_DELETE_FEEDBACK } from "./qlgy.constants";
import { ApplicationState, IUserModel, UserStatus, ComponentState, UserModelType, userId, ComponentAction } from "./qlgy.models";

@Injectable()
export abstract class AbstractView {

  ComponentState = ComponentState;
  UserStatus = UserStatus;
  UserModelType = UserModelType;

  public selected: boolean = false;
  public subscriptions: { [key: string]: any } = {};
  public componentState: ComponentState;

  @Input() userModel = { _id: UserModelType.NEW } as IUserModel;

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
      if (this.componentState === ComponentState.NEW) {
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

  constructor(public store: Store<{ appState: ApplicationState }>, public formBuilder: FormBuilder, public router: Router) {

  }

  public init() {

    this.subscriptions.validateNewRouteSegmentSelector = this.store.pipe(select(validateNewRouteSegmentSelector, { _id: this.userModel._id })).subscribe((state: any) => {
      if (state !== undefined) {
        if (state) {
          this.componentState = ComponentState.NEW;
          this.selected = true;
        } else {
          this.componentState = null;
          this.selected = false;
        }
      }
    });

    this.subscriptions.validateEditRouteSegmentSelector = this.store.pipe(select(validateEditRouteSegmentSelector, { _id: this.userModel._id })).subscribe((state: any) => {
      if (state !== undefined) {
        if (state) {
          this.componentState = ComponentState.EDIT;
          this.selected = true;
        } else {
          this.componentState = ComponentState.VIEW;
          this.selected = false;
        }
      }
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
      // console.log('no jump action');
    }
  }

  public isNewEntry(): boolean {
    return this.userModel._id === UserModelType.NEW
  }

  public hasRouteSegment(state: string[], label: ComponentState | userId) {
    return !!state.find((key) => key === label.toString());
  }

  public changeRoute(route: string) {
    this.jumpDispatchStore(ComponentAction.CANCEL, route);
  }

  ngOnDestroy(): void {

  }
}