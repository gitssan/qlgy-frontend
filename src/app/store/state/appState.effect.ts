/* istanbul ignore file */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import {
  USERS_LOAD,
  USERS_LOAD_ERROR,
  USER_DELETE,
  USER_DELETE_ERROR,
  USER_DELETE_SUCCESS,
  USER_EDIT,
  USER_EDIT_ERROR,
  USER_EDIT_SUCCESS,
  USERS_LOAD_SUCCESS,
  USER_NEW,
  USER_NEW_ERROR,
  USER_NEW_SUCCESS,
  MAIN_USERS_RELOAD,
  MAIN_USERS_RELOAD_ERROR,
  FEEDBACK_NEW,
  FEEDBACK_OF_TYPE_ACTIONS
} from './appState.actions';
import { IApplicationState, IQlgyAction, IQlgyPayload, IUserModel, ComponentState, ROUTE_VIEW, IQlgyResponse } from '@app/generic/qlgy.models';
import { Router } from '@angular/router';
import { QlgyService } from '@app/services/glgy.service';

@Injectable()
export class AppStateEffects {
  handleUserSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USERS_LOAD),
      mergeMap(() => {
        let returnObersvable: Observable<any>;
        if (this.qlgyService.hasUsersData()) {
          // console.log('load from localStorage');
          returnObersvable = this.qlgyService.getUsersData();
        } else {
          // console.log('load from JSON');
          returnObersvable = this.qlgyService.initUsers().pipe(
            concatMap((response: IUserModel[]) => {
              response = response.map((user: IUserModel, index: number) => {
                user._id = index;
                return user;
              });
              response.reverse();
              return this.qlgyService.setUsersData(response);
            })
          );
        }
        return returnObersvable.pipe(
          map((result: IUserModel[]) => {
            const payload: IUserModel[] = result;
            return { type: USERS_LOAD_SUCCESS, payload };
          }),
          catchError((effectError) => {
            return of({ type: USERS_LOAD_ERROR, effectError });
          })
        );
      })
    )
  );

  userEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_EDIT),
      mergeMap((action: IQlgyAction) => {
        return this.qlgyService.userEdit(action.payload.userModel).pipe(
          map((result: IQlgyResponse) => {
            this.router.navigate([ROUTE_VIEW, action.payload.userModel._id]);
            return { type: USER_EDIT_SUCCESS, payload: result.usersModel };
          }),
          catchError((effectError) => {
            return of({ type: USER_EDIT_ERROR, payload: effectError });
          })
        );
      })
    )
  );

  userDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_DELETE),
      mergeMap((action: IQlgyAction) => {
        return this.qlgyService.userDelete(action.payload.userModel).pipe(
          map((result) => {
            this.router.navigate(['/']);
            return { type: USER_DELETE_SUCCESS, payload: { userModel: result.userModel } };
          }),
          catchError((effectError) => {
            return of({ type: USER_DELETE_ERROR, payload: effectError });
          })
        );
      })
    )
  );

  userNew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_NEW),
      mergeMap((action: IQlgyAction) => {
        return this.qlgyService.userNew(action.payload.userModel).pipe(
          map((result: IQlgyPayload) => {
            this.router.navigate([ROUTE_VIEW, result.userModel._id]);
            return { type: USER_NEW_SUCCESS, payload: { componentState: ComponentState.VIEW, userModel: result.userModel } };
          }),
          catchError((effectError) => {
            return of({ type: USER_NEW_ERROR, payload: effectError });
          })
        );
      })
    )
  );

  mainUsersReload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_DELETE_SUCCESS, USER_EDIT_SUCCESS, USER_NEW_SUCCESS),
      mergeMap((action: IQlgyAction) => {
        return this.qlgyService.getUsersData().pipe(
          map((usersModel: IUserModel[]) => {
            return { type: MAIN_USERS_RELOAD, payload: usersModel };
          }),
          catchError((effectError) => {
            return of({ type: MAIN_USERS_RELOAD_ERROR, payload: effectError });
          })
        );
      })
    )
  );

  // resetMainView$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(USER_COMPONENT_STATE),
  //     mergeMap(() => {
  //       const mainComponentState = this.mainComponentState;
  //       return (mainComponentState === ComponentState.EDIT) ? of({ type: MAIN_COMPONENT_STATE_RESET }) : EMPTY
  //     })
  //   )
  // );

  addFeedback$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...FEEDBACK_OF_TYPE_ACTIONS),
      mergeMap((action: IQlgyAction) => {
        return of({ type: FEEDBACK_NEW, payload: action.type })
      })
    )
  );

  // routerNavigated$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ROUTER_NAVIGATED),
  //     mergeMap((action) => {
  //       let type;
  //       let payload;
  //       this.store.pipe(select(newRouteSegmentSelector)).subscribe(state => {
  //         if (state) {
  //           type = MAIN_COMPONENT_NEW_ENTRY_STATE;
  //           payload = ComponentState.EDIT;
  //         } else {
  //           type = MAIN_COMPONENT_STATE_RESET;
  //           payload = ComponentState.VIEW;
  //         }
  //       });
  //       return of({ type, payload })
  //     })
  //   )
  // );

  constructor(
    private actions$: Actions,
    private qlgyService: QlgyService,
    private router: Router,
    private store: Store<{ appState: IApplicationState }>
  ) {

  }
}
