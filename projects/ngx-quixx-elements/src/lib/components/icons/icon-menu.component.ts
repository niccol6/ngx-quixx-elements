import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxQuixxIconDirective } from './icon.directive';

/** Icon menu from the Tabler icon package: https://tabler-icons.io/ */
@Component({
  selector: 'ngx-quixx-icon-menu',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.stroke]="color"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6l16 0" />
      <path d="M4 12l16 0" />
      <path d="M4 18l16 0" />
    </svg>
  `,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxIconMenuComponent extends NgxQuixxIconDirective {}
