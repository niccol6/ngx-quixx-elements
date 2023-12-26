import {
  Overlay,
  OverlayPositionBuilder,
  ScrollStrategyOptions,
  OverlayRef,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { SubBulk } from '../../utils/sub-bulk';

const VERTICAL_POSITIONS = [
  { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 }, // bottom
  { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 }, // top
] as ConnectedPosition[];

/**
 * Abstract class that provides its extensions with methods to attach
 * a overlay to the DOM. The overlay is vertically positioned to the
 * origin element, accordigly with available space.
 */
@Directive({
  standalone: true,
})
export abstract class NgxQuixxVerticalPopoverDirective implements AfterViewInit, OnDestroy {
  protected element: HTMLElement = inject(ElementRef).nativeElement;
  protected cdr = inject(ChangeDetectorRef);
  protected sub = new SubBulk();

  private overlay = inject(Overlay);
  private positionBuilder = inject(OverlayPositionBuilder);
  private sso = inject(ScrollStrategyOptions);
  private overlayRef: OverlayRef | undefined;
  private vcr: ViewContainerRef = inject(ViewContainerRef);

  protected get isOpen(): boolean {
    return !!this.overlayRef;
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.hidePopover();
  }

  public ngAfterViewInit(): void {
    this.sub.add = fromEvent(window, 'resize').subscribe(() => this.hidePopover());
  }

  /**
   * Method to create the overlay.
   */
  protected showPopover(): void {
    const scrollStrategy = this.sso.reposition();
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.getOriginElement())
      .withPositions(VERTICAL_POSITIONS);
    this.overlayRef = this.overlay.create({ scrollStrategy, positionStrategy });
    const portal = new TemplatePortal(this.getContent(), this.vcr);
    this.overlayRef.attach(portal);

    this.sub.add = this.overlayRef
      .outsidePointerEvents()
      .pipe(filter((e: MouseEvent) => !this.element.contains(e.target as Node)))
      .subscribe(() => this.hidePopover());
  }

  /**
   * Method to dispose the overlay.
   */
  protected hidePopover(): void {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
    this.cdr.markForCheck();
  }

  /**
   * Method to pass the overlay content.
   */
  protected abstract getContent(): TemplateRef<unknown>;

  /**
   * Method to define the origin of the overlay.
   */
  protected abstract getOriginElement(): HTMLElement;
}
