import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTemplateComponent {
  @Input({ required: true }) api: string;
  @Input({ required: true }) snippet: string;
}
