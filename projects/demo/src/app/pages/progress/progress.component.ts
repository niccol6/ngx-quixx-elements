import { Component } from '@angular/core';
import { NgxQuixxProgressComponent } from 'ngx-quixx-elements';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NgxQuixxProgressComponent],
  templateUrl: './progress.component.html',
})
export class ProgressComponent {
  api = `import { NgxQuixxProgressComponent } from 'ngx-quixx-elements';`;
  snippet = `
  <ngx-quixx-progress
      [value]="3"
      [scale]="5"
  ></ngx-quixx-progress>
  `;
}
