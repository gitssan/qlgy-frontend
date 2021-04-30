/* istanbul ignore file */

import { IApplicationState, IUserModel, UserStatus, ComponentState, UserModelType } from '@app/generic/qlgy.models';

export const userIndy: IUserModel = {
  _id: 1,
  firstName: 'Indy',
  lastName: 'Cat',
  emailAddress: 'Qlgy36393639@gmail.com',
  telephoneNumber: '+31619610308',
  status: UserStatus.PUBLIC,
} as IUserModel;

export const userLeonie: IUserModel = {
  _id: 3,
  firstName: 'Leonie',
  lastName: 'Cat1',
  emailAddress: 'Qlgy36393639@gmail.com',
  telephoneNumber: '+31619610308',
  status: UserStatus.PRIVATE
} as IUserModel;

export const userIndyPrivate: IUserModel = {
  _id: 2,
  firstName: 'Indy',
  lastName: 'Cat',
  emailAddress: 'Qlgy36393639@gmail.com',
  telephoneNumber: '+31619610308',
  status: UserStatus.PRIVATE,
} as IUserModel;

export const userInvalid: IUserModel = {
  _id: 2,
  firstName: 'Indy',
  lastName: 'Cat4',
  emailAddress: 'Qlgy36393639@',
  telephoneNumber: '+31619610308',
  status: UserStatus.PUBLIC,
} as IUserModel;

export const userNew: IUserModel = {
  _id: UserModelType.NEW,
  firstName: 'Indy',
  lastName: 'Cat',
  emailAddress: 'Qlgy36393639@gmail.com',
  telephoneNumber: '+31619610308',
  status: UserStatus.PUBLIC,
} as IUserModel;


export const nonExistentUserId: IUserModel = {
  firstName: 'Indy',
  lastName: 'Cat3',
  emailAddress: 'Qlgy36393639@gmail.com',
  telephoneNumber: '+31619610308',
  status: UserStatus.PUBLIC,
  _id: 999
} as IUserModel;

export const users: IUserModel[] = [
  {
    firstName: 'Indy',
    lastName: 'Cat3',
    emailAddress: 'Qlgy36393639@gmail.com',
    telephoneNumber: '+31619610308',
    _id: 1,
  },
  {
    firstName: 'Kanzi',
    lastName: 'Cat2',
    emailAddress: 'Qlgy36393639@gmail.com',
    telephoneNumber: '+31619610308',
    _id: 2,
  },
  {
    firstName: 'Leonie',
    lastName: 'Cat1',
    emailAddress: 'Qlgy36393639@gmail.com',
    telephoneNumber: '+31619610308',
    _id: 3,
  },
  {
    firstName: 'Gitssan',
    lastName: 'Falcon',
    emailAddress: 'Qlgy36393639@gmail.com',
    telephoneNumber: '+31619610308',
    _id: 4,
  },
] as IUserModel[];

export const initialState = {
  componentState: ComponentState.VIEW,
  usersModel: users
} as IApplicationState;

export const usersJsonString = '[{"_id": 1, "firstName": "Indy","lastName": "Cat3","emailAddress": "Qlgy36393639@gmail.com","telephoneNumber": "+31619610308"}]';
export const usersJson = [
  {
    "_id": 1,
    "firstName": "Indy",
    "lastName": "Cat3",
    "emailAddress": "Qlgy36393639@gmail.com",
    "telephoneNumber": "+31619610308",
  }] as IUserModel[];