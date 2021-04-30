// import { getSelectors, RouterReducerState } from '@ngrx/router-store';
// import { createFeatureSelector } from '@ngrx/store';

// export const selectRouter = createFeatureSelector<RouterReducerState>('router');

// export const {
//   selectCurrentRoute, // select the current route
//   selectFragment, // select the current route fragment
//   selectQueryParams, // select the current route query params
//   selectQueryParam, // factory function to select a query param
//   selectRouteParams, // select the current route params
//   selectRouteParam, // factory function to select a route param
//   selectRouteData, // select the current route data
//   selectUrl, // select the current url
// } = getSelectors(selectRouter);

import { ComponentState, UserModelType } from '@app/generic/qlgy.models';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userId } from '../../generic/qlgy.models';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const getCurrentRouteState = createSelector(selectRouter, (state: RouterReducerState) => {
    return state.state
});

// export const routeHasNew = createSelector(selectRouter, (state: RouterReducerState, props: any) => {
//     const _id: userId = props._id;
//     const split = state.state.url.split('/');
//     return !!(_id === UserModelType.NEW && split.find((key) => key === 'new'));
// });

export const selectRouteSegments = createSelector(selectRouter, (state: RouterReducerState) => {
    const split = state.state.url.split('/');
    return split;
});


export const newRouteSegmentSelector = createSelector(selectRouter, (state: RouterReducerState) => {
    const split = state.state.url.split('/');
    if (hasRouteSegment(split, ComponentState.NEW)) {
        return true;
    }
});

export const validateNewRouteSegmentSelector = createSelector(selectRouter, (state: RouterReducerState, props: any) => {
    const _id: userId = props._id;
    const split = state.state.url.split('/');
    if (_id === UserModelType.NEW && hasRouteSegment(split, ComponentState.NEW) && hasRouteSegment(split, _id)) {
        return true;
    } else if(_id === UserModelType.NEW) {
        return false;
    }
    
});

export const validateEditRouteSegmentSelector = createSelector(selectRouter, (state: RouterReducerState, props: any) => {
    const _id: userId = props._id;
    const split = state.state.url.split('/');
    if (typeof _id === "number" && hasRouteSegment(split, ComponentState.EDIT) && hasRouteSegment(split, _id)) {
        return true;
    } else if(typeof _id === "number") {
        return false;
    }
});

export const routeSegmentSelector = createSelector(selectRouter, (state: RouterReducerState) => {
    const split = state.state.url.split('/');
    if (hasRouteSegment(split, ComponentState.EDIT)) {
        return ComponentState.EDIT;
    } else if (hasRouteSegment(split, ComponentState.NEW) ) {
        return ComponentState.NEW;
    }
});

const hasRouteSegment = (state: string[], label: ComponentState | userId) => {
    return !!state.find((key) => key === label.toString());
}