import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxQuixxSelectModule } from 'ngx-quixx-elements';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgxQuixxSelectModule, CommonModule],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  options = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  api = `import { NgxQuixxSelectModule } from 'ngx-quixx-elements';`;
  snippet = `
  <ngx-quixx-select label="Select your continent">
    <ngx-quixx-select-option *ngFor="let option of options">
      {{ option }}
    </ngx-quixx-select-option>
  </ngx-quixx-select>
`;
}
