import { Action } from '@ngrx/store';

export interface IUserModel {
  _id: userId;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  createdAt: Date;
  modifiedAt: Date;
  telephoneNumber: string;
  status: UserStatus;
}

export type userId = number | UserModelType;

export enum UserModelType {
  NEW = 'new'
}

export enum UserStatus {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export enum ComponentState {
  NEW = 'new',
  EDIT = 'edit',
  VIEW = 'view',
  DELETE = 'delete',
  TRANSIENT = 'transient'
}

export enum ComponentAction {
  CANCEL = 'cancel'
}

export interface IUserSelected {
  userModel: IUserModel;
  componentState: ComponentState;
}

export interface ApplicationState {
  componentState: ComponentState;
  usersModel: IUserModel[];
  userFocused: IUserSelected;
  feedback: IFeedback[];
}

export interface IQlgyAction extends Action {
  payload: IQlgyPayload;
  type: any;
}

export interface IQlgyPayload {
  userModel: IUserModel;

}

export interface IFeedback {
  meesage: string;
}

export const initialState = {
  componentState: ComponentState.VIEW,
  usersModel: [],
  userFocused: null,
  feedback: []
} as ApplicationState;

export const ROUTE_NEW = '/new';
export const ROUT_VIEW = '/view';

export const newEntryUsermodel: IUserModel = { _id: UserModelType.NEW } as IUserModel;