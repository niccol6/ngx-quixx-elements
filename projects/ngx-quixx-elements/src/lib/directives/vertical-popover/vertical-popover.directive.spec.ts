import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxQuixxVerticalPopoverDirective } from './vertical-popover.directive';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

@Component({
  template: `
    <div #origin></div>
    <ng-template #popover><div></div></ng-template>
  `,
  standalone: true,
})
class TestComponent extends NgxQuixxVerticalPopoverDirective {
  @ViewChild('origin') private origin: ElementRef<HTMLElement>;
  @ViewChild('popover') private popover: TemplateRef<unknown>;
  protected override getContent(): TemplateRef<unknown> {
    return this.popover;
  }
  protected override getOriginElement(): HTMLElement {
    return this.origin.nativeElement;
  }
}

describe('NgxQuixxVerticalPopoverDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide popover on resize', () => {
    component['showPopover']();
    expect(component['overlayRef']).toBeDefined();
    window.dispatchEvent(new Event('resize'));
    expect(component['overlayRef']).toBeUndefined();
  });

  it('should hide popover on outside pointer events', () => {
    component['showPopover']();
    expect(component['overlayRef']).toBeDefined();
    component['overlayRef']?._outsidePointerEvents.next(new MouseEvent('click'));
    expect(component['overlayRef']).toBeUndefined();
  });
});
