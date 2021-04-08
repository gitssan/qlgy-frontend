import { Action } from '@ngrx/store';

export interface IUserModel {
  _id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  createdAt: Date;
  modifiedAt: Date;
  telephoneNumber: string;
  status: UserStatus;
}

export enum UserStatus {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export enum ViewState {
  VIEW = 'view',
  EDIT = 'edit',
  NEW = 'new',
  DELETE = 'delete',
  SELECT = 'select',
  CANCEL = 'cancel',
  USER_EDIT = 'user_edit',
  USER_NEW = 'user_new'
}

export interface IUserSelected {
  userModel: IUserModel;
  rollbackUserModel: IUserModel;
  viewState: ViewState;
}

export interface ApplicationState {
  viewState: ViewState;
  usersModel: IUserModel[];
  userFocused: IUserSelected;
}

export interface IQlgyAction extends Action {
  payload: {};
}
