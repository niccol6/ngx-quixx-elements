import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxQuixxQuestion } from '../../models/question.model';

/**
 * Form control that displays a multiple choice question.
 * Optionally it can display an image.
 */
@Component({
  selector: 'ngx-quixx-multiple-choice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NgxQuixxMultipleChoiceComponent, multi: true },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxMultipleChoiceComponent implements ControlValueAccessor {
  /** The question object to display */
  @Input({ required: true }) public question: NgxQuixxQuestion;

  /** The url of the image to display */
  @Input() public imgUrl: string;

  @HostBinding('class') private class = 'quixx-multiple-choice';

  protected set value(v: number) {
    this._value = v;
  }
  public get value() {
    return this._value;
  }
  private _value: number;

  public get disabled() {
    return this._disabled;
  }
  private _disabled: boolean;

  private onChange: (value: number) => void;
  private onTouched: () => void;

  public writeValue(v: number): void {
    this.value = v;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  protected changed(v: number) {
    this._value = v;
    this.onChange?.(v);
  }

  protected touched() {
    this.onTouched();
  }
}
