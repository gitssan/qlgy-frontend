import { ComponentState } from '@app/generic/qlgy.models';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userId } from '../../generic/qlgy.models';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const mainComponentStateSelector = createSelector(selectRouter, (state: RouterReducerState) => {
    const split = state.state.url.split('/');
    if (hasRouteSegment(split, ComponentState.NEW)) {
        return ComponentState.FORM;
    } else {
        return ComponentState.VIEW;
    }
});

export const validateNewRouteSegmentSelector = createSelector(selectRouter, (state: RouterReducerState, props: any) => {
    const _id: userId = props.id;
    const split = state.state.url.split('/');
    if (hasRouteSegment(split, ComponentState.NEW) && hasRouteSegment(split, _id)) {
        return true;
    }
    return false;

});

export const validateEditRouteSegmentSelector = createSelector(selectRouter, (state: RouterReducerState, props: any) => {
    const id: userId = props.id;
    const split = state.state.url.split('/');
    if (hasRouteSegment(split, ComponentState.EDIT) && hasRouteSegment(split, id)) {
        return true;
    }
    return false;
});

export const validateIdRouteSegmentSelector = createSelector(selectRouter, (state: RouterReducerState, props: any) => {
    const id: userId = props.id;
    const split = state.state.url.split('/');
    if (hasRouteSegment(split, id)) {
        return true;
    }
    return false;
});

export const routeSegmentSelector = createSelector(selectRouter, (state: RouterReducerState) => {
    const split = state.state.url.split('/');
    if (hasRouteSegment(split, ComponentState.EDIT)) {
        return ComponentState.EDIT;
    } else if (hasRouteSegment(split, ComponentState.NEW)) {
        return ComponentState.NEW;
    }
});

const hasRouteSegment = (state: string[], label: ComponentState | userId) => {
    return !!state.find((key) => key === label.toString());
}