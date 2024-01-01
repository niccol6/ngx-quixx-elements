import { Component } from '@angular/core';
import { NgxQuixxMenuButtonComponent } from 'ngx-quixx-elements';
import { PageTemplateComponent } from '../page-template.component';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [PageTemplateComponent, NgxQuixxMenuButtonComponent],
  templateUrl: './menu-button.component.html',
})
export class MenuButtonComponent {
  api = `import { NgxQuixxMenuButtonComponent } from 'ngx-quixx-elements';`;
  snippet = `
  <ngx-quixx-menu-button (onClick)="onMenuItemClick($event)">
      <div class="quixx-menu-item">Beach</div>
      <div class="quixx-menu-item">City</div>
      <div class="quixx-menu-item">Mountain</div>
  </ngx-quixx-menu-button>
`;
}
