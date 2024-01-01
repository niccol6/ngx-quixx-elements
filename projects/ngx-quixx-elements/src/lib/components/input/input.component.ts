import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxQuixxIconSearchComponent } from '../icons/icon-search.component';
import { NgxQuixxIconEyeComponent } from '../icons/icon-eye.component';
import { NgxQuixxIconEyeOffComponent } from '../icons/icon-eye-off.component';
import { Observable, filter, fromEvent, map, take } from 'rxjs';
import { getUniqueId } from '../../utils/functions';
import { SubBulk } from '../../utils/sub-bulk';

/**
 * Form control that wrap a HTML Input, adding additional behavior: to some input types:
 *  - number: prevent the input of not number chars;
 *  - password: gives the possibility to display and hide the chars inserted;
 *  - search: emit an event with the current input value when enter key is pressed and
 *    when the lens icon button is clicked;
 */
@Component({
  selector: 'ngx-quixx-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxQuixxIconSearchComponent,
    NgxQuixxIconEyeComponent,
    NgxQuixxIconEyeOffComponent,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NgxQuixxInputComponent, multi: true }],
})
export class NgxQuixxInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit
{
  /** Set the input type */
  @Input() public type: 'number' | 'password' | 'search' | 'text' = 'text';

  /** Set the input label */
  @Input() public label: string;

  /** Set the input value max length */
  @Input() public maxLength: string = '100';

  /** Event fired on input type search when enter key is pressed or the search button is clicked */
  @Output() private search = new EventEmitter<string>();

  @ViewChild('input') private input: ElementRef<HTMLInputElement>;

  protected set value(v: string) {
    this._value = v;
  }
  public get value() {
    return this._value;
  }
  private _value: string;

  protected set disabled(v: boolean) {
    this._disabled = v;
  }
  public get disabled(): boolean {
    return this._disabled;
  }
  private _disabled: boolean;

  private onChange: (value: string) => void;
  private onTouched: () => void;

  protected id: string;
  protected showPassword = false;
  private sub = new SubBulk();
  private cdr = inject(ChangeDetectorRef);
  private element: HTMLElement = inject(ElementRef).nativeElement;

  protected get inputElementType() {
    return (this.type == 'password' && this.showPassword) || this.type == 'number'
      ? 'text'
      : this.type;
  }

  public ngOnInit(): void {
    this.id = getUniqueId('input', this.element);
  }

  public ngAfterViewInit(): void {
    const inputElement = this.input.nativeElement;
    const keydownEvent$ = fromEvent(inputElement, 'keydown') as Observable<KeyboardEvent>;
    if (this.type == 'search') {
      this.sub.add = keydownEvent$
        .pipe(filter((e: KeyboardEvent) => e.code === 'Enter'))
        .subscribe(() => this.onSearch());
    }
    if (this.type == 'number') {
      this.sub.add = keydownEvent$
        .pipe(
          filter(
            (e: KeyboardEvent) =>
              !e.code.startsWith('Digit') || (!inputElement.value && e.code == 'Digit0'),
          ),
        )
        .subscribe((e) => e.preventDefault());
    }
    this.sub.add = fromEvent(inputElement, 'input')
      .pipe(map(() => inputElement.value))
      .subscribe((v: string) => {
        this.value = v;
        this.onChange?.(v);
      });
    this.sub.add = fromEvent(inputElement, 'focusout').subscribe(() => this.cdr.markForCheck());
    this.sub.add = fromEvent(inputElement, 'blur')
      .pipe(take(1))
      .subscribe(() => this.onTouched?.());
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public writeValue(v: string): void {
    this.value = v;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected onSearch() {
    this.search.emit(this.input.nativeElement.value);
  }

  protected toggleShowPassword() {
    if (this.disabled) return;
    this.showPassword = !this.showPassword;
  }
}
