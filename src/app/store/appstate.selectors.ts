 /* istanbul ignore file */
 
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState, IUserModel } from '../generic/qlgy.models';

const getAppState = createFeatureSelector<ApplicationState>('appState');

export const appViewStateSelector = createSelector(getAppState, (state: ApplicationState) => {
  return state.viewState;
});

export const usersLengthSelector = createSelector(getAppState, (state: ApplicationState) => {
  return state.usersModel.length;
});

export const usersSelector = createSelector(getAppState, (state: ApplicationState) => {
  return state.usersModel;
});

export const userFocusedSelector = createSelector(getAppState, (state: ApplicationState) => {
  return state.userFocused;
});

// export const userModelSelector = createSelector(getAppState, (state: ApplicationState, props: any) => {
//   const _id: number = props._id;
//   if (_id) {
//     return state.usersModel.find((user: IUserModel) => user._id === _id);
//   }
//   return null;
// });

