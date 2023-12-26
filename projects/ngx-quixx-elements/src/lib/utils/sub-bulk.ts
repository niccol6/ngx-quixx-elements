import { Subscription } from 'rxjs';

/**
 * Class to store subscriptions and unsubscribe them all togheter.
 *
 * E.g.
 *
 * sub = new SubBulk();
 *
 * sub.add = observable1.subscribe();
 * sub.add = observable2.subscribe();
 *
 * sub.unsubscribe();
 */
export class SubBulk {
  private subscriptions: Subscription;

  /** Add subscription to the bulk */
  public set add(v: Subscription) {
    if (this.subscriptions) {
      this.subscriptions.add(v);
    } else {
      this.subscriptions = v;
    }
  }

  /** Unsubscribe all the subscriptions stored */
  public unsubscribe() {
    this.subscriptions?.unsubscribe();
  }
}
