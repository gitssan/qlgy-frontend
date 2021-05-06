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
  NEW = 'new',
  VIEW = 'view'
}

export enum UserStatus {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export enum ComponentState {
  NEW = 'new',
  EDIT = 'edit',
  FORM = 'form',
  VIEW = 'view',
  DELETE = 'delete',
  TRANSIENT = 'transient',
  NULL = 'null'
}

export enum ComponentAction {
  CANCEL = 'cancel'
}

export interface IApplicationState {
  componentState: ComponentState;
  usersModel: IUserModel[];
  feedback: IFeedback[];
}

export interface IQlgyAction extends Action {
  payload: IQlgyPayload;
  type: any;
}

export interface IQlgyPayload {
  userModel: IUserModel;

}

export interface IQlgyResponse {
  message: string;
  usersModel: IUserModel[];
}

export interface IFeedback {
  meesage: string;
}

export const initialState = {
  componentState: ComponentState.VIEW,
  usersModel: [],
  feedback: []
} as IApplicationState;

export const ROUTE_NEW = '/new';
export const ROUTE_VIEW = '/view';

export const newEntryUsermodel: IUserModel = { _id: UserModelType.NEW } as IUserModel;