import { TestScheduler } from 'rxjs/testing';
import { distinctUntilChangedArray, getUniqueId } from './functions';

describe('functions', () => {
  it('getUniqueId', () => {
    const elementName = 'name';
    const element = {
      getBoundingClientRect: () => ({
        x: 10,
        y: 20,
      }),
    };
    expect(getUniqueId(elementName, element as HTMLElement)).toBe('name-10-20');
  });
});

describe('custom pipes', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('distinctUntilChangedArray', () => {
    scheduler.run(({ cold, expectObservable, hot }) => {
      const nextFunction = cold('--a--b-c-|', { a: [1, 2], b: [1, 2], c: [1, 0] });
      const expectedMarble = '--a----b-|';
      const expectedValues = { a: [1, 2], b: [1, 0] };

      expectObservable(nextFunction.pipe(distinctUntilChangedArray())).toBe(
        expectedMarble,
        expectedValues
      );
    });
  });
});
