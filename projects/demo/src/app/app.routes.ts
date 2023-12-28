import { Routes } from '@angular/router';
import {
  CustomPipesComponent,
  DatesComponent,
  FillOutComponent,
  InputComponent,
  MenuButtonComponent,
  MultipleChoiceComponent,
  ProgressComponent,
  RadioSliderComponent,
  SelectComponent,
  SubBulkComponent,
  SubmitButtonComponent,
} from './pages';

export const routes: Routes = [
  {
    component: CustomPipesComponent,
    path: 'custom-pipes',
  },
  {
    component: DatesComponent,
    path: 'dates',
  },
  {
    component: FillOutComponent,
    path: 'fill-out',
  },
  {
    component: InputComponent,
    path: 'input',
  },
  {
    component: MenuButtonComponent,
    path: 'menu-button',
  },
  {
    component: MultipleChoiceComponent,
    path: 'multiple-choice',
  },
  {
    component: ProgressComponent,
    path: 'progress',
  },
  {
    component: RadioSliderComponent,
    path: 'radio-slider',
  },
  {
    component: SelectComponent,
    path: 'select',
  },
  {
    component: SubBulkComponent,
    path: 'sub-bulk',
  },
  {
    component: SubmitButtonComponent,
    path: 'submit-button',
  },
];
