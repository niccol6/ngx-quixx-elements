import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxQuixxIconDirective } from './icon.directive';

/** Icon chevron-down from the Tabler icon package: https://tabler-icons.io/ */
@Component({
  selector: 'ngx-quixx-icon-chevron-down',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.stroke]="color"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 9l6 6l6 -6" />
    </svg>
  `,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxIconChevronDownComponent extends NgxQuixxIconDirective {}
