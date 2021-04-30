import { Component, OnInit } from '@angular/core';
import { IApplicationState, IFeedback } from '@app/generic/qlgy.models';
import { feedbackSelector } from '@app/store/state/appstate.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  public feedbackMessages$: Observable<IFeedback[]>;

  constructor(public store: Store<{ appState: IApplicationState }>) { 
    this.feedbackMessages$ = this.store.pipe(select(feedbackSelector));
  }

  ngOnInit(): void {

  }
}
