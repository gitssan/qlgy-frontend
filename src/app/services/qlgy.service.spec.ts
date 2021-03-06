import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { QlgyService } from './glgy.service';
import { users, userNew, nonExistentUserId, userIndy, usersJsonString, usersJson } from 'src/testing/mockedData/users';
import { USER_NOT_FOUND_FEEDBACK, USER_SUCCESSFULLY_ADDED_FEEDBACK, USER_SUCCESSFULLY_DELETED_FEEDBACK, USER_SUCCESSFULLY_MODIFIED_FEEDBACK } from '@app/generic/qlgy.constants';

describe('QlgyService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: QlgyService;
  let mockLocalStorage: any;
  const usersLength = users.length;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        QlgyService
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(QlgyService);
    service.setUsersData([...users]);

    // var store = {};
    // spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
    //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', key, store[key]);
    //   return store[key] || null;
    // });
    // spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
    //   delete store[key];
    // });
    // spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
    //   return store[key] = <string>value;
    // });
    // spyOn(localStorage, 'clear').and.callFake(() => {
    //   store = {};
    // });

    // localStorage.setItem('usersData', usersJsonString);
  });

  it('should init usersData from localStorage', () => {

    const store = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
      return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = <string>value;
    });

    localStorage.setItem("usersData", usersJsonString);
    service.init();
    expect(service.usersData).toEqual(JSON.parse(usersJsonString));
  });

  it('should not init usersData from localStorage', () => {
    service.usersData = null;
    spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
      return null;
    });

    service.init();
    expect(service.usersData).toEqual(null);
  });

  it('should not hasUserData on load', () => {
    const hasUserDataSpy = spyOn(service, 'hasUsersData').and.returnValue(false);
    const returnResult = service.hasUsersData();
    expect(hasUserDataSpy).toHaveBeenCalled();
    expect(returnResult).toBeFalsy();
  });

  it('should init app with loading users API style', () => {
    service.initUsers().subscribe((data) => {
      expect(data.length).toBe(4);
      expect(data).toEqual(users);
    });
    const reqObject = httpTestingController.expectOne('./assets/data/users.json');
    expect(reqObject.request.method).toBe('GET');
    reqObject.flush(users);
    httpTestingController.verify();
  });

  it('should set and get data', () => {
    const setUsersDataSpy = spyOn(service, 'setUsersData').and.callThrough();
    service.setUsersData(users).subscribe(data => expect(data).toEqual(users));
    expect(setUsersDataSpy).toHaveBeenCalled();
    service.getUsersData().subscribe(data => expect(data).toEqual(users));
  });

  it('should add new user to existing usersData', () => {
    const userNewSpy = spyOn(service, 'userNew').and.callThrough();
    service.userNew(userNew).subscribe(data => {
      expect(data.message).toBe(USER_SUCCESSFULLY_ADDED_FEEDBACK);
      expect(data.userModel._id).toEqual(usersLength);
    });
    expect(userNewSpy).toHaveBeenCalled();
  });

  it('should not edit specific user in usersModel', () => {
    const userEditSpy = spyOn(service, 'userEdit').and.callThrough();
    service.userEdit(nonExistentUserId).subscribe(data => {
      expect(data.message).toBe(USER_NOT_FOUND_FEEDBACK);
    });
    expect(userEditSpy).toHaveBeenCalled();
  });

  it('should edit specific user in usersModel', () => {
    const userEditSpy = spyOn(service, 'userEdit').and.callThrough();
    service.userEdit(userIndy).subscribe(data => {
      expect(data.message).toBe(USER_SUCCESSFULLY_MODIFIED_FEEDBACK);
    });
    expect(userEditSpy).toHaveBeenCalled();
  });

  it('should delete specific user in usersModel', () => {
    const userDeleteSpy = spyOn(service, 'userDelete').and.callThrough();
    service.userDelete(userIndy).subscribe(data => {
      expect(data.message).toBe(USER_SUCCESSFULLY_DELETED_FEEDBACK);
    });
    expect(userDeleteSpy).toHaveBeenCalled();
  });

  it('should hasUserData on load', () => {
    const hasUserDataSpy = spyOn(service, 'hasUsersData').and.callThrough();
    service.hasUsersData()
    expect(hasUserDataSpy).toHaveBeenCalled();
    expect(service.hasUsersData).toBeTruthy();
  });

});

