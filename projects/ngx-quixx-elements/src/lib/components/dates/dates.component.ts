import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxQuixxInputComponent } from '../input/input.component';
import { NgxQuixxQuestionOption } from '../../models/question.model';
import { debounceTime } from 'rxjs';
import { SubBulk } from '../../utils/sub-bulk';

/**
 * Form control that displays a series of text/numeric_input pairs,
 * suitable for assigning a date to each event.
 */
@Component({
  selector: 'ngx-quixx-dates',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxQuixxInputComponent],
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NgxQuixxDatesComponent, multi: true }],
})
export class NgxQuixxDatesComponent implements ControlValueAccessor, OnDestroy {
  /** Set the fieldset title */
  @Input() public title: string;

  /** Indicates the validity range of the date */
  @Input({ required: true }) public dateRange: [number, number];

  /** Set the list of events whose date has to be determined */
  @Input({ required: true })
  public set events(v: NgxQuixxQuestionOption[]) {
    this._events = v;
    this.formArray = this.createFormArray(v);
    this.subscribeValueChange();
  }
  public get events() {
    return this._events;
  }
  private _events: NgxQuixxQuestionOption[];

  protected set value(v: (string | null)[]) {
    this._value = v;
  }
  public get value() {
    return this._value;
  }
  private _value: (string | null)[];

  public get disabled() {
    return this._disabled;
  }
  private _disabled: boolean;

  private onChange: (value: (string | null)[]) => void;
  private onTouched: () => void;

  protected formArray: FormArray<FormControl<string | null>>;
  private sub = new SubBulk();

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public writeValue(v: (string | null)[]): void {
    if (!v) return;
    this.formArray.setValue(v);
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
    if (isDisabled && this.formArray.enabled) {
      this.formArray.disable();
    } else if (!isDisabled && this.formArray.disabled) {
      this.formArray.enable();
    }
  }

  protected touched() {
    this.onTouched();
  }

  private createFormArray(events: NgxQuixxQuestionOption[]) {
    const array = new FormArray<FormControl<string | null>>([]);
    events.forEach(() =>
      array.push(
        new FormControl<string>('', [
          Validators.required,
          Validators.min(this.dateRange[0]),
          Validators.max(this.dateRange[1]),
        ])
      )
    );
    return array;
  }

  private subscribeValueChange() {
    this.sub.add = this.formArray.valueChanges.pipe(debounceTime(500)).subscribe((v) => {
      this.value = v as (string | null)[];
      this.onChange?.(v);
    });
  }
}
