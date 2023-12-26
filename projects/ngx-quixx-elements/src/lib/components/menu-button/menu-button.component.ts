import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQuixxVerticalPopoverDirective } from '../../directives/vertical-popover/vertical-popover.directive';
import { NgxQuixxIconMenuComponent } from '../icons/icon-menu.component';

/**
 * The component displays a menu icon button,
 * and receives by content projection the menu content.
 */
@Component({
  selector: 'ngx-quixx-menu-button',
  standalone: true,
  imports: [CommonModule, NgxQuixxIconMenuComponent],
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxMenuButtonComponent extends NgxQuixxVerticalPopoverDirective {
  /** Change the length of the side of the square button */
  @Input() public size: number = 48;
  /** Set the disabled state */
  @Input() public disabled: boolean;

  @ViewChild('button') private button: ElementRef<HTMLButtonElement>;
  @ViewChild('dropdownMenu') private menu: TemplateRef<unknown>;

  @HostBinding('class') private class = 'quixx-menu-button';

  protected override getContent(): TemplateRef<unknown> {
    return this.menu;
  }

  protected override getOriginElement(): HTMLElement {
    return this.button.nativeElement;
  }

  protected toggle(): void {
    if (this.disabled) return;
    if (this.isOpen) {
      this.hidePopover();
    } else {
      this.showPopover();
    }
  }
}
