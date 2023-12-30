import { Component } from '@angular/core';
import { NgxQuixxMultipleChoiceComponent, NgxQuixxQuestion, NgxQuixxQuestionOption } from 'ngx-quixx-elements';

@Component({
  selector: 'app-multiple-choice',
  standalone: true,
  imports: [NgxQuixxMultipleChoiceComponent],
  templateUrl: './multiple-choice.component.html',
})
export class MultipleChoiceComponent {
  question: NgxQuixxQuestion = {
    id: '0',
    question: 'Select the best flavour:',
    options: [
      {
        key: 1,
        value: 'Lemon',
      },
      {
        key: 2,
        value: 'Strawberry',
      },
      {
        key: 3,
        value: 'Cream',
      },
      {
        key: 4,
        value: 'Chocolate',
      },
    ]
  };
  api = `import { NgxQuixxMultipleChoiceComponent } from 'ngx-quixx-elements';`;
  snippet = `
  <ngx-quixx-multiple-choice
    [question]="question"
  ></ngx-quixx-multiple-choice>
  `;
}
