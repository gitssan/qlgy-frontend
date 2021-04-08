/* istanbul ignore file */

import { ApplicationState, IUserSelected, ViewState } from '@app/generic/qlgy.models';
import { APP_RESET, MAIN_VIEW_STATE, LOAD_USERS_SUCCESS, USER_EDIT_SUCCESS, USER_VIEW_STATE } from './appState.actions';

export const initialState = {
  viewState: ViewState.VIEW,
  usersModel: [],
  userFocused: null
} as ApplicationState;

export const appStateReducer = (state: ApplicationState = initialState, action: any) => {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return { ...state, usersModel: action.payload };

    case USER_EDIT_SUCCESS:
      return { ...state, userSelected: { ...state.userFocused, viewState: ViewState.VIEW } };

    case MAIN_VIEW_STATE:
      return { ...state, viewState: action.payload, userFocused: {} };

    case USER_VIEW_STATE:
      return { ...state, viewState: ViewState.VIEW, userFocused: { ...action.payload, rollbackUserModel: action.payload.userModel } };

    case APP_RESET:
      return initialState;

    default:
      return state;
  }
};
