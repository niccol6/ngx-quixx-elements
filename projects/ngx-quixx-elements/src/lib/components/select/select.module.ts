import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { NgxQuixxIconChevronDownComponent } from '../icons/icon-chevron-down.component';
import { NgxQuixxSelectComponent } from './select.component';
import { NgxQuixxSelectOptionComponent } from './select-option.component';

@NgModule({
  declarations: [NgxQuixxSelectComponent, NgxQuixxSelectOptionComponent],
  imports: [CommonModule, FormsModule, OverlayModule, NgxQuixxIconChevronDownComponent],
  exports: [NgxQuixxSelectComponent, NgxQuixxSelectOptionComponent],
})
export class NgxQuixxSelectModule {}
