import { PanJsAPI } from './panjs';

describe('PanJsAPI', () => {
  const panJsApi = new PanJsAPI();

  describe('getYWC18()', () => {
    test('Should returns valid response', async () => {
      const resp = await panJsApi.getYWC18();

      expect(resp).not.toBeNull();
      expect(Array.isArray(resp.categories)).toBe(true);
      expect(Array.isArray(resp.provinces)).toBe(true);
      expect(Array.isArray(resp.priceRange)).toBe(true);
      expect(Array.isArray(resp.merchants)).toBe(true);
    });
  });
});
