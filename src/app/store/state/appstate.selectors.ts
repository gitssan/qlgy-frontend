/* istanbul ignore file */

import { IApplicationState, userId } from '@app/generic/qlgy.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getAppState = createFeatureSelector<IApplicationState>('appState');

export const usersLengthSelector = createSelector(getAppState, (state: IApplicationState) => {
  return state.usersModel.length;
});

export const usersSelector = createSelector(getAppState, (state: IApplicationState) => {
  return state.usersModel;
});

export const singleUserSelector = createSelector(getAppState, (state: IApplicationState, id: userId) => {
  const res = state.usersModel.find((user) => {
    return user._id === id
  }); 
  return res;
});

export const feedbackSelector = createSelector(getAppState, (state: IApplicationState) => {
  return state.feedback;
});
