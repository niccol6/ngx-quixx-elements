import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxQuixxIconDirective } from './icon.directive';

/** Icon search from the Tabler icon package: https://tabler-icons.io/ */
@Component({
  selector: 'ngx-quixx-icon-search',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.stroke]="color"
      [attr.width]="size"
      [attr.height]="size"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </svg>
  `,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxIconSearchComponent extends NgxQuixxIconDirective {}
