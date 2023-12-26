import { OperatorFunction, filter, map, pairwise, pipe, startWith } from 'rxjs';

/**
 * Create an unique id for an element, using its position in the viewport.
 * @param elementName
 * @param element
 * @returns the unique id
 */
export function getUniqueId(elementName: string, element: HTMLElement): string {
  const pos = element.getBoundingClientRect();
  return `${elementName}-${Math.floor(pos.x)}-${Math.floor(pos.y)}`;
}

/**
 * @returns a custom rxjs operator to filter array emissions until their values change
 */
export function distinctUntilChangedArray(): OperatorFunction<
  (string | number | boolean | null | undefined)[],
  (string | number | boolean | null | undefined)[]
> {
  return pipe(
    startWith([]),
    pairwise(),
    filter(([previous, current]) => {
      if (previous.length != current.length) return true;
      for (let i = 0; i < previous.length; i++) {
        if (previous[i] !== current[i]) return true;
      }
      return false;
    }),
    map(([_, current]) => current)
  );
}
