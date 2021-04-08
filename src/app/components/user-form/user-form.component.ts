import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractView } from '@app/generic/qlgy.classes';
import { REGEX_ALPHA_SPACES, STATUS } from '@app/generic/qlgy.constants';
import { ApplicationState, IUserModel, IUserSelected, UserStatus, ViewState } from '@app/generic/qlgy.models';
import { MAIN_VIEW_STATE, USER_EDIT, USER_NEW, USER_VIEW_STATE } from '@app/store/appState.actions';
import { userFocusedSelector } from '@app/store/appstate.selectors';
import { select, Store } from '@ngrx/store';

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
    if (this.userModel) {
      this._userModel = this.userModel;
      this.viewState = ViewState.EDIT;
    } else {
      this.viewState = ViewState.NEW;
    }

    this.createForm();

    this.userForm.get(STATUS).valueChanges.subscribe((status) => {
      if (this.viewState === ViewState.EDIT) {
        const userModel: IUserModel = { ...this._userModel, status };
        this.changeViewState(ViewState.EDIT, userModel);
      }
    })
  }

  public handleForm() {
    if (this.userForm.valid) {
      let type: string;
      let date: {};

      if (this.viewState === ViewState.EDIT) {
        type = USER_EDIT;
        date = { modifiedAt: new Date() };
      } else if (this.viewState === ViewState.NEW) {
        type = USER_NEW;
        date = { createdAt: new Date() };
      }

      const formValues = { ...this._userModel, ...this.userForm.value, ...date } as IUserModel;
      const userModel: IUserModel = formValues as IUserModel;

      this.store.dispatch({ type, payload: { userModel } });
    }
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      firstName: [this._userModel.firstName, [Validators.required, Validators.pattern(REGEX_ALPHA_SPACES)]],
      lastName: [this._userModel.lastName, [Validators.required, Validators.pattern(REGEX_ALPHA_SPACES)]],
      emailAddress: [this._userModel.emailAddress, [Validators.required]], // Validators.pattern(REGEX_EMAIL)
      telephoneNumber: [this._userModel.telephoneNumber, [Validators.required]],
      status: [this._userModel.status, [Validators.required]]
    });
  }

  public cancel() {
    // preferably in template > changeViewState(ViewState.CANCEL)
    if (this.viewState === ViewState.EDIT) {
      this.store.dispatch({ type: USER_VIEW_STATE, payload: ViewState.VIEW });
    } else if (this.viewState === ViewState.NEW) {
      this.store.dispatch({ type: MAIN_VIEW_STATE, payload: ViewState.VIEW });
    }
  }

  public userModelId() {
    return this._userModel._id;
  }
}
