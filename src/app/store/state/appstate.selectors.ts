/* istanbul ignore file */

import { ApplicationState } from '@app/generic/qlgy.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getAppState = createFeatureSelector<ApplicationState>('appState');

export const mainComponentStateSelector = createSelector(getAppState, (state: ApplicationState) => {
  return state.componentState;
});

export const usersLengthSelector = createSelector(getAppState, (state: ApplicationState) => {
  return state.usersModel.length;
});

export const usersSelector = createSelector(getAppState, (state: ApplicationState) => {
  return state.usersModel;
});

export const singleUserSelector = createSelector(getAppState, (state: ApplicationState, props: any) => {
  const _id: number = props._id;
  if (state.userFocused?.userModel._id === _id) {
    return state.userFocused;
  }
});

export const feedbackSelector = createSelector(getAppState, (state: ApplicationState) => {
  return state.feedback;
});
