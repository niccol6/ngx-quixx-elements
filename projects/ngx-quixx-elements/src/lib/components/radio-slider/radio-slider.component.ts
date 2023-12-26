import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getUniqueId } from '../../utils/functions';

/**
 * Form control with a radio button behavior.
 */
@Component({
  selector: 'ngx-quixx-radio-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-slider.component.html',
  styleUrls: ['./radio-slider.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NgxQuixxRadioSliderComponent, multi: true },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxRadioSliderComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  /** Set the radio button options */
  @Input({ required: true }) public options: string[];

  @HostBinding('class') class = 'quixx-radio-slider';
  @ViewChildren('radioElement') private radioElements: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChild('selection') private selection: ElementRef<HTMLDivElement>;

  protected set value(v: string) {
    this._value = v;
  }
  public get value() {
    return this._value;
  }
  private _value: string;

  public get disabled() {
    return this._disabled;
  }
  private _disabled: boolean;

  private onChange: (value: string) => void;
  private onTouched: () => void;

  private element: HTMLElement = inject(ElementRef).nativeElement;
  private cdr = inject(ChangeDetectorRef);
  protected name: string;
  protected selectionStyle: { width: string; height: string; left: string };

  public ngOnInit(): void {
    this.name = getUniqueId('select', this.element);
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.cdr.markForCheck(), 1);
  }

  public writeValue(v: string): void {
    this.value = v;
    this.cdr.markForCheck();
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

  protected changed(v: string) {
    this.writeValue(v);
    this.onChange?.(v);
  }

  protected touched() {
    this.onTouched?.();
  }

  protected getSelectionStyle() {
    if (!this.value) return null;
    const i = this.options.indexOf(this.value);
    const radioLabelElement: HTMLElement | null = this.element.querySelector(`#label-${i}`);
    if (!radioLabelElement) return null;
    return {
      width: `${radioLabelElement.offsetWidth}px`,
      height: `${radioLabelElement.offsetHeight}px`,
      left: `${radioLabelElement.offsetLeft}px`,
    };
  }
}
