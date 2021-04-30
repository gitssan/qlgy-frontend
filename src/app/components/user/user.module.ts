import { NgModule } from '@angular/core';
import { UserViewComponent } from '../user-view/user-view.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserComponent } from './user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusComponent } from '../status/status.component';
import { CommonModule } from '@angular/common';
import { UserStore } from '@app/generic/user/user.store';

@NgModule({
  declarations: [UserComponent, UserViewComponent, UserFormComponent, StatusComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UserStore],
  exports: [UserComponent]
})
export class UserModule {}