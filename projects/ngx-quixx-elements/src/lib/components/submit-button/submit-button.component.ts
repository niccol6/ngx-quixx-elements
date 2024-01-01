import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQuixxIconCircleCheckComponent } from '../icons/icon-circle-check.component';

/**
 * This component extends the button behavior,
 * adding a loading spinner (triggered on click event) and a check icon.
 */
@Component({
  selector: 'ngx-quixx-submit-button',
  standalone: true,
  imports: [CommonModule, NgxQuixxIconCircleCheckComponent],
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxSubmitButtonComponent {
  /**
   * This property hold the name of a css class, applied to the button.
   * The following values match classes defined in the library: warning, danger, primary, secondary, success.
   */
  @Input() public color: string = 'primary';

  /** Set the button type */
  @Input() public type: 'button' | 'submit' | 'reset' = 'submit';

  /** Set the disabled attribute */
  @Input() public disabled: boolean;

  /** Set the complete state */
  @Input() public set complete(_: unknown) {
    this._loading = false;
    this._complete = true;
  }
  public get complete() {
    return this._complete;
  }
  private _complete: boolean;

  /** Reset the button to initial state */
  @Input() public set reset(_: unknown) {
    this._loading = false;
    this._complete = false;
  }

  /** Event fired on button click */
  @Output() private onClick = new EventEmitter<void>();

  public get loading() {
    return this._loading;
  }
  private _loading = false;

  protected click() {
    if (this.disabled || this._loading) return;
    this.onClick.emit();
    this._loading = true;
  }
}
