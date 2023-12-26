import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxQuixxSubmitButtonComponent } from './submit-button.component';
import { NgxQuixxIconCircleCheckStubComponent } from '../../tests/stubs';

describe('NgxQuixxSubmitButtonComponent', () => {
  let component: NgxQuixxSubmitButtonComponent;
  let fixture: ComponentFixture<NgxQuixxSubmitButtonComponent>;
  let nativeElement: HTMLElement;
  let buttonElement: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxQuixxIconCircleCheckStubComponent],
      imports: [NgxQuixxSubmitButtonComponent],
    });
    fixture = TestBed.createComponent(NgxQuixxSubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;
    buttonElement = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button should have a certain color class', () => {
    const buttonClasses = buttonElement.classList;
    expect(buttonClasses?.contains(component.color)).toBeTrue();
  });

  it('on button click should emit', () => {
    const spy = spyOn(component['onClick'], 'emit');
    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('button label alignment ngClass test', () => {
    const labelELement = nativeElement.querySelector('.label');
    expect(labelELement?.classList?.contains('align-left')).toBeFalse();
    buttonElement.click();
    fixture.detectChanges();
    expect(labelELement?.classList?.contains('align-left')).toBeTrue();
  });

  it('picture should be empty on start', () => {
    const pictureELement = nativeElement.querySelector('.picture');
    expect(pictureELement?.firstElementChild).toBeFalsy();
  });

  it('picture should be loader after click', () => {
    buttonElement.click();
    fixture.detectChanges();
    expect(nativeElement.querySelector('.quixx-loader-small')).toBeDefined();
    expect(nativeElement.querySelector('ngx-quixx-icon-circle-check')).toBeNull();
  });

  it('picture should be check circle after complete', () => {
    buttonElement.click();
    component.complete = true;
    fixture.detectChanges();
    expect(nativeElement.querySelector('.quixx-loader-small')).toBeNull();
    expect(nativeElement.querySelector('ngx-quixx-icon-circle-check')).toBeDefined();
  });

  it('picture should be null after reset', () => {
    buttonElement.click();
    component.complete = true;
    component.reset = true;
    fixture.detectChanges();
    expect(nativeElement.querySelector('.quixx-loader-small')).toBeNull();
    expect(nativeElement.querySelector('ngx-quixx-icon-circle-check')).toBeNull();
  });

  it('should not emit below before a complete', () => {
    expect(component.loading).toBeFalse();
    buttonElement.click();
    expect(component.loading).toBeTrue();
    const spy = spyOn(component['onClick'], 'emit');
    buttonElement.click();
    expect(spy).not.toHaveBeenCalled();
    component.complete = true;
    expect(component.loading).toBeFalse();
    expect(component.complete).toBeTrue();
    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('reset should set loading and complete to false', () => {
    buttonElement.click();
    expect(component.loading).toBeTrue();
    component.reset = true;
    expect(component.loading).toBeFalse();

    component.complete = true;
    expect(component.complete).toBeTrue();
    component.reset = true;
    expect(component.complete).toBeFalse();
  });

  it('if disabled should not emit', () => {
    const spy = spyOn(component['onClick'], 'emit');
    component.disabled = true;
    buttonElement.click();
    expect(spy).not.toHaveBeenCalled();
  });
});
