import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * The component represents a liquid progress bar.
 */
@Component({
  selector: 'ngx-quixx-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxQuixxProgressComponent implements OnChanges {
  /** Set the value of the progress bar */
  @Input({ required: true }) public value: number;

  /** Set the scale of the progress bar */
  @Input({ required: true }) public scale: number;

  /**
   * This property hold the name of a css
   * lass, applied to the progress level.
   * The following values match classes defined in the library: warning, danger, primary, secondary, success.
   */
  @Input() public color: string = 'warning';

  @HostBinding('class') private class = 'quixx-progress';

  protected liquidWidth: string;
  protected showLiquid: boolean;

  private cdr = inject(ChangeDetectorRef);

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['scale']) {
      this.showLiquid = false;
      this.setLiquidWidth(0);
      setTimeout(() => {
        this.showLiquid = true;
        this.cdr.markForCheck();
      });
    }
    setTimeout(() => {
      this.setLiquidWidth(this.value);
      this.cdr.markForCheck();
    }, 100);
  }

  private setLiquidWidth(value: number) {
    if (!this.scale) {
      this.liquidWidth = '0%';
      return;
    }
    const percentage = Math.abs(value / this.scale);
    this.liquidWidth = `${Math.floor(percentage * 100)}%`;
  }
}
