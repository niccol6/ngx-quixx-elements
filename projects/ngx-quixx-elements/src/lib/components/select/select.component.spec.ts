import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQuixxSelectComponent } from './select.component';
import { NgxQuixxSelectModule } from './select.module';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgxQuixxIconChevronDownStubComponent } from '../../tests/stubs';

@Component({
  template: `
    <ngx-quixx-select [formControl]="control">
      @for (option of options; track option) {
      <ngx-quixx-select-option [value]="option.value">{{ option.label }}</ngx-quixx-select-option>
      }
    </ngx-quixx-select>
  `,
  standalone: true,
  imports: [NgxQuixxSelectModule, ReactiveFormsModule],
})
class FormTestComponent {
  @ViewChild(NgxQuixxSelectComponent) public controlComponent: NgxQuixxSelectComponent;
  public control = new FormControl();
  public options = [
    { value: 'Lorem', label: 'Lorem' },
    { value: null, label: 'Ipsum' },
  ];
}

describe('NgxQuixxSelectComponent as ControlValueAccessor', () => {
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
    const optionElements = component.controlComponent['options'];
    expect(optionElements).toBeDefined();
    const values = optionElements.map((o) => o.value) as string[];
    const optionValues = component.options.map((o) => o.value) as string[];
    expect(values).toEqual(optionValues);
  });

  it('control should set the selected value', () => {
    expect(component.controlComponent.value).toBeNull();
    component.control.setValue(1);
    expect(component.controlComponent.value).toBe(1);
  });

  it('click should set the selected value', () => {
    expect(component.control.value).toBeNull();
    component.controlComponent['toggle']();
    const option1 = component.controlComponent['options'].get(0);
    option1!.element.dispatchEvent(new Event('click'));
    expect(component.control.value).toBe(option1!.value);
    const option2 = component.controlComponent['options'].get(1);
    option2!.element.dispatchEvent(new Event('click'));
    expect(component.control.value).toBe(option2!.element.innerText);
  });

  it('should update decription map', () => {
    const newOption = { value: 'hjk1', label: 'new' };
    component.options.push(newOption);
    fixture.detectChanges();
    const descriptionMap = component.controlComponent['descriptionMap']?.();
    expect(Object.keys(descriptionMap!)).toContain(newOption.value);
  });
});

describe('NgxQuixxSelectComponent', () => {
  let component: NgxQuixxSelectComponent;
  let fixture: ComponentFixture<NgxQuixxSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxQuixxSelectComponent, NgxQuixxIconChevronDownStubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxQuixxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call hidePopover', () => {
    const spyShow = spyOn<any>(component, 'showPopover').and.callThrough();
    const spyHide = spyOn<any>(component, 'hidePopover');
    component['toggle']();
    expect(spyShow).toHaveBeenCalled();
    component['toggle']();
    expect(spyHide).toHaveBeenCalled();
  });

  it('toggle on disabled state should not call any method', () => {
    component.setDisabledState(true);
    const spyHide = spyOn<any>(component, 'hidePopover');
    const spyShow = spyOn<any>(component, 'showPopover');
    component['toggle']();
    expect(spyHide).not.toHaveBeenCalled();
    expect(spyShow).not.toHaveBeenCalled();
  });

  it('loading should call hide popover', () => {
    const spyHide = spyOn<any>(component, 'hidePopover');
    component.loading = true;
    expect(spyHide).toHaveBeenCalled();
  });
});
