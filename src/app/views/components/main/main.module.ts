import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserComponent } from '@app/components/user/user.component';
import { StatusComponent } from '@app/components/status/status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from '@app/components/user-form/user-form.component';
import { UserViewComponent } from '@app/components/user-view/user-view.component';
import { FeedbackComponent } from '@app/components/feedback/feedback.component';
import { HeaderComponent } from '@app/shell/header/header.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [MainComponent, UserComponent, StatusComponent, UserFormComponent, UserViewComponent, FeedbackComponent, HeaderComponent],
})
export class MainModule {}
