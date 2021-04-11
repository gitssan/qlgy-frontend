import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractView } from '@app/generic/qlgy.classes';
import { REGEX_ALPHA_SPACES, STATUS } from '@app/generic/qlgy.constants';
import { ApplicationState, IUserModel, UserModelType, ComponentState } from '@app/generic/qlgy.models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent extends AbstractView implements OnInit {

  @Input()
  userModel: IUserModel;

  public userForm: FormGroup;

  constructor(public store: Store<{ appState: ApplicationState }>, public formBuilder: FormBuilder) {
    super(store, formBuilder);
  }

  ngOnInit(): void {

    if (this.userModel._id === UserModelType.NEW) {
      this.componentState = ComponentState.USER_NEW;
    } else {
      this.componentState = ComponentState.USER_EDIT;
      this.userModelRollback = { ...this.userModel };
    }

    this.createForm();

    this.userForm.get(STATUS).valueChanges.subscribe((status) => {
      const userModel: IUserModel = { ...this.userModel, ...this.userForm.value, status } as IUserModel;
      this.changeComponentState(ComponentState.TRANSIENT, userModel );
    })
  }

  public handleForm() {
    if (this.userForm.valid) {
      const userModel: IUserModel = { ...this.userModel, ...this.userForm.value } as IUserModel;
      this.changeComponentState(this.componentState, userModel);
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
