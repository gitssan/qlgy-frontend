 /* istanbul ignore file */
 
 import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { QlgyService } from '../services/glgy.service';
import {
  LOAD_USERS,
  LOAD_USERS_ERROR,
  LOAD_USERS_SUCCESS,
  USER_DELETE,
  USER_DELETE_ERROR,
  USER_DELETE_SUCCESS,
  USER_EDIT,
  USER_EDIT_ERROR,
  USER_EDIT_SUCCESS,
  USER_NEW,
  USER_NEW_ERROR,
  USER_NEW_SUCCESS,
  USER_VIEW_STATE,
} from './appState.actions';
import { ApplicationState, IQlgyAction, IUserModel, ViewState } from '@app/generic/qlgy.models';

@Injectable()
export class AppStateEffects {
  handleUserSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_USERS),
      mergeMap(() => {
        let returnObersvable: Observable<any>;
        if (this.qlgyService.hasUsersData()) {
          console.log('load from localStorage');
          returnObersvable = this.qlgyService.getUsersData();
        } else {
          console.log('load from JSON');
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
            return { type: LOAD_USERS_SUCCESS, payload };
          }),
          catchError((effectError) => {
            return of({ type: LOAD_USERS_ERROR, effectError });
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
            this.store.dispatch({ type: LOAD_USERS, payload: result });
            this.store.dispatch({ type: USER_VIEW_STATE, payload: { viewState: ViewState.VIEW, userModel: result } });
            return { type: USER_EDIT_SUCCESS, payload: result };
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
            this.store.dispatch({ type: LOAD_USERS, payload: result });
            return { type: USER_DELETE_SUCCESS, payload: result };
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
            this.store.dispatch({ type: LOAD_USERS, payload: result });
            return { type: USER_NEW_SUCCESS, payload: result };
          }),
          catchError((effectError) => {
            return of({ type: USER_NEW_ERROR, payload: effectError });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private qlgyService: QlgyService,
    private store: Store<{ appState: ApplicationState }>
  ) {}
}
