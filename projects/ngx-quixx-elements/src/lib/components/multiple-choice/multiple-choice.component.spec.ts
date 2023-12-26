import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQuixxMultipleChoiceComponent } from './multiple-choice.component';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { mockQuestion } from '../../tests/mocks/question.mock';

@Component({
  template:
    '<ngx-quixx-multiple-choice [formControl]="control" [question]="question"></ngx-quixx-multiple-choice>',
  standalone: true,
  imports: [NgxQuixxMultipleChoiceComponent, ReactiveFormsModule],
})
class FormTestComponent {
  @ViewChild(NgxQuixxMultipleChoiceComponent)
  public controlComponent: NgxQuixxMultipleChoiceComponent;
  public control = new FormControl();
  public question = mockQuestion;
}

describe('NgxQuixxMultipleChoiceComponent as ControlValueAccessor', () => {
  let component: FormTestComponent;
  let fixture: ComponentFixture<FormTestComponent>;
  let radios: HTMLInputElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormTestComponent],
    });
    fixture = TestBed.createComponent(FormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    radios = fixture.debugElement.nativeElement.querySelectorAll('input')!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.controlComponent).toBeTruthy();
    expect(radios.length).toBeTruthy();
  });

  it('should set the input value', () => {
    expect(component.controlComponent.value).toBeNull();
    component.control.setValue(1);
    expect(component.controlComponent.value).toBe(1);
  });

  it('click on option should change value', () => {
    const spy = spyOn<any>(component.controlComponent, 'onChange');
    radios[0].click();
    expect(spy).toHaveBeenCalledWith(+radios[0].value);
  });

  it('blur event should call onTouched', () => {
    const spy = spyOn<any>(component.controlComponent, 'onTouched');
    const fieldset = fixture.debugElement.nativeElement.querySelector('fieldset');
    fieldset!.dispatchEvent(new Event('blur'));
    expect(spy).toHaveBeenCalled();
  });
});
