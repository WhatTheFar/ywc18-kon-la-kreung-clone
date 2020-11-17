import { priceRangeFor } from './price';

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
});
