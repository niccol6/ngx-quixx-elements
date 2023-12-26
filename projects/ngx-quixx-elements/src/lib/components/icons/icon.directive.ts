import { Directive, HostBinding, Input } from '@angular/core';

/** An abstract directive to share common behavior of the icon components */
@Directive()
export abstract class NgxQuixxIconDirective {
  /** Set the icon color through the svg stroke attribute */
  @Input() public color: string = 'none';

  /** Set the icon size */
  @Input() public size: number = 24;

  @HostBinding('style.width') protected get widthPx() {
    return `${this.size}px`;
  }

  @HostBinding('style.height') protected get heightPx() {
    return `${this.size}px`;
  }
}
