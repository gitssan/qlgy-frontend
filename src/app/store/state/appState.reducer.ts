/* istanbul ignore file */

import { ApplicationState, initialState, newEntryUsermodel, ComponentState } from '@app/generic/qlgy.models';
import { APP_RESET, USER_EDIT_SUCCESS, USER_NEW_SUCCESS, USERS_LOAD_SUCCESS, MAIN_USERS_RELOAD, MAIN_COMPONENT_STATE_RESET, MAIN_COMPONENT_NEW_ENTRY_STATE, USER_COMPONENT_STATE, USER_COMPONENT_TRANSIENT_STATE, FEEDBACK_NEW, } from './appState.actions';

export const appStateReducer = (state: ApplicationState = initialState, action: any) => {
  switch (action.type) {
    case USERS_LOAD_SUCCESS:
      return { ...state, usersModel: action.payload };

    case MAIN_USERS_RELOAD:
      return { ...state, componentState: ComponentState.VIEW, usersModel: action.payload };

    case USER_NEW_SUCCESS:
      return { ...state, userFocused: { ...action.payload, componentState: ComponentState.VIEW } };

    case USER_EDIT_SUCCESS:
      return { ...state, userFocused: action.payload };

    case USER_COMPONENT_TRANSIENT_STATE:
      return { ...state, userFocused: { ...action.payload, componentState: ComponentState.EDIT } };

    case USER_COMPONENT_STATE || USER_EDIT_SUCCESS:
      return { ...state, userFocused: { ...action.payload } };

    case FEEDBACK_NEW:
      return { ...state, feedback: [action.payload] } // ...state.feedback, 

    case MAIN_COMPONENT_NEW_ENTRY_STATE:
      return { ...state, componentState: action.payload, userFocused: { userModel: newEntryUsermodel, componentState: ComponentState.EDIT } };

    case MAIN_COMPONENT_STATE_RESET:
      return { ...state, componentState: ComponentState.VIEW };

    case APP_RESET:
      return initialState;

    default:
      return state;
  }
};
