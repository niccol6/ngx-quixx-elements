import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgxQuixxProgressComponent } from './progress.component';
import { SimpleChanges } from '@angular/core';

describe('ProgressComponent', () => {
  let component: NgxQuixxProgressComponent;
  let fixture: ComponentFixture<NgxQuixxProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxQuixxProgressComponent],
    });
    fixture = TestBed.createComponent(NgxQuixxProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input change should set liquid width', fakeAsync(() => {
    const changes = {
      ['scale']: {
        currentValue: 4,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
      ['value']: {
        currentValue: 1,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    } as SimpleChanges;
    component['scale'] = 4;
    component['value'] = 1;
    component.ngOnChanges(changes);
    tick(100);
    expect(component['liquidWidth']).toBe('25%');
  }));

  it('scale 0 should not throw error', () => {
    component['setLiquidWidth'](10);
    expect(component['liquidWidth']).toBe('0%');
  });
});
