import { Injectable } from '@angular/core';
import { IUserModel } from '@app/generic/qlgy.models';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { USER_NOT_FOUND_FEEDBACK, USER_SUCCESSFULLY_ADDED_FEEDBACK, USER_SUCCESSFULLY_DELETED_FEEDBACK, USER_SUCCESSFULLY_MODIFIED_FEEDBACK } from '@app/generic/qlgy.constants';

const usersDataKey = 'userData';

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
    const savedUsersData = localStorage.getItem(usersDataKey);
    if (savedUsersData) {
      this._usersData = JSON.parse(savedUsersData);
    }
  }

  public hasUsersData(): boolean {
    return !!this._usersData;
  }

  public getUsersData(): Observable<IUserModel[]> {
    return of([...this._usersData]);
  }

  public setUsersData(usersData: IUserModel[]): Observable<IUserModel[]> {
    this._usersData = usersData;
    const storage = localStorage;
    storage.setItem(usersDataKey, JSON.stringify(usersData));
    return of([...usersData]);
  }

  /* CRUD */

  public userEdit(userModel: IUserModel): Observable<any> {
    let message = USER_NOT_FOUND_FEEDBACK;

    // this._usersData = this._usersData.map((user) => {
    //   if (user._id === userModel._id) {
    //     message = USER_SUCCESSFULLY_MODIFIED;
    //     return userModel;
    //   } else {
    //     return user;
    //   }
    // });

    const index = this._usersData.findIndex((user:IUserModel)=> user._id === userModel._id);

    if(index !== -1) {
      this._usersData[index] = userModel;
      message = USER_SUCCESSFULLY_MODIFIED_FEEDBACK;
      this.setUsersData(this._usersData);
    } 
    
    return of({ message , userModel });
  }

  public userNew(userModel: IUserModel): Observable<any> {
    const _userModel = { ...userModel };
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
