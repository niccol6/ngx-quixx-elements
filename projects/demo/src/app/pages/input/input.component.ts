import { Component } from '@angular/core';
import { NgxQuixxInputComponent } from 'ngx-quixx-elements';
import { PageTemplateComponent } from '../page-template.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [PageTemplateComponent, NgxQuixxInputComponent],
  templateUrl: './input.component.html',
})
export class InputComponent {
  api = `import { NgxQuixxInputComponent } from 'ngx-quixx-elements';`;
  snippet = `
  <ngx-quixx-input
      type="search"
      (search)="onSearch($event)"
  ></ngx-quixx-input>
`;

  onSearch(e: string) {
    alert(e);
  }
}
