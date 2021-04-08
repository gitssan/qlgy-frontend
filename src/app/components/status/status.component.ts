import { Component, Input, OnInit } from '@angular/core';
import { UserStatus } from '@app/generic/qlgy.models';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  UserStatus = UserStatus;

  @Input() state: UserStatus;

  constructor() {}

  ngOnInit(): void {
    // console.log('state', this.state);
  }
}
