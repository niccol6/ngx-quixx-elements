import { Component } from '@angular/core';
import { NgxQuixxDatesComponent, NgxQuixxQuestionOption } from 'ngx-quixx-elements';

@Component({
  selector: 'app-dates',
  standalone: true,
  imports: [NgxQuixxDatesComponent],
  templateUrl: './dates.component.html',
})
export class DatesComponent {
  events: NgxQuixxQuestionOption[] = [
    {
      key: 1,
      value: 'The conquest',
    },
    {
      key: 2,
      value: 'The uprising',
    },
  ];
  api = `import { NgxQuixxDatesComponent } from 'ngx-quixx-elements';`;
  snippet = `
  <ngx-quixx-dates
      title="Insert the dates"
      [dateRange]="[1000, 1500]"
      [events]="events"
  ></ngx-quixx-dates>
  `;
}
