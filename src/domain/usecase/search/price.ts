import SuperExpressive from 'super-expressive';

export type PriceRange = [number, number?];

export function priceRangeFor(text: string): PriceRange | undefined {
  const minRe = SuperExpressive() //
    .singleLine //
    .startOfInput //
    .string('มากกว่า') //
    .whitespaceChar //
    .namedCapture('min') //
    /* */ .oneOrMore.digit //
    .end() //
    .whitespaceChar //
    .string('บาท') //
    .endOfInput //
    .toRegex();

  const rangeRe = SuperExpressive() //
    .singleLine //
    .startOfInput //
    .namedCapture('min') //
    /* */ .oneOrMore.digit //
    .end() //
    .whitespaceChar //
    .string('-') //
    .whitespaceChar //
    .namedCapture('max') //
    /* */ .oneOrMore.digit //
    .end() //
    .whitespaceChar //
    .string('บาท') //
    .endOfInput //
    .toRegex();

  const maxRe = SuperExpressive() //
    .singleLine //
    .startOfInput //
    .string('ไม่เกิน') //
    .whitespaceChar //
    .namedCapture('max') //
    /* */ .oneOrMore.digit //
    .end() //
    .whitespaceChar //
    .string('บาท') //
    .endOfInput //
    .toRegex();

  const minMatch = text.match(minRe);
  if (minMatch && minMatch.groups) {
    const min = parseInt(minMatch.groups['min'], 10);
    return [min];
  }

  const rangeMatch = text.match(rangeRe);
  if (rangeMatch && rangeMatch.groups) {
    const min = parseInt(rangeMatch.groups['min'], 10);
    const max = parseInt(rangeMatch.groups['max'], 10);
    return [min, max];
  }

  const maxMatch = text.match(maxRe);
  if (maxMatch && maxMatch.groups) {
    const max = parseInt(maxMatch.groups['max'], 10);
    return [0, max];
  }
}

export function priceLevelFor(
  priceRange: PriceRange,
  levelRanges: PriceRange[]
): number[] {
  const [min, max] = priceRange;
  const levels = levelRanges
    .map((levelRange, i) => {
      const currentLvl = i + 1;
      const [levelMin, levelMax] = levelRange;
      if (min <= levelMin) {
        if (!max) {
          return currentLvl;
        } else {
          if (!!levelMax && max >= levelMax) {
            return currentLvl;
          }
        }
      }
      return undefined;
    })
    .filter((v): v is number => !!v);
  return levels;
}
