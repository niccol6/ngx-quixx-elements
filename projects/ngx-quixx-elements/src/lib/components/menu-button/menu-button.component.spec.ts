import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQuixxMenuButtonComponent } from './menu-button.component';

describe('NgxQuixxMenuButtonComponent', () => {
  let component: NgxQuixxMenuButtonComponent;
  let fixture: ComponentFixture<NgxQuixxMenuButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxQuixxMenuButtonComponent],
    });
    fixture = TestBed.createComponent(NgxQuixxMenuButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.nativeElement.querySelector('button')!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(buttonElement).withContext('button is rendered').toBeTruthy();
    const content = component['getContent']();
    expect(content).withContext('menu is defined').toBeDefined();
  });

  it('should display dropdown', () => {
    buttonElement.click();
    expect(component['overlayRef']).toBeTruthy();
  });

  it('should not display dropdown if disabled', () => {
    component.disabled = true;
    buttonElement.click();
    expect(component['overlayRef']).toBeFalsy();
  });

  it('should call hidePopover', () => {
    const spyHide = spyOn<any>(component, 'hidePopover');
    buttonElement.click();
    buttonElement.click();
    expect(spyHide).toHaveBeenCalled();
  });
});
