import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractView } from '@app/generic/qlgy.classes';
import { ApplicationState, IUserModel, ComponentState } from '@app/generic/qlgy.models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends AbstractView {

  ComponentState = ComponentState;

  @Input() reversedIndex: number;
  @Input() userModel: IUserModel;

  constructor(public store: Store<{ appState: ApplicationState }>, public formBuilder: FormBuilder) {
    super(store, formBuilder);
  }
}
