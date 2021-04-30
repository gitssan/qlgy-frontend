/* istanbul ignore file */

import { IApplicationState, initialState, ComponentState } from '@app/generic/qlgy.models';
import { APP_RESET, USER_EDIT_SUCCESS, USERS_LOAD_SUCCESS, MAIN_USERS_RELOAD, MAIN_COMPONENT_STATE_RESET, MAIN_COMPONENT_NEW_ENTRY_STATE, FEEDBACK_NEW, } from './appState.actions';

export const appStateReducer = (state: IApplicationState = initialState, action: any) => {
  switch (action.type) {
    case USERS_LOAD_SUCCESS:
      return { ...state, usersModel: action.payload };

    case MAIN_USERS_RELOAD:
      return { ...state, usersModel: action.payload };

    case FEEDBACK_NEW:
      return { ...state, feedback: [action.payload] }

    case MAIN_COMPONENT_NEW_ENTRY_STATE:
      return { ...state, componentState: action.payload };

    // case MAIN_COMPONENT_STATE_RESET:
    //   return { ...state, componentState: ComponentState.VIEW };

    case APP_RESET:
      return initialState;

    default:
      return state;
  }
};
