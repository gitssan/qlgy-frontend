import { Injectable } from "@angular/core";
import { ComponentState, IUserModel, UserStatus } from "@app/generic/qlgy.models";
import { ComponentStore } from "@ngrx/component-store";

export interface IUserState {
    userModel: IUserModel;
    selected: boolean;
    viewState: ComponentState;
}

export const initUserState: IUserState = { userModel: {  } as IUserModel, selected: false, viewState: null };

@Injectable()
export class UserStore extends ComponentStore<IUserState> {

    constructor() {
        console.log('ComponentStore::constructor');
        super(initUserState);
    }

    // tmp(userModel: IUserModel) {
    //     this.patchState({ userModel } as IUserState);
    // }
}