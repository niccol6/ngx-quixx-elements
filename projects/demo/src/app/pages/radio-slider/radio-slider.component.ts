import { Component } from '@angular/core';
import { NgxQuixxRadioSliderComponent } from 'ngx-quixx-elements';

@Component({
  selector: 'app-radio-slider',
  standalone: true,
  imports: [NgxQuixxRadioSliderComponent],
  templateUrl: './radio-slider.component.html',
})
export class RadioSliderComponent {
  api = `import { NgxQuixxRadioSliderComponent } from 'ngx-quixx-elements';`;
  snippet = `
  <ngx-quixx-radio-slider
      [options]="['Red', 'Green', 'Blue']"
  ></ngx-quixx-radio-slider>
  `;
}
