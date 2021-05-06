import { Injectable } from '@angular/core';
import { IQlgyResponse, IUserModel } from '@app/generic/qlgy.models';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { USER_NOT_FOUND_FEEDBACK, USER_SUCCESSFULLY_ADDED_FEEDBACK, USER_SUCCESSFULLY_DELETED_FEEDBACK, USER_SUCCESSFULLY_MODIFIED_FEEDBACK } from '@app/generic/qlgy.constants';

export const usersDataKey = 'usersData';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class QlgyService {
  private _usersData: IUserModel[];

  constructor(private http: HttpClient) {
    this.init();
  }

  public init() {
    const savedUsersData = localStorage.getItem(usersDataKey);
    if (savedUsersData) {
      this._usersData = JSON.parse(savedUsersData);
    }
  }

  get usersData(): IUserModel[] {
    return this._usersData;
  }

  set usersData(usersData: IUserModel[]) {
    this._usersData = usersData;
  }

  public hasUsersData(): boolean {
    return !!this._usersData;
  }

  public getUsersData(): Observable<IUserModel[]> {
    return of([...this._usersData]);
  }

  public setUsersData(usersData: IUserModel[]): Observable<IUserModel[]> {
    this._usersData = usersData;
    localStorage.setItem(usersDataKey, JSON.stringify(usersData));
    return of([...usersData]);
  }

  /* CRUD */

  public userEdit(userModel: IUserModel): Observable<IQlgyResponse> {
    let message: string = USER_NOT_FOUND_FEEDBACK;

    // this._usersData = this._usersData.map((user) => {
    //   if (user._id === userModel._id) {
    //     message = USER_SUCCESSFULLY_MODIFIED;
    //     return userModel;
    //   } else {
    //     return user;
    //   }
    // });

    const index = this._usersData.findIndex((user: IUserModel) => user._id === userModel._id);
    const copyUsersData: IUserModel[] = [ ...this.usersData ];

    if (index !== -1) {
      copyUsersData[index] = { ...userModel, ...{ modifiedAt: new Date() } };
      message = USER_SUCCESSFULLY_MODIFIED_FEEDBACK;
      this.setUsersData(copyUsersData);
    }
    const usersModel: IUserModel[] = [ ...copyUsersData ];
    return of({ message, usersModel });
  }

  public userNew(userModel: IUserModel): Observable<any> {
    const _userModel = { ...userModel, ...{ createdAt: new Date() } };
    _userModel._id = this._usersData.length;
    this._usersData.unshift(_userModel);
    this.setUsersData(this._usersData);
    return of({ message: USER_SUCCESSFULLY_ADDED_FEEDBACK, userModel: _userModel });
  }

  public userDelete(userModel: IUserModel): Observable<any> {
    let message = USER_NOT_FOUND_FEEDBACK;
    this._usersData = this._usersData.filter((user: IUserModel) => {
      message = USER_SUCCESSFULLY_DELETED_FEEDBACK
      return user._id !== userModel._id;
    });
    this.setUsersData(this._usersData);
    return of({ message, userModel: userModel });
  }

  /* init */

  public initUsers(): Observable<any> {
    const apiURL = `./assets/data/users.json`;
    return this.http.get(apiURL);
  }
}
