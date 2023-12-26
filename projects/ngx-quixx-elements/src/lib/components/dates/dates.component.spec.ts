import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgxQuixxDatesComponent } from './dates.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { mockOptions } from '../../tests/mocks';

@Component({
  template:
    '<ngx-quixx-dates [formControl]="control" [dateRange]="dateRange" [events]="events"></ngx-quixx-dates>',
  standalone: true,
  imports: [NgxQuixxDatesComponent, ReactiveFormsModule],
})
class FormTestComponent {
  @ViewChild(NgxQuixxDatesComponent) public controlComponent: NgxQuixxDatesComponent;
  public control = new FormControl();
  public events = mockOptions;
  public dateRange = [200, 300];
}

describe('NgxQuixxDatesComponent as ControlValueAccessor', () => {
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
    component.control.setValue(['201', null]);
    expect(component.controlComponent.value).toEqual(['201', null]);
  });

  it('should set value', fakeAsync(() => {
    component.controlComponent['formArray'].setValue([null, '201']);
    tick(500);
    expect(component.controlComponent.value).toEqual([null, '201']);
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
