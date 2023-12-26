import { ChangeDetectionStrategy, Component, ElementRef, Input, inject } from '@angular/core';

@Component({
  selector: 'ngx-quixx-select-option',
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host {
        display: block;
        padding: var(--element-padding);
      }
      :host:hover {
        cursor: pointer;
        background-color: var(--color-primary-10);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxSelectOptionComponent {
  @Input() public value: string | number;
  public element = inject(ElementRef).nativeElement;
}
