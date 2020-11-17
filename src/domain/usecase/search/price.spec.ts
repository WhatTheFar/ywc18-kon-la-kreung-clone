import { priceLevelFor, PriceRange, priceRangeFor } from './price';

describe('Price', () => {
  describe('Parse price range from text', () => {
    describe.each`
      text                    | expected
      ${'ไม่เกิน 100 บาท'}    | ${[0, 100]}
      ${'100 - 300 บาท'}      | ${[100, 300]}
      ${'300 - 600 บาท'}      | ${[300, 600]}
      ${'มากกว่า 600 บาท'}    | ${[600]}
      ${'Vue.js is the best'} | ${undefined}
    `('priceRangeFor("$text")', ({ text, expected }) => {
      test('Should returns valid range', async () => {
        const actual: [number, number?] | undefined = priceRangeFor(text);

        expect(actual).toEqual(expected);
      });
    });
  });

  const priceLevelRange: PriceRange[] = [[0, 100], [100, 300], [300, 600], [600]];

  describe('Parse price level from price range', () => {
    describe.each`
      priceRange    | expected
      ${[0, 100]}   | ${[1]}
      ${[0, 120]}   | ${[1]}
      ${[0, 500]}   | ${[1, 2]}
      ${[100, 599]} | ${[2]}
      ${[100, 600]} | ${[2, 3]}
      ${[500]}      | ${[4]}
      ${[600]}      | ${[4]}
      ${[620]}      | ${[]}
    `('priceRangeFor($priceRange, levelRanges)', ({ priceRange, expected }) => {
      test('Should returns valid price level', async () => {
        const actual: number[] | undefined = priceLevelFor(priceRange, priceLevelRange);

        expect(actual).toEqual(expected);
      });
    });
  });
});
