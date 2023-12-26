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
import { NgxQuixxSelectModule } from '../select/select.module';
import { NgxQuixxQuestionOption } from '../../models/question.model';
import { debounceTime } from 'rxjs';
import { SubBulk } from '../../utils/sub-bulk';

/**
 * Form control that display a text whit gaps.
 * The gaps have to be filled out selecting the correct option.
 */
@Component({
  selector: 'ngx-quixx-fill-out',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxQuixxSelectModule],
  templateUrl: './fill-out.component.html',
  styleUrls: ['./fill-out.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NgxQuixxFillOutComponent, multi: true }],
})
export class NgxQuixxFillOutComponent implements ControlValueAccessor, OnDestroy {
  /** Set the fieldset title */
  @Input() public title: string;
  /** Set the text sections */
  @Input({ required: true }) public text: string[];
  /** Set the options groups, each group corresponds to a gap */
  @Input({ required: true }) public set options(v: NgxQuixxQuestionOption[][]) {
    this._options = v;
    this.formArray = this.createFormArray(v);
    this.subscribeValueChange();
  }
  public get options(): NgxQuixxQuestionOption[][] {
    return this._options;
  }
  private _options: NgxQuixxQuestionOption[][];

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

  protected formArray: FormArray<FormControl<string | null>>;
  private sub = new SubBulk();

  private onChange: (value: (string | null)[]) => void;
  private onTouched: () => void;

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

  private createFormArray(options: NgxQuixxQuestionOption[][]) {
    const array = new FormArray<FormControl<string | null>>([]);
    options.forEach(() => array.push(new FormControl<string>('', Validators.required)));
    return array;
  }

  private subscribeValueChange() {
    this.sub.add = this.formArray.valueChanges.pipe(debounceTime(500)).subscribe((v) => {
      this.value = v as (string | null)[];
      this.onChange?.(v);
    });
  }
}
