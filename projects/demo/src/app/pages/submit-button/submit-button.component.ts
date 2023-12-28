import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxQuixxSubmitButtonComponent } from 'ngx-quixx-elements';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [NgxQuixxSubmitButtonComponent],
  templateUrl: './submit-button.component.html',
})
export class SubmitButtonComponent {
  api = `import { NgxQuixxSubmitButtonComponent } from 'ngx-quixx-elements';`;
  snippet = `
  <ngx-quixx-submit-button
      [complete]="submitCompleted"
      [reset]="submitReset"
      (onClick)="submitClick()"
  >Send</ngx-quixx-submit-button>
`;
  submitCompleted = false;
  submitReset = false;
  submitClick() {
    setTimeout(() => (this.submitCompleted = true), 15000);
    setTimeout(() => (this.submitReset = true), 30000);
  }
}
