 /* istanbul ignore file */
 
export const APP_RESET = 'appReset';

export const USERS_LOAD = 'loadUsers';
export const USERS_LOAD_SUCCESS = 'loadUsersSuccess';
export const USERS_LOAD_ERROR = 'loadUsersError';

export const USER_EDIT = 'userEdit';
export const USER_EDIT_SUCCESS = 'userEditSuccess';
export const USER_EDIT_ERROR = 'userEditError';

export const USER_NEW = 'userNew';
export const USER_NEW_SUCCESS = 'userNewSuccess';
export const USER_NEW_ERROR = 'userNewError';

export const USER_DELETE = 'userDelete';
export const USER_DELETE_SUCCESS = 'userDeleteSuccess';
export const USER_DELETE_ERROR = 'userDeleteError';

export const USER_COMPONENT_STATE = 'userComponentState';
export const USER_COMPONENT_TRANSIENT_STATE = 'userViewTransientState';

export const MAIN_COMPONENT_NEW_ENTRY_STATE = 'mainComponentNewEntryState';
export const MAIN_COMPONENT_STATE_RESET = 'userComponentStateReset';

export const MAIN_USERS_RELOAD = 'mainUsersReload';
export const MAIN_USERS_RELOAD_ERROR = 'mainUsersReloadError';

export const FEEDBACK_NEW = 'feedbackNew'

export const ROUTER_NAVIGATED_EFFECT = 'routerNavidatedEffect';

export const FEEDBACK_OF_TYPE_ACTIONS = [USERS_LOAD_SUCCESS, USER_EDIT_SUCCESS, USER_NEW_SUCCESS, USER_DELETE_SUCCESS];