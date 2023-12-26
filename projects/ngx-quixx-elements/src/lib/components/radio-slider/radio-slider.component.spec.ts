import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQuixxRadioSliderComponent } from './radio-slider.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  template:
    '<ngx-quixx-radio-slider [formControl]="control" [options]="options"></ngx-quixx-radio-slider>',
  standalone: true,
  imports: [NgxQuixxRadioSliderComponent, ReactiveFormsModule],
})
class FormTestComponent {
  @ViewChild(NgxQuixxRadioSliderComponent) public controlComponent: NgxQuixxRadioSliderComponent;
  public control = new FormControl();
  public options = ['Option 1', 'Lorem', 'Ipsum'];
}

describe('RadioSliderComponent as ControlValueAccessor', () => {
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

  it('should set the slider value', () => {
    expect(component.controlComponent.value).toBeNull();
    component.control.setValue('Lorem');
    expect(component.controlComponent.value).toBe('Lorem');
  });

  it('should set disabled state', () => {
    fixture.detectChanges();
    expect(component.controlComponent.disabled).toBeFalsy();
    component.control.disable();
    expect(component.controlComponent.disabled).toBeTruthy();
  });

  it('click on input should set value', () => {
    fixture.debugElement.nativeElement.querySelector('input#option-0').click();
    expect(component.controlComponent.value).toBe('Option 1');
  });

  it('selection style behavior', () => {
    const initialStyle = component.controlComponent['getSelectionStyle']();
    expect(initialStyle).toBeNull();
    fixture.debugElement.nativeElement.querySelector('input#option-0').click();
    const style = component.controlComponent['getSelectionStyle']();
    expect(style).not.toBeNull();
    component.control.setValue('fake');
    const noStyle = component.controlComponent['getSelectionStyle']();
    expect(noStyle).toBeNull();
  });

  it('blur event should call onTouched', () => {
    const spy = spyOn<any>(component.controlComponent, 'onTouched');
    const fieldset = fixture.debugElement.nativeElement.querySelector('fieldset');
    fieldset!.dispatchEvent(new Event('blur'));
    expect(spy).toHaveBeenCalled();
  });
});
