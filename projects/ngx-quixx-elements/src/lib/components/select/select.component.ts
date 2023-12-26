import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, fromEvent, map, merge, startWith, switchMap, tap } from 'rxjs';
import { NgxQuixxSelectOptionComponent } from './select-option.component';
import { getUniqueId } from '../../utils/functions';
import { NgxQuixxVerticalPopoverDirective } from '../../directives/vertical-popover/vertical-popover.directive';

/**
 * Form control with a select behavior, whose options are defined through content projection
 * using NgxQuixxSelectOptionComponent;
 */
@Component({
  selector: 'ngx-quixx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NgxQuixxSelectComponent, multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxSelectComponent
  extends NgxQuixxVerticalPopoverDirective
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy
{
  /** Set a label for the component */
  @Input() public label: string;

  /** Define the display property of the component. If true it is flex-inline, otherwise flex */
  @Input() public inline: boolean;

  /** Control the loading spinner inside the component */
  @Input() public set loading(v: boolean) {
    this._loading = v;
    if (v) this.hidePopover();
  }
  public get loading() {
    return this._loading;
  }
  private _loading: boolean;

  @ViewChild('select') private select: ElementRef<HTMLDivElement>;
  @ViewChild('dropdownMenu') private menu: TemplateRef<unknown>;

  @ContentChildren(NgxQuixxSelectOptionComponent, { descendants: true })
  private options: QueryList<NgxQuixxSelectOptionComponent>;

  protected set value(v: number | string) {
    this._value = v;
    this.cdr.markForCheck();
  }
  public get value(): string | number {
    return this._value;
  }
  private _value: number | string;

  protected set disabled(v: boolean) {
    this._disabled = v;
    if (v) this.hidePopover();
  }
  protected get disabled(): boolean {
    return this._disabled;
  }
  private _disabled: boolean;

  private onChange: (value: number | string) => void;
  private onTouched: () => void;

  protected id: string;
  protected descriptionMap: WritableSignal<Record<string | number, string>> | undefined;

  public ngOnInit(): void {
    this.id = getUniqueId('select', this.element);
  }

  public override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    this.sub.add = this.options.changes
      .pipe(
        startWith(this.options),
        tap((options: QueryList<NgxQuixxSelectOptionComponent>) =>
          this.updateDescriptionMap(options)
        ),
        switchMap((options) => this.getOptionsClickListener(options)),
        tap(() => this.hidePopover())
      )
      .subscribe((v: string | number) => {
        this.value = v;
        this.onChange?.(v);
      });
  }

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
    this.disabled = isDisabled;
  }

  protected getContent() {
    return this.menu;
  }

  protected getOriginElement() {
    return this.select.nativeElement;
  }

  protected toggle(): void {
    if (this.disabled || this.loading) return;
    if (this.isOpen) {
      this.hidePopover();
    } else {
      this.showPopover();
    }
  }

  protected override hidePopover() {
    this.onTouched?.();
    super.hidePopover();
  }

  private updateDescriptionMap(options: QueryList<NgxQuixxSelectOptionComponent>): void {
    const map: Record<string | number, string> = {};
    options.forEach((o) => {
      if (o.value) {
        map[o.value] = o.element.innerText;
      }
    });
    if (this.descriptionMap) {
      this.descriptionMap.set(map);
    } else {
      this.descriptionMap = signal(map);
    }
    setTimeout(() => this.cdr.markForCheck());
  }

  private getOptionsClickListener(
    options: QueryList<NgxQuixxSelectOptionComponent>
  ): Observable<string> {
    return merge(
      ...options.map((option) =>
        fromEvent(option.element, 'click').pipe(map(() => option.value || option.element.innerText))
      )
    );
  }
}
