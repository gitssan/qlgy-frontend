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

type userId = number | UserModelType;

export enum UserModelType {
  NEW = 'new'
}

export enum UserStatus {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export enum ComponentState {
  FORM = 'form',
  VIEW = 'view',
  DELETE = 'delete',
  CANCEL = 'cancel',
  USER_EDIT = 'userEdit',
  USER_NEW = 'userNew',
  TRANSIENT = 'transient',
  ROLLBACK = 'rollback'
}

export interface IUserSelected {
  userModel: IUserModel;
  componentState: ComponentState;
}

export interface ApplicationState {
  componentState: ComponentState;
  usersModel: IUserModel[];
  userFocused: IUserSelected;
}

export interface IQlgyAction extends Action {
  payload: {};
}

export const initialState = {
  componentState: ComponentState.VIEW,
  usersModel: [],
  userFocused: null
} as ApplicationState;

export const newEntryUsermodel: IUserModel = { _id: UserModelType.NEW } as IUserModel;