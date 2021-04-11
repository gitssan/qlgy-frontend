import { Component, Input, OnInit } from '@angular/core';
import { ApplicationState, IUserModel, IUserSelected, UserModelType, ComponentState } from '@app/generic/qlgy.models';
import { singleUserSelector } from '@app/store/appstate.selectors';
import { select, Store } from '@ngrx/store';
import { AbstractView } from '@app/generic/qlgy.classes';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends AbstractView implements OnInit {

  @Input() userModel: IUserModel;
  @Input() reversedIndex: number;

  public componentType: string;

  public selected: boolean = false;

  constructor(public store: Store<{ appState: ApplicationState }>, public formBuilder: FormBuilder) {
    super(store, formBuilder);
  }

  ngOnInit(): void {

    if (this.userModel) {
      this.componentState = ComponentState.VIEW;
    } else {
      this.userModel = { _id: UserModelType.NEW } as IUserModel;
      this.componentState = ComponentState.FORM;
    }

    this.store.pipe(select(singleUserSelector, { _id: this.userModel?._id })).subscribe((state: IUserSelected) => {
      if (state) {
        this.componentState = state.componentState;
        this.userModel = state.userModel;
        this.selected = true;
      } else if (this.selected) {
        this.componentState = ComponentState.VIEW;
        this.selected = false;
      }
    });
  }
}
