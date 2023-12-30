import { Component } from '@angular/core';
import { NgxQuixxFillOutComponent, NgxQuixxQuestionOption } from 'ngx-quixx-elements';

@Component({
  selector: 'app-fill-out',
  standalone: true,
  imports: [NgxQuixxFillOutComponent],
  templateUrl: './fill-out.component.html',
})
export class FillOutComponent {
  text = [
    'From the day we arrive on the planet',
    'There\'s more to see than can ever be seen',
    'than can ever be done',
  ];
  options: NgxQuixxQuestionOption[][] = [
    [
      {
        key: 1,
        value: 'And blinking, step into the sun',
      },
      {
        key: 2,
        value: 'And crying take the first breath',
      },
    ],
    [
      {
        key: 1,
        value: 'Less to think',
      },
      {
        key: 2,
        value: 'More to do',
      },
    ],
  ];
  api = `import { NgxQuixxFillOutComponent } from 'ngx-quixx-elements';`;
  snippet = `
  <ngx-quixx-fill-out
      title="Fill the missing snippets"
      [text]="text"
      [options]="options"
  ></ngx-quixx-fill-out>
  `;
}
