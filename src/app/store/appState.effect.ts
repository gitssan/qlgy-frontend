/* istanbul ignore file */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { QlgyService } from '../services/glgy.service';
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
  MAIN_COMPONENT_STATE_RESET,
  USER_COMPONENT_STATE
} from './appState.actions';
import { ApplicationState, IQlgyAction, IUserModel, ComponentState } from '@app/generic/qlgy.models';
import { mainComponentStateSelector } from './appstate.selectors';

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
        return this.qlgyService.userEdit(action.payload['userModel']).pipe(
          map((result) => {
            return { type: USER_EDIT_SUCCESS, payload: { componentState: ComponentState.VIEW, userModel: result.userModel } };
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
        return this.qlgyService.userDelete(action.payload['userModel']).pipe(
          map((result) => {
            return { type: USER_DELETE_SUCCESS, payload: { userModel: result.userModel }};
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
        return this.qlgyService.userNew(action.payload['userModel']).pipe(
          map((result) => {
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
      ofType(USER_DELETE_SUCCESS, USER_NEW_SUCCESS),
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

  resetMainView$ = createEffect(() =>
  this.actions$.pipe(
    ofType(USER_COMPONENT_STATE),
    mergeMap(() => {
      const mainComponentState = this.mainComponentState;
      return (mainComponentState === ComponentState.FORM) ? of({ type: MAIN_COMPONENT_STATE_RESET }) : EMPTY
    })
  )
);
  
  private mainComponentState: ComponentState;

  constructor(
    private actions$: Actions,
    private qlgyService: QlgyService,
    private store: Store<{ appState: ApplicationState }>
  ) {
    this.store.pipe(select(mainComponentStateSelector)).subscribe((state) => this.mainComponentState = state);
  }
}
