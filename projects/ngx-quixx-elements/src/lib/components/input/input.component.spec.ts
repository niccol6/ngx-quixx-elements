import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQuixxInputComponent } from './input.component';
import {
  NgxQuixxIconEyeOffStubComponent,
  NgxQuixxIconEyeStubComponent,
  NgxQuixxIconSearchStubComponent,
} from '../../tests/stubs';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: '<ngx-quixx-input [formControl]="control"></ngx-quixx-input>',
  standalone: true,
  imports: [NgxQuixxInputComponent, ReactiveFormsModule],
})
class FormTestComponent {
  @ViewChild(NgxQuixxInputComponent) public controlComponent: NgxQuixxInputComponent;
  public control = new FormControl();
}

describe('NgxQuixxInputComponent as ControlValueAccessor', () => {
  let component: FormTestComponent;
  let fixture: ComponentFixture<FormTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormTestComponent],
    });
    fixture = TestBed.createComponent(FormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.controlComponent).toBeTruthy();
  });

  it('should set the input value', () => {
    expect(component.controlComponent.value).toBeNull();
    component.control.setValue('Lorem');
    expect(component.controlComponent.value).toBe('Lorem');
  });

  it('should set disabled state', () => {
    expect(component.controlComponent.disabled).toBeFalsy();
    component.control.disable();
    expect(component.controlComponent.disabled).toBeTruthy();
  });

  it('should call onTouched on blur', () => {
    fixture.detectChanges();
    const blurEvent = new Event('blur');
    const spy = spyOn<any>(component.controlComponent, 'onTouched');
    component.controlComponent['input'].nativeElement.dispatchEvent(blurEvent);
    expect(spy).toHaveBeenCalled();
  });
});

describe('NgxQuixxInputComponent', () => {
  let component: NgxQuixxInputComponent;
  let fixture: ComponentFixture<NgxQuixxInputComponent>;
  let element: HTMLElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NgxQuixxIconSearchStubComponent,
        NgxQuixxIconEyeStubComponent,
        NgxQuixxIconEyeOffStubComponent,
      ],
      imports: [NgxQuixxInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxQuixxInputComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    input = element.querySelector('input')!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getUniqueId test value', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(input!.id).toBe(
      `input-${Math.floor(element.offsetLeft)}-${Math.floor(element.offsetTop)}`
    );
  });

  it('label element should exist if input property exist', () => {
    expect(element.querySelector('label')).toBeNull();
    component.label = 'Lorem ipsum';
    fixture.detectChanges();
    const labelElement = element.querySelector('label');
    expect(labelElement).not.toBeNull();
    expect(labelElement!.textContent).toContain('Lorem ipsum');
  });

  it('label element should have the same id of input', () => {
    component.label = 'Lorem ipsum';
    component.ngOnInit();
    fixture.detectChanges();
    const labelElement = element.querySelector('label');
    expect(labelElement!.htmlFor).toBe(input!.id);
  });

  it('should not render button on type text or number', () => {
    component.type = 'text';
    fixture.detectChanges();
    expect(element.querySelector('button')).toBeNull();
    component.type = 'number';
    fixture.detectChanges();
    expect(element.querySelector('button')).toBeNull();
  });

  it('should render search icon button on type search', () => {
    component.type = 'search';
    fixture.detectChanges();
    const button = element.querySelector('button');
    expect(button).not.toBeNull();
    expect(button!.firstElementChild?.tagName.toLowerCase()).toBe('ngx-quixx-icon-search');
  });

  it('should render different icon button on type password 1', () => {
    component.type = 'password';
    fixture.detectChanges();
    const button = element.querySelector('button');
    expect(button).not.toBeNull();
    expect(button!.firstElementChild?.tagName.toLowerCase()).toBe('ngx-quixx-icon-eye');
  });

  it('should render different icon button on type password 2', () => {
    component.type = 'password';
    component['toggleShowPassword']();
    fixture.detectChanges();
    const button = element.querySelector('button');
    expect(button).not.toBeNull();
    expect(button!.firstElementChild?.tagName.toLowerCase()).toBe('ngx-quixx-icon-eye-off');
  });

  it('inputElementType should set the correct input type: search', () => {
    expect(input!.type).toBe('text');
    component.type = 'search';
    fixture.detectChanges();
    expect(input!.type).toBe('search');
  });

  it('inputElementType should set the correct input type: number', () => {
    expect(input!.type).toBe('text');
    component.type = 'number';
    fixture.detectChanges();
    expect(input!.type).toBe('text');
  });

  it('inputElementType should set the correct input type: password 1', () => {
    expect(input!.type).toBe('text');
    component.type = 'password';
    fixture.detectChanges();
    expect(input!.type).toBe('password');
  });

  it('inputElementType should set the correct input type: password 2', () => {
    expect(input!.type).toBe('text');
    component.type = 'password';
    component['toggleShowPassword']();
    fixture.detectChanges();
    expect(input!.type).toBe('text');
  });

  it('input text should call methods', () => {
    fixture.detectChanges();
    component.ngAfterViewInit();
    input!.value = 'ghbj';
    input!.dispatchEvent(new Event('input'));
    expect(component.value).toBe('ghbj');
  });

  it('input type not search should not emit search', () => {
    const spy = spyOn(component['search'], 'emit');
    component.type = 'password';
    fixture.detectChanges();
    const button = element.querySelector('button');
    expect(button).not.toBeNull();
    component.setDisabledState(true);
    button!.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('input disabled should not toggle password', () => {
    expect(input!.type).toBe('text');
    component.type = 'password';
    component.setDisabledState(true);
    component['toggleShowPassword']();
    fixture.detectChanges();
    expect(input!.type).toBe('password');
  });

  it('input type search on enter', () => {
    const spy = spyOn(component['search'], 'emit');
    component.type = 'search';
    fixture.detectChanges();
    const keyDownEvent = new KeyboardEvent('keydown', { code: 'Enter' });
    component['input'].nativeElement.dispatchEvent(keyDownEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('input type number keydown listener', () => {
    component.type = 'number';
    fixture.detectChanges();
    const keyDownEvent1 = new KeyboardEvent('keydown', { code: 'Digit0' });
    const spy1 = spyOn(keyDownEvent1, 'preventDefault');
    const keyDownEvent2 = new KeyboardEvent('keydown', { code: 'Digit1' });
    const spy2 = spyOn(keyDownEvent2, 'preventDefault');
    const keyDownEvent3 = new KeyboardEvent('keydown', { code: 'KeyA' });
    const spy3 = spyOn(keyDownEvent3, 'preventDefault');
    component['input'].nativeElement.value = '';
    component['input'].nativeElement.dispatchEvent(keyDownEvent1);
    component['input'].nativeElement.dispatchEvent(keyDownEvent2);
    component['input'].nativeElement.dispatchEvent(keyDownEvent3);
    expect(spy1).withContext('should prevent 0 as first input').toHaveBeenCalled();
    expect(spy2).withContext('should accept any digit as input').not.toHaveBeenCalled();
    expect(spy3).withContext('should prevent any other key as input').toHaveBeenCalled();
  });

  it('should markForCheck on focusout', () => {
    fixture.detectChanges();
    const focusOutEvent = new Event('focusout');
    const spy = spyOn(component['cdr'], 'markForCheck');
    component['input'].nativeElement.dispatchEvent(focusOutEvent);
    expect(spy).toHaveBeenCalled();
  });
});
