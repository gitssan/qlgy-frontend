import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FeedbackComponent } from '@app/components/feedback/feedback.component';
import { HeaderComponent } from '@app/shell/header/header.component';
import { UserModule } from '@app/components/user/user.module';

@NgModule({
  imports: [CommonModule, UserModule],
  declarations: [MainComponent, FeedbackComponent, HeaderComponent],
})
export class MainModule {}
