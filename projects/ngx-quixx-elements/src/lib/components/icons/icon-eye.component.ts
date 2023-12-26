import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxQuixxIconDirective } from './icon.directive';

/** Icon eye from the Tabler icon package: https://tabler-icons.io/ */
@Component({
  selector: 'ngx-quixx-icon-eye',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.stroke]="color"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </svg>
  `,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxIconEyeComponent extends NgxQuixxIconDirective {}
