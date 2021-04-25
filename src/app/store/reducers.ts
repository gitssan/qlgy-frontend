import { routerReducer } from "@ngrx/router-store";
import { appStateReducer } from "./state/appState.reducer";

export const reducers = {
    appState: appStateReducer,
    router: routerReducer
};