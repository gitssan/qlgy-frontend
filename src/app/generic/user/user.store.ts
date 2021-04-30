import { Injectable } from "@angular/core";
import { ComponentState, IUserModel } from "@app/generic/qlgy.models";
import { ComponentStore } from "@ngrx/component-store";

export interface IUserState {
    userModel: IUserModel;
    selected: boolean;
    viewState: ComponentState;
}

export const ininitValue: IUserState = { userModel: {} as IUserModel, selected: false, viewState: null };

@Injectable()
export class UserStore extends ComponentStore<IUserState> {

    constructor() {
        console.log('ComponentStore::constructor');
        super(ininitValue);


        
    }

    tmp() {
        console.log('tmp');
        const user = this.select((state) => {
            console.log('user', state);
          });
    }
}