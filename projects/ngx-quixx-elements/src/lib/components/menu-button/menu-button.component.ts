import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQuixxVerticalPopoverDirective } from '../../directives/vertical-popover/vertical-popover.directive';
import { NgxQuixxIconMenuComponent } from '../icons/icon-menu.component';
import { filter, fromEvent, map } from 'rxjs';

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
export class NgxQuixxMenuButtonComponent
  extends NgxQuixxVerticalPopoverDirective
  implements AfterViewInit
{
  /** Change the length of the side of the square button */
  @Input() public size: number = 48;
  /** Set the disabled state */
  @Input() public disabled: boolean;

  @Output() public onClick = new EventEmitter<string>();

  @ViewChild('button') private button: ElementRef<HTMLButtonElement>;
  @ViewChild('dropdownMenu') private menu: TemplateRef<unknown>;

  @HostBinding('class') private class = 'quixx-menu-button';

  protected override getContent(): TemplateRef<unknown> {
    return this.menu;
  }

  protected override getOriginElement(): HTMLElement {
    return this.button.nativeElement;
  }

  public override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.sub.add = fromEvent(document, 'click')
      .pipe(
        map((event: Event) => (event as MouseEvent)?.target as HTMLElement),
        filter((element: HTMLElement) => element?.classList.contains('quixx-menu-item')),
        map((element: HTMLElement) => element.innerText),
      )
      .subscribe((v: string) => {
        this.hidePopover();
        this.onClick.emit(v);
      });
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
