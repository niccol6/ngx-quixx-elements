import { Component } from '@angular/core';
import { NgxQuixxMenuButtonComponent } from 'ngx-quixx-elements';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [NgxQuixxMenuButtonComponent],
  templateUrl: './menu-button.component.html',
})
export class MenuButtonComponent {
  api = `import { NgxQuixxMenuButtonComponent } from 'ngx-quixx-elements';`;
  snippet = `
  <ngx-quixx-menu-button>
      <div class="quixx-menu-item">Beach</div>
      <div class="quixx-menu-item">City</div>
      <div class="quixx-menu-item">Mountain</div>
  </ngx-quixx-menu-button>
`;
}
