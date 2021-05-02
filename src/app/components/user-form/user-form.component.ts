import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractView } from '@app/generic/user/qlgy.user';
import { REGEX_ALPHA_SPACES, STATUS } from '@app/generic/qlgy.constants';
import { IApplicationState, IUserModel, UserModelType, ComponentState } from '@app/generic/qlgy.models';
import { StoreRootState } from '@app/store/router/router.reducer';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { IUserState, UserStore, initUserState } from '@app/generic/user/user.store';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent extends AbstractView implements OnInit {

  @Input()
  userModel: IUserModel;

  @Output()
  statusChanged = new EventEmitter();

  public userForm: FormGroup;

  constructor(public store: Store<{ appState: IApplicationState, routerState: StoreRootState }>, public formBuilder: FormBuilder,  public router: Router, public componentStore: UserStore) {
    super(store, formBuilder, router, componentStore);
  }

  ngOnInit(): void {

    this.init();
    this.createForm();

    this.userForm.get(STATUS).valueChanges.subscribe((status) => {
      const userModel: IUserModel = { ...this.userModel, ...this.userForm.value, status } as IUserModel;;
      this.statusChanged.emit(userModel);
    });
  }

  public handleForm() {
    if (this.userForm.valid) {
      const userModel: IUserModel = { ...this.userModel, ...this.userForm.value } as IUserModel;
      this.componentStateAction(this.routeState, userModel);
    }
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      firstName: [this.userModel.firstName, [Validators.required, Validators.pattern(REGEX_ALPHA_SPACES)]],
      lastName: [this.userModel.lastName, [Validators.required, Validators.pattern(REGEX_ALPHA_SPACES)]],
      emailAddress: [this.userModel.emailAddress, [Validators.required]], // Validators.pattern(REGEX_EMAIL)
      telephoneNumber: [this.userModel.telephoneNumber, [Validators.required]],
      status: [this.userModel.status, [Validators.required]]
    });
  }

  public userModelId() {
    return this.userModel._id;
  }
}
