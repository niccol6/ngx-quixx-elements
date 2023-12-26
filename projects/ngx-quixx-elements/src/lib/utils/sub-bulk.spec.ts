import { Subscription } from 'rxjs';
import { SubBulk } from './sub-bulk';

describe('SubBulk', () => {
  it('should create an instance', () => {
    expect(new SubBulk()).toBeTruthy();
  });

  it('should initialize subscriptions', () => {
    const bulk = new SubBulk();
    const sub = new Subscription();
    expect(bulk['subscriptions']).toBeUndefined();
    bulk.add = sub;
    expect(bulk['subscriptions']).toEqual(sub);
  });

  it('should unsubscribe call subscriptions unsubscribe', () => {
    const bulk = new SubBulk();
    bulk.add = new Subscription();
    const spy = spyOn(bulk['subscriptions'], 'unsubscribe');
    bulk.unsubscribe();
    expect(spy).toHaveBeenCalled();
  });
});
