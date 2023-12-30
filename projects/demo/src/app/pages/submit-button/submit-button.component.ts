import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxQuixxSubmitButtonComponent } from 'ngx-quixx-elements';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [NgxQuixxSubmitButtonComponent, CommonModule],
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
  submitCompleted$ = new BehaviorSubject<boolean>(false);
  submitReset$ = new BehaviorSubject<boolean>(false);
  submitClick() {
    setTimeout(() => (this.submitCompleted$.next(true)), 5000);
    setTimeout(() => (this.submitReset$.next(true)), 10000);
  }
}
