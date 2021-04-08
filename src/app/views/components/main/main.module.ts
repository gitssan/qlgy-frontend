import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { UserComponent } from '@app/components/user/user.component';
import { StatusComponent } from '@app/components/status/status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from '@app/components/user-form/user-form.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule],
  declarations: [MainComponent, UserComponent, StatusComponent, UserFormComponent],
})
export class MainModule {}
