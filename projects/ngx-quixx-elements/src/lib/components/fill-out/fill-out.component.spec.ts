import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgxQuixxFillOutComponent } from './fill-out.component';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { mockOptionsArray } from '../../tests/mocks';

@Component({
  template:
    '<ngx-quixx-fill-out [formControl]="control" [text]="text" [options]="options"></ngx-quixx-fill-out>',
  standalone: true,
  imports: [NgxQuixxFillOutComponent, ReactiveFormsModule],
})
class FormTestComponent {
  @ViewChild(NgxQuixxFillOutComponent) public controlComponent: NgxQuixxFillOutComponent;
  public control = new FormControl();
  public options = mockOptionsArray;
  public text = ['lorem ipsum'];
}

describe('NgxQuixxFillOutComponent as ControlValueAccessor', () => {
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
    expect(component.controlComponent.value).toBeUndefined();
    component.control.setValue(['1']);
    expect(component.controlComponent.value).toEqual(['1']);
  });

  it('should set options', () => {
    expect(component.controlComponent.options).toEqual(mockOptionsArray);
  });

  it('should set value', fakeAsync(() => {
    component.controlComponent['formArray'].setValue(['1']);
    tick(500);
    expect(component.controlComponent.value).toEqual(['1']);
  }));

  it('setDisableState should disable form array', () => {
    const spyFormArrayDisable = spyOn(
      component.controlComponent['formArray'],
      'disable'
    ).and.callThrough();
    const spyFormArrayEnable = spyOn(
      component.controlComponent['formArray'],
      'enable'
    ).and.callThrough();
    component.controlComponent.setDisabledState(true);
    component.controlComponent.setDisabledState(true);
    component.controlComponent.setDisabledState(false);
    component.controlComponent.setDisabledState(false);
    expect(spyFormArrayDisable).toHaveBeenCalledOnceWith();
    expect(spyFormArrayEnable).toHaveBeenCalledOnceWith();
  });

  it('blur event should call onTouched', () => {
    const spy = spyOn<any>(component.controlComponent, 'onTouched');
    const fieldset = fixture.debugElement.nativeElement.querySelector('fieldset');
    fieldset!.dispatchEvent(new Event('blur'));
    expect(spy).toHaveBeenCalled();
  });
});
